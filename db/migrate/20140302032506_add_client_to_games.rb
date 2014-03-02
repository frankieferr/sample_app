class AddClientToGames < ActiveRecord::Migration
  def change
  	add_column :games, :client_id, :integer
  end
end
