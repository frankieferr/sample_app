class Player < ActiveRecord::Base

	belongs_to :team
	belongs_to :client

	validates :name, presence: true
	validates :team, presence: true
	validates :client, presence: true
	
	validates :age, numericality: { only_integer: true, greater_than_or_equal_to: 1 }
	validates :number, numericality: { only_integer: true, greater_than_or_equal_to: 1  }, uniqueness: {scope: :team}

end
