$.widget("frankie.date_picker", {
	_create: function() {
		var main = $.parseHTML(JST["templates/date_picker_widget/main"]())
		$(this.element).html(main)
		this.input_element = $(this.element).find("[data-input=date]")[0]
		this.calender_icon = $(this.element).find("[data-span=calender_icon]")[0]
		$(this.input_element).datepicker({ dateFormat: "dd/mm/yy" });
		$(this.calender_icon).click(function(event){
			$(this.input_element).datepicker("show")
		}.bind(this));
	}

	
});