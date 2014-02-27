json.teams do
	teams.each do |team|
		json.set! team.id do
		  json.extract! team, :name, :accepted, :id
		  json.players do
			  team.players.each do |player|
			  	json.set! player.id do
						json.partial! "players/show", player: player
					end
				end
			end
		end
	end
end