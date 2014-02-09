class CreateNotices < ActiveRecord::Migration
  def change
    create_table :notices do |t|
      t.integer :client_id
      t.string :header
      t.string :body

      t.timestamps
    end
  end
end
