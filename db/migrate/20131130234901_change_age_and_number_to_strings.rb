class ChangeAgeAndNumberToStrings < ActiveRecord::Migration
  def change
  	remove_column :players, :age, :integer
  	remove_column :players, :number, :integer
  	add_column :players, :age, :string
  	add_column :players, :number, :string
  end
end
