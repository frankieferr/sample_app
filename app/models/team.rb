class Team < ActiveRecord::Base
	
	belongs_to :client
	has_many :players, :dependent => :destroy

	validates_presence_of :name
	validates_presence_of :client

	accepts_nested_attributes_for :players

	def has_players?
		self.players.count > 0
	end

	def accept
		self.update_attribute(:accepted, true)
	end

	def unaccept
		self.update_attribute(:accepted, false)
	end
end
