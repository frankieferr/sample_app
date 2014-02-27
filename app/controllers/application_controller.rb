class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  before_filter :store_request_in_thread
  before_filter :authorize_client!
  before_filter do
    resource = controller_name.singularize.to_sym
    method = "#{resource}_params"
    params[resource] &&= send(method) if respond_to?(method, true)
  end
  
  def authorize_client!
    return unless user_signed_in?
    return if current_user.has_role? :super_admin
    return if current_client.id == current_user.client_id

    sign_out :user
    redirect_to root_url
    
  end

  def store_request_in_thread
    Thread.current[:request] = request
  end

  rescue_from CanCan::AccessDenied do |exception|
    redirect_to root_url, alert: exception.message
  end

  def current_client
  	client = Client.select { |c| request.original_url =~ /#{c.site_url}/ }

  	client.first if client.count == 1
  end
  helper_method :current_client
end
