json.partial! "teams/show", team: @team, also_players: true

json.success @team.errors.count == 0

json.errors @team.errors