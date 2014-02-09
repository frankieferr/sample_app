$.widget("frankie.table_widget", $.frankie.new_form_widget, {
	_create: function() {
		this._super();
	},

	_add_none_row: function(tbody, blanks) {
		var none_row = $.parseHTML(JST["templates/table_widget/none_row"]({blanks: blanks}));
		$(tbody).html(none_row);
	}
});