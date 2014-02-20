class PlayersController < ApplicationController
  before_action :set_player, only: [:show, :edit, :update, :destroy]
  before_filter :authenticate_user!
  load_and_authorize_resource

  # GET /players
  # GET /players.json
  def index
    @teams = Team.all.where(:client_id => current_client.id) if current_client
    respond_to do |format|
      format.html { render action: 'index'}
      format.json { render action: 'index', :locals => {:teams => @teams} }
    end
  end

  # GET /players/1
  # GET /players/1.json
  def show
  end

  # GET /players/new
  def new
    @player = Player.new
    @player.team = Team.find(params[:team_id]) if params[:team_id]
    
  end

  # GET /players/1/edit
  def edit
  end

  # POST /players
  # POST /players.json
  def create
    @player = Player.new(player_params)
    @player.client = current_client if current_client

    respond_to do |format|
      if @player.save
        format.json { render action: 'show', status: :created }
      else
        format.json { render action: 'show', status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /players/1
  # PATCH/PUT /players/1.json
  def update
    @player.update(player_params)
    respond_to do |format|
      format.json { render action: 'show' }
    end
  end

  # DELETE /players/1
  # DELETE /players/1.json
  def destroy
    @player.destroy
    respond_to do |format|
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_player
      @player = Player.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def player_params
      params.require(:player).permit(:name, :age, :number, :team_id, :client_id)
    end
end
