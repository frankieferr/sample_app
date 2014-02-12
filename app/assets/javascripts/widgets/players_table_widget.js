//= require widgets/table_widget

$.widget("frankie.players_table", $.frankie.table_widget, {
	options: {
		team: null,
		team_id: null
	},

	_create: function() {
		this.options.team_id = this.options.team.id;

		this.players_count = Object.keys(this.options.team.players).length;
		this._super();
		this.team_area = $(this.element).find("[data-area=team]")[0];

    this._setup();
	},

  _setup: function() {
    var team_table = $.parseHTML(JST["templates/players_table_widget/team"]({team: this.options.team, player_count: this.players_count}))
    $(this.team_area).html(team_table);
    this.players_table = $(this.element).find("[data-table=players]")[0];
    this.players_tbody = $(this.element).find("[data-tbody=players]")[0];
    this._bind_buttons();
    this._initialize_best_in_place();
  },

	_bind_buttons: function() {
    this.accept_button = $(this.team_area).find("[data-button=accept]")[0];
		this.delete_team_button = $(this.team_area).find("[data-button=delete_team]")[0];
 		$(this.accept_button).click(function(event) {
			this._click_accept();
    }.bind(this));
    $(this.delete_team_button).click(function(event) {
      this._click_delete();
    }.bind(this));
    this._bind_remove_player_buttons(this.team_area);
  },

  _bind_remove_player_buttons: function(element){
    this.remove_buttons = $(element).find("[data-button=remove]");
    $(this.remove_buttons).click(function(event) {
      this._click_remove_player($(event.target).closest("tr"));
    }.bind(this));
  },

  _click_accept: function() {
  	$(this.team_area).mask("Accepting");
		$.ajax("/teams/" + this.options.team_id + "/accept_team", {
			type: "patch",
			dataType: "json",
			complete: function(data, status) {
				$(this.accept_button).hide();
				$(this.team_area).unmask();
				this._add_alert("Sucessfully accepted the team.", "sucess");
			}.bind(this)
		});
  },

  _click_remove_player: function(player_row) {
    $(this.element).mask("Deleting player");
  	$.ajax("/players/" + $(player_row).data("player"), {
        type: "delete",
        dataType: "json",
        success: function(data, status) {
          $(player_row).fadeTo(100, 0, function(){
		        $(player_row).remove(); 
		        this._add_alert("Successfully deleted the player", "success");
          	this.players_count--;
          	if(this.players_count == 0){
	          	this._add_none_row(this.players_tbody, 4);
          	}
		    	}.bind(this));
        }.bind(this),
        error: function(data, status, error) {
          this._add_alert(error, "error");
        }.bind(this),
        complete: function() {
          $(this.element).unmask();
        }.bind(this)
      });
  },

   _click_delete: function(player_row) {
    $.ajax("/teams/" + this.options.team_id, {
        type: "delete",
        dataType: "json",
        success: function(data, status) {
          this._trigger("remove_team")
        }.bind(this),
        error: function(data, status, error) {
          this._add_alert(error, "error");
        }.bind(this),
        complete: function() {
          $(this.element).unmask();
        }.bind(this)
      });
  },

  _click_submit: function() {
    if($(this.new_form).valid()) {

      $(this.new_form_area).mask("Sending...");

      var form_data = $(this.new_form).serializeArray();
	    form_data.push({name: "player[team_id]", value: this.options.team_id});

      $.ajax("/players", {
        type: "post",
        dataType: "json",
        data: form_data,
        success: function(data, status) {
          this._add_alert("Successfully created the player", "success");
          this._click_cancel();
          var new_player_row = $.parseHTML(JST["templates/players_table_widget/player_row"](data));
          if(this.players_count == 0) {
          	$(this.players_tbody).html(new_player_row);
          } else {
						$(this.players_tbody).append(new_player_row);
          }
          this._bind_remove_player_buttons(new_player_row);
					this._initialize_best_in_place();
					this.players_count++;
        }.bind(this),
        error: function(data, status, error) {
        	$.each(data.responseJSON.errors, function(name, error){
        		this._add_alert(name.capitalize() + " " + error, "error");
        	}.bind(this))
        }.bind(this),
        complete: function() {
          $(this.new_form_area).unmask();
        }.bind(this)
      });

    } else {
      this._add_alert("Please check the red boxes. Hover over it to see the problem.", "error");
    }
  },
});