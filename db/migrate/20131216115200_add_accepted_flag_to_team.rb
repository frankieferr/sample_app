class AddAcceptedFlagToTeam < ActiveRecord::Migration
  def change
    add_column :teams, :accepted, :boolean, :default => true
  end
end
