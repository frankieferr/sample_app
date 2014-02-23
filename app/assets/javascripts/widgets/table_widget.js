//= require widgets/new_form_widget

$.widget("frankie.table_widget", $.frankie.new_form_widget, {
	_create: function() {
		this._super();
	},

	_add_none_row: function(tbody, columns) {
		var none_row = $.parseHTML(JST["templates/table_widget/none_row"]({columns: columns}));
		$(tbody).html(none_row);
	}
});