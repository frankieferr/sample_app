//= require widgets/table_widget

$.widget("frankie.clients_table", $.frankie.table_widget, {
	_create: function() {
    this.description = "Manage the clients"
    this._super();
    $.ajax({
      type: "get",
      dataType: "json",
      url: "clients/",
      success: function(data) {
        this.clients = data;
        this.clients_count = Object.keys(this.clients).length;
        this._setup();
      }.bind(this)
    })
	},
  

  _setup: function() {
    this.clients_table = $(this.element).find("[data-table=clients]")[0];
    this.clients_tbody = $(this.element).find("[data-tbody=clients]")[0];
    this._setup_clients();
    this._bind_remove_client_buttons(this.element);
    this._initialize_edit_in_place();
  },

  _setup_clients: function() {
    if(this.clients_count > 0) { 
      for(var index in this.clients) {
        if(this.clients.hasOwnProperty(index)) {
          this.clients[index].widget = this.widgetName;
          var client = $.parseHTML(JST["templates/clients_table_widget/client_row"](this.clients[index]));
          $(this.clients_tbody).append(client);
        }
      }
    } else {
      this._add_none_row(this.clients_tbody, 4)
    }
  },

  _bind_remove_client_buttons: function(element) {
    this.remove_buttons = $(element).find("[data-button=remove]");
    $(this.remove_buttons).click(function(event) {
      this._click_remove_client($(event.currentTarget).closest("tr"));
    }.bind(this));
  },


  _click_remove_client: function(client_row) {
    $(this.element).mask("Deleting Client");
    $.ajax("/clients/" + $(client_row).data("client"), {
        type: "delete",
        dataType: "json",
        success: function(data, status) {
          $(client_row).fadeTo(100, 0, function() {
            $(client_row).remove(); 
            this._add_alert("Successfully deleted the client", "success");
            this.clients_count--;
            if(this.clients_count == 0) {
              this._add_none_row(this.clients_tbody, 4);
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

  _click_submit: function() {
    if($(this.new_form).valid()) {

      $(this.new_form_area).mask("Sending...");

      var form_data = $(this.new_form).serializeArray();

      $.ajax("/clients", {
        type: "post",
        dataType: "json",
        data: form_data,
        success: function(data, status) {
          this._add_alert("Successfully created the client", "success");
          this._click_cancel();
          data.widget = this.widgetName;
          var new_client_row = $.parseHTML(JST["templates/clients_table_widget/client_row"](data));
          if(this.clients_count == 0) {
            $(this.clients_tbody).html(new_client_row);
          } else {
            $(this.clients_tbody).append(new_client_row);
          }
          this._bind_remove_client_buttons(new_client_row);
          this._initialize_edit_in_place();
          this.clients_count++;
        }.bind(this),
        error: function(data, status, error) {
          for(var index in data.responseJSON.errors) {
            if(data.responseJSON.errors.hasOwnProperty(index)) {
              this._add_alert(index.capitalize() + " " + data.responseJSON.errors[index], "error");
            }
          }
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