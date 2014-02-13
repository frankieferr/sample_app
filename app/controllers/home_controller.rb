class HomeController < ApplicationController

	def index
    notices = Notice.all.where(:client_id => current_client.id) if current_client

		render 'index', :locals => {:notices => notices}
	end
end
