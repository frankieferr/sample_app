$.widget("frankie.games_widget", $.frankie.new_form_widget, {
	_create: function() {
    this.description = "Use this page to manage the games shown on the fixtures.";
    this._super();
    this._add_loading_mask();
		this.games_area = $(this.element).find("[data-area=games]")[0];
		$.ajax("/games", {
      type: "get",
      dataType: "json",
      success: function(data) {
        this._setup(data);
      }.bind(this),
      complete: function() {
        this._remove_loading_mask();
      }.bind(this)
		});
	},

  _setup: function(data) {
    for(var index in data.games) {
    	if(data.games.hasOwnProperty(index)) {
    		var game = $.parseHTML(JST["templates/games_widget_widget/game"](data.games[index]))
    		$(this.games_area).append(game)
    	}
    }
  },
});