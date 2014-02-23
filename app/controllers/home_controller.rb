class HomeController < ApplicationController

	def index
    notices = current_client.notices if current_client

		render 'index', :locals => {:notices => notices}
	end
end
