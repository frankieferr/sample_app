class GamesController < ApplicationController
  before_action :set_game, only: [:show, :edit, :update, :destroy]
  before_filter :authenticate_user!
  load_and_authorize_resource

  # GET /games
  # GET /games.json
  def index
    @games = Game.all.where(client_id: current_client.id) if current_client
    respond_to do |format|
      format.html { render action: 'index'}
      format.json { render action: 'index', locals: {games: @games} }
    end
  end

  # POST /games
  # POST /games.json
  def create
    @game = Game.new(game_params)
    @game.client = current_client if current_client

    respond_to do |format|
      if @game.save
        format.json { render action: 'show', status: :created }
      else
        format.json { render action: 'show', status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /games/1
  # PATCH/PUT /games/1.json
  def update
    @game.update(game_params)
    respond_to do |format|
      format.json { render action: 'show' }
    end
  end

  # DELETE /games/1
  # DELETE /games/1.json
  def destroy
    @game.destroy
    respond_to do |format|
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_game
      @game = Game.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def game_params
      params.require(:game).permit(:client_id, :home_team_id, :away_team_id, :home_team_score, :away_team_score)
    end
end
