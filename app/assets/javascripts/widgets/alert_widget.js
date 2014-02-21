$.widget("frankie.alerts_widget", {

	_create: function() {
		var alerts_area = $.parseHTML(JST["templates/alerts_widget/alerts_area"]());
		$(this.element).prepend(alerts_area);
		this.alerts_area = $(this.element).find("[data-area=alerts]")[0];
	},

	_add_alert: function(msg, alert_type, timeout, remove) {
		if(timeout == undefined) timeout = 5000;
		if(remove == undefined) remove = false;
		var alert = $.parseHTML(JST["templates/alerts_widget/alert"]({msg: msg, alert_type: alert_type}));
		$(this.alerts_area).append(alert);

		if(remove) {
			window.setTimeout(function() {
		    $(alert).fadeTo(500, 0).slideUp(500, function() {
		        $(this).remove(); 
		    });
			}, timeout);
		}
	}
})