class Game < ActiveRecord::Base
	belongs_to :home_team, class_name: "Team"
	belongs_to :away_team, class_name: "Team"
	belongs_to :client

	validates :client_id, presence: true
	validates :home_team_id, presence: true
	validates :away_team_id, presence: true
	validates :date, presence: true
	validates :time, presence: true
	validates :home_team_score, presence: true, numericality: { only_integer: true, greater_than_or_equal_to: 0 }
	validates :away_team_score, presence: true, numericality: { only_integer: true, greater_than_or_equal_to: 0 }

	def get_time
		"#{self.get_time_in_brisbane.hour}:#{self.get_time_in_brisbane.min}"
	end

	def get_time_in_brisbane
		self.time.in_time_zone("Brisbane")
	end

	def get_date
		self.date.strftime("%d/%m/%y")
	end
end
