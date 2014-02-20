$.widget("frankie.frankie_widget", $.frankie.alerts_widget, {
	_create: function() {
		this._frankie_create();
		this._super();
		if(this.description){
			var description = $.parseHTML(JST["templates/frankie_widget/description"]({description: this.description}));
			$(this.element).prepend(description);
		}
	},

	_frankie_create: function() {
		var main = $.parseHTML(JST["templates/" + $(this.element).data("widget") + "_widget/main"]());
		$(this.element).html(main);
	},

	_add_loading_mask: function() {
		$(this.element).addClass("loading");
		$(this.element).mask("Loading Teams...");
	},

	_remove_loading_mask: function() {
		$(this.element).removeClass("loading");
		$(this.element).unmask()
	},

	_initialize_edit_in_place: function() {
		$(this.element).find("[data-widget=edit_in_place][data-belongs-to=" + $(this.element).data("widget") + "]").edit_in_place({
			add_alert: function(event, data){
				this._add_alert(data.msg, data.alert_type, data.timeout, data.remove);
			}.bind(this)
		});
	}
})