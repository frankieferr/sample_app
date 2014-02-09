json.notices do
	@notices.order(:order_num).each do |notice|
		json.set! notice.id do
		  json.extract! notice, :id, :header, :body, :order_num
		end	
	end
end
