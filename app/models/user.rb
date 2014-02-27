require 'rubygems'
require 'role_model'

class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  include RoleModel
 
  belongs_to :client
 	# Setup accessible (or protected) attributes for your model
  # attr_accessible :email, :password, :password_confirmation, :remember_me, :roles, :roles_mask
 
  # # optionally set the integer attribute to store the roles in,
  # # :roles_mask is the default
  roles_attribute :roles_mask
 
  # # declare the valid roles -- do not change the order if you add more
  # # roles later, always append them at the end!
  roles :super_admin, :client, :guest

  def self.find_for_authentication(warden_conditions)
    request = Thread.current[:request]
    user = where(email: warden_conditions[:email]).first
    return user if user and user.has_role? :super_admin

    client = Client.select { |c| request.original_url =~ /#{c.site_url}/ }
    where(email: warden_conditions[:email], client_id: client.first.id).first if client.count == 1
  end
end
