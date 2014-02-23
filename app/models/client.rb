class Client < ActiveRecord::Base

	has_many :players, dependent: :destroy
	has_many :teams, dependent: :destroy
	has_many :notices, dependent: :destroy
	has_one :user, dependent: :destroy

	validates_presence_of :name
	validates_presence_of :email
	validates_presence_of :site_url
	validates :email, uniqueness: :true
	validates :site_url, uniqueness: :true

	validates_format_of :email, :with => Devise::email_regexp

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
