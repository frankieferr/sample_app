json.games do
	@games.each do |game|
		json.set! game.id do
		  json.extract! game, :id, :home_team_score, :away_team_score
		  json.date game.get_date
		  json.time game.get_time
		  json.set! :home_team do
			  json.partial! "teams/show", team: game.home_team
			end
			json.set! :away_team do
			  json.partial! "teams/show", team: game.away_team
			end
		end	
	end
end
