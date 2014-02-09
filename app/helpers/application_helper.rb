module ApplicationHelper
	def img_in_place
		tag(:img, src: "/assets/pen.jpeg", class: "img_in_place")
	end

	def frankie_in_place(instance, attribute)
		(best_in_place instance, attribute) + img_in_place
	end

end
