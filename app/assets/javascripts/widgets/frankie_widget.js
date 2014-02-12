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

	_initialize_best_in_place: function() {
		$("[data-action=best_in_place]").best_in_place();

		$("[data-action=best_in_place]").mouseover(function(){
			$(this).parent().find("[data-img=img_in_place]").show();
		});

		$("[data-action=best_in_place]").mouseout(function(){
			$(this).parent().find("[data-img=img_in_place]").hide();
		});

		$("[data-action=best_in_place]").click(function(){
			$('.form_in_place').submit(function(){
				$("[data-img=img_in_place]").each(function(){
					$(this).hide();
				});
			});
		});
	}
})