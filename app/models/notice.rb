class Notice < ActiveRecord::Base

	belongs_to :client

	validates :client_id, presence: true

	validates :header, presence: true
	validates :body, presence: true
	validates :order_num, presence: true

	
end
