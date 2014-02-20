class NoticesController < ApplicationController
  before_action :set_notice, only: [:show, :edit, :update, :destroy]
  before_filter :authenticate_user!
  load_and_authorize_resource

  # GET /notices
  # GET /notices.json
  def index
    @notices = Notice.all.where(:client_id => current_client.id) if current_client
  end

  # GET /notices/1
  # GET /notices/1.json
  def show
  end

  # GET /notices/new
  def new
    @notice = Notice.new
  end

  # GET /notices/1/edit
  def edit
  end

  # POST /notices
  # POST /notices.json
  def create
    @notice = Notice.new(notice_params)
    @notice.client = current_client if current_client
    @notice.order_num = 0

    shuffle_notices(current_client.id) if current_client

    @notices = Notice.all.where(:client_id => current_client.id) if current_client

    respond_to do |format|
      if @notice.save
        format.json { render action: 'index', status: :created }
      else
        format.json { render json: @notice.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /notices/1
  # PATCH/PUT /notices/1.json
  def update
    @notice.update(notice_params)
    respond_to do |format|
      format.json { render action: 'show'  }
    end
  end

  # DELETE /notices/1
  # DELETE /notices/1.json
  def destroy
    @notice.destroy

    reorder_notices(current_client.id, @notice.order_num) if current_client

    respond_to do |format|
      format.json { head :no_content }
    end
  end

  def order_notices
    puts params.inspect
    ids = params[:ids]

    ids.each_with_index do |id, index|
      Notice.find(id.to_i).update_attribute(:order_num, index)
    end

    respond_to do |format|
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_notice
      @notice = Notice.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def notice_params
      params.require(:notice).permit(:client_id, :header, :body)
    end

    def shuffle_notices(client_id)
      notices = Notice.where(:client_id => client_id)

      notices.each do |notice|
        notice.update_attribute(:order_num, notice.order_num + 1)
      end
    end

    def reorder_notices(client_id, order_num)
      notices = Notice.where(:client_id => client_id).order(:order_num).select{ |n| n.order_num > order_num}
      notices.each_with_index do |notice, index|
        notice.update_attribute(:order_num, order_num + index)
      end
    end
end
