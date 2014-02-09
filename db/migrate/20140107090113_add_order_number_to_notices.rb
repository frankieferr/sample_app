class AddOrderNumberToNotices < ActiveRecord::Migration
  def change
    add_column :notices, :order_num, :integer
  end
end
