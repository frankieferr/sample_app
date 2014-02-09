class AddClientIdToTeamAndPlayer < ActiveRecord::Migration
  def change
  	add_column :players, :client_id, :integer
  	add_column :teams, :client_id, :integer
  end
end
