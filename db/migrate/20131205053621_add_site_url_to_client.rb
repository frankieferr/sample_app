class AddSiteUrlToClient < ActiveRecord::Migration
  def change
  	add_column :clients, :site_url, :string
  end
end
