json.partial! "show", player: @player

json.success @player.errors.count == 0

json.errors @player.errors