$.widget("frankie.register_team", $.frankie.frankie_widget, {
	_create: function(){
		this.description = "Use this page to register a team. Click the Add Player button to add as many players as you wish for the team";
		this._super();

		this.team_form = $(this.element).find("[data-form=team]")[0];
		this.team_form_area = $(this.element).find("[data-area=team_form]")[0];
		this.players_area = $(this.element).find("[data-area=players]")[0];
		this.info_area = $(this.element).find("[data-area=info]")[0];
		this.add_player_button = $(this.element).find("[data-button=add_player]")[0];
		this.submit_button = $(this.element).find("[data-button=submit]")[0];
		this.team_accordion_area = $(this.element).find("[data-area=team_accordion]")[0];
		this.player_count = 0;

		$(this.add_player_button).click(function() {
			this._add_player();
		}.bind(this));

		$(this.submit_button).click(function() {
			this._submit_team();
		}.bind(this));
	},

	_add_player: function() {
		this.player_count++;
		var player = $.parseHTML(JST["templates/register_team_widget/player"]({ index: this.player_count }));

		$(player).find("[data-button=remove]").click(function() {
			$(player).remove();
		}.bind(this));

		$(this.players_area).append(player);
	},

	_submit_team: function() {
		if($(this.team_form).valid()) {
			$(this.element).mask("Sending...");

			var form_data = $(this.team_form).serializeArray();

			$.ajax("/register_team", {
				type: "post",
				dataType: "json",
				data: form_data,
				success: function(data, status) {
					if(data.success) {
						this._show_team_info(data);
					} else {
						$.each(data.errors, function(i, error){
							this._add_alert(error, "error");
						}.bind(this));
					}
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
	},

	_show_team_info: function(team_data) {
		var show = $.parseHTML(JST["templates/register_team_widget/show"](team_data));
		$(this.team_form_area).remove();
		$(this.team_accordion_area).html(show);
		$(this.alerts_area).html("");
		this._add_alert("TEAM WAS SUCCESSFULLY CREATED", "success", undefined, false);
		this._initialize_accordion();
	},

	_initialize_accordion: function() {
		$(this.team_accordion_area).accordion({
      header: "> div > h3",
      heightStyle: "content"
    })
	}
})