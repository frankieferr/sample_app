class Client < ActiveRecord::Base

	has_many :players, dependent: :destroy
	has_many :teams, dependent: :destroy
	has_many :notices, dependent: :destroy
	has_many :games, dependent: :destroy
	has_one :user, dependent: :destroy

	validates :name, presence: true
	validates :email, presence: true, uniqueness: true, format: {with: Devise::email_regexp}
	validates :site_url, presence: true, uniqueness: true

	after_create :create_user
	after_save :set_user_email

	def create_user()
		newuser = User.new({
      email: self.email,
      password: 'test',
      password_confirmation: 'test'
   })
   newuser.roles = "client"
   newuser.client = self
   newuser.save!
	end

	def set_user_email
		self.user.update_attribute(:email, self.email)
	end
end
