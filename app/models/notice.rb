class Notice < ActiveRecord::Base

	belongs_to :client

	validates_presence_of :client_id

	validates_presence_of :header
	validates_presence_of :body
	validates_presence_of :order_num

	
end
