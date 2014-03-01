class Team < ActiveRecord::Base
	
	belongs_to :client
	has_many :players, dependent: :destroy
	has_many :home_games, class_name: "Game", foreign_key: "home_team_id"
	has_many :away_games, class_name: "Game", foreign_key: "away_team_id"

	validates :name, presence: true
	validates :client, presence: true

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
