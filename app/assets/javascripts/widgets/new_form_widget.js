$.widget("frankie.new_form_widget", $.frankie.frankie_widget, {

	_create: function(add_loading_mask) {
		this._super(add_loading_mask);
		var new_form = $.parseHTML(JST["templates/new_form_widget/new_form_area"]());
		$(this.element).append(new_form);
		this.new_button = $(this.element).find("[data-button=new]")[0];
    this._bind_new_button();
		$(this.new_button).insertAfter($(this.alerts_area));
		this.new_form_area = $(this.element).find("[data-area=new_form]")[0];
		$(this.new_form_area).insertAfter($(this.alerts_area));
	},

	_bind_form_buttons: function() {
		this.submit_button = $(this.element).find("[data-button=submit]")[0];
		this.cancel_button = $(this.element).find("[data-button=cancel]")[0];

		$(this.cancel_button).click(function() {
			this._click_cancel();
		}.bind(this))

		$(this.submit_button).click(function() {
			this._click_submit();
		}.bind(this))
	},

	_bind_new_button: function() {
		$(this.new_button).click(function() {
			this._click_new();
		}.bind(this))
	},

	_click_new: function() {
		if($(this.new_form_area).html() == ""){
			var form = $.parseHTML(JST["templates/" + $(this.element).data("widget") + "_widget/new_form"]());
			$(this.new_form_area).html(form);
			this.new_form = $(this.element).find("[data-form=new]")[0];
			var form_buttons = $.parseHTML(JST["templates/new_form_widget/new_form_buttons"]());
			$(this.new_form).append(form_buttons);
			$(this.new_button).hide();
			this._bind_form_buttons();
		}
	},

	_click_cancel: function() {
		$(this.new_form_area).html("");
		$(this.new_button).show();
	},

	_click_submit: function() {
		this._add_alert("You need to implement own submit function per widget", "error");

	}
})