$.widget("frankie.teams_accordion", $.frankie.new_form_widget, {

	_create: function() {
		this._super();
		this._add_loading_mask();
		this.teams_area = $(this.element).find("[data-area=teams]")[0];
		$.ajax("/teams", {
      type: "get",
      dataType: "json",
      success: function(data) {
        this._setup(data);
		  }.bind(this),
      complete: function(){
        this._remove_loading_mask();
      }.bind(this)
    });
	},

  _setup: function(data) {
    $.each(data.teams, function(i, team) {
      var team_placeholder = $.parseHTML(JST["templates/teams_accordion_widget/teams"](team));
      $(this.teams_area).append(team_placeholder);
      $.each($(team_placeholder).find("[data-widget=players_table]"), function(i, players_table){
        $(players_table).players_table({
          team: team,
          remove_team: function(){
            $(team_placeholder).remove();
            this._add_alert("Successfully deleted the team", "success")
          }.bind(this).bind(team_placeholder)
        });
      }.bind(this).bind(team_placeholder).bind(team));
    }.bind(this));
    this._initialize_accordion(); 
    this._initialize_best_in_place();
  },

	_initialize_accordion: function() {
		$(this.teams_area).accordion({
      header: "> div > h3",
      heightStyle: "content"
  	});
   },

  _click_submit: function() {
  	if($(this.new_form).valid()) {

      $(this.element).mask("Sending...");

      var form_data = $(this.new_form).serializeArray();

      $.ajax("/teams", {
        type: "post",
        dataType: "json",
        data: form_data,
        success: function(data, status) {
          this._add_alert("Successfully created the team", "success");
          this._click_cancel();
          $(this.teams_area).remove()
          var teams_area = $.parseHTML(JST["templates/teams_accordion_widget/main"]());
          $(this.element).append(teams_area);
          this.teams_area = $(this.element).find("[data-area=teams]")[0];
          this._setup(data);
        }.bind(this),
        error: function(data, status, error) {
          this._add_alert(error, "error");
        }.bind(this),
        complete: function() {
          $(this.element).unmask();
        }.bind(this)
      });

    } else {
      this._add_alert("Please check the red boxes. Hover over it to see the problem.", "error");
    }
  }
})