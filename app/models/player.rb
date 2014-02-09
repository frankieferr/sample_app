class Player < ActiveRecord::Base

	belongs_to :team
	belongs_to :client

	validates_presence_of :name
	validates_presence_of :team
	validates_presence_of :client
	
	validates :age, :numericality => { :only_integer => true, :greater_than_or_equal_to => 1 }
	validates :number, :numericality => { :only_integer => true, :greater_than_or_equal_to => 1 }, :uniqueness => {:scope => :team}

end
