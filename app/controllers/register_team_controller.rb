class RegisterTeamController < ApplicationController
  def register
  	@team = Team.new
  end

  def create
  	@team = Team.new(team_params)
    @team.client = current_client if current_client
    @team.accepted = false
    @team.players.each do |player|
    	player.client = current_client if current_client
    	player.team = @team
    end
    respond_to do |format|
      if @team.save
        format.html { redirect_to root_url, notice: 'Team was successfully submitted.' }
        format.json { render action: '../teams/show', status: :created, location: @team, success: true}
      else
        format.html { render action: 'register' }
        format.json { render json: @team.errors, status: :unprocessable_entity }
      end
    end
  end

  private
    # Never trust parameters from the scary internet, only allow the white list through.
    def team_params
      params.require(:team).permit(:name, :client_id, players_attributes: [:id, :name, :age, :number, :client_id, :_destroy])
    end
end
