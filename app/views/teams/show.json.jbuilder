json.extract! @team, :name, :created_at, :updated_at

json.players do
	@team.players.each do |player|
		json.set! player.id do
			json.partial! "players/show", :player => player
		end
	end
end

json.success @team.errors.count == 0

json.errors @team.errors