class TeamsController < ApplicationController
  before_action :set_team, only: [:show, :edit, :update, :destroy, :accept_team]
  before_filter :authenticate_user!
  load_and_authorize_resource

  # GET /teams
  # GET /teams.json
  def index
    @teams = Team.all.where(client_id: current_client.id) if current_client
    respond_to do |format|
      format.html { render action: 'index'}
      format.json { render action: 'index', locals: {teams: @teams} }
    end
  end

  # POST /teams
  # POST /teams.json
  def create
    @team = Team.new(team_params)
    @team.client = current_client if current_client
    respond_to do |format|
      if @team.save
        format.json { render action: 'index', status: :created, locals: {teams: current_client.teams} }
      else
        format.json { render json: @team.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /teams/1
  # PATCH/PUT /teams/1.json
  def update
    @team.update(notice_params)
    respond_to do |format|
      format.json { render action: 'show'  }
    end
  end

  # DELETE /teams/1
  # DELETE /teams/1.json
  def destroy
    @team.destroy
    respond_to do |format|
      format.json { head :no_content }
    end
  end

  def accept_team
    @team.accept
    render nothing: true
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_team
      @team = Team.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def team_params
      params.require(:team).permit(:name, :client_id, :accepted)
    end
end
