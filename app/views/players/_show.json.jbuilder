json.extract! player, :id, :name, :age, :number, :created_at, :updated_at

json.success player.errors.count == 0

json.errors player.errors