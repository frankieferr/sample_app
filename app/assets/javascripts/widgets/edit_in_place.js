$.widget("frankie.edit_in_place", {
	options: {
		url: null,
		object: null,
		attribute: null,
		type: null,
		clazz: null,
	},

	_create: function() {
		this.url = this.options.url || $(this.element).data("url");
		this.object = this.options.object || $(this.element).data("object");
		this.attribute = this.options.attribute || $(this.element).data("attribute");
		this.type = this.options.type || $(this.element).data("type");
		this.clazz = this.options.clazz || $(this.element).data("clazz") || "";

		this._setup();
	},

	_setup: function() {
		this.text_span = $(this.element).find("[data-span=text]")[0];
		this.value = this.value || $(this.text_span).text();
		$(this.text_span).html(this.value);
		var img_in_place = $.parseHTML(JST["templates/edit_in_place/img_in_place"]());
		$(this.element).append(img_in_place);
		this.img_in_place = $(this.element).find("[data-img=img_in_place]")[0];

		this._initialize_mouseovers();
		this._initialize_click();
	},

	_initialize_mouseovers: function() {
		$(this.text_span).mouseover(function() {
			$(this.img_in_place).show();
		}.bind(this));

		$(this.text_span).mouseout(function() {
			$(this.img_in_place).hide();
		}.bind(this));
	},

	_initialize_click: function() {
		$(this.text_span).click(function() {
			$(this.text_span).remove();
			$(this.img_in_place).remove();

			var element = $.parseHTML(JST["templates/edit_in_place/" + this.type]({value: this.value, clazz: this.clazz}));
			$(this.element).append(element);
			this.input_element = element;
			$(this.input_element).focus();

			$(this.input_element).blur(function() {
				this._on_blur();
			}.bind(this));
			if(this.type == "input") {
				$(this.input_element).keydown(function(event) {
				  if(event.keyCode == '13') {
						this._on_blur();
				  }
				}.bind(this));
			}
		}.bind(this))
	},

	_on_blur: function() {
		data = {};
		data[this.object + "[" + this.attribute + "]"] = $(this.input_element).val()
		$.ajax({
			type: 'patch',
			dataType: 'json',
			url: this.url,
			data: data,
			success: function(data, status) {
				if(data.success) {
					this.value = $(this.input_element).val();
				} else {
					for(var index in data.errors) {
						if(data.errors.hasOwnProperty(index)) {
							this._trigger("add_alert", null, {msg: index.replace('_', ' ').capitalize() + " " + data.errors[index], alert_type: "error"})
						}
					}
				}
			}.bind(this),
			error: function(data, status, error) {
				this._trigger("add_alert", null, {msg: error.capitalize(), alert_type: "error"})			
			}.bind(this),
			complete: function() {
				$(this.element).html($(this.text_span));
				this._setup();
			}.bind(this),
		});
	}
})