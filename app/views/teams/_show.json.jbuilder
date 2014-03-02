json.extract! team, :id, :name

if defined?(also_players) && also_players
	json.players do
		team.players.each do |player|
			json.set! player.id do
				json.partial! "players/show", player: player
			end
		end
	end
end