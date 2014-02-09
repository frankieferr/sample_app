$.widget("frankie.notices_accordion", $.frankie.new_form_widget, {
	_create: function() {
		this._super();
    this._add_loading_mask();
		this.notices_area = $(this.element).find("[data-area=notices]")[0];
		$.ajax("/notices", {
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
    var notices = []
    $.each(data.notices, function(id, notice){
      notices.push(notice);
    });
    notices.sort(function(a,b) { return parseInt(a.order_num) - parseInt(b.order_num)})
    var notices_area = $.parseHTML(JST["templates/notices_accordion_widget/notices"]({notices: notices}))
    $(this.notices_area).html(notices_area);
    this._initialize_accordion();
    this._initialize_best_in_place();
    this._bind_delete_buttons();
  },

	_initialize_accordion: function() {
		$( this.notices_area )
    .accordion({
      header: "> div > h3",
      heightStyle: "content"
    })
    .sortable({
      axis: "y",
      handle: "h3",
      cursor: "move",
      stop: function( event, ui ) {
        ui.item.children( "h3" ).triggerHandler( "focusout" );
        var ids = [];
        $(event.target).find("div.group").each(function(){
          ids.push($(this).attr("data-notice"));
        });
        $.ajax("/notices/order_notices", {
          type: "post",
          data: {
            ids: ids
          },
          dataType: "json",
          success: function() {
  					this._add_alert("Sucessfully rearranged", "success");
          }.bind(this),
        })
      }.bind(this)
    })
   },

   _bind_delete_buttons: function() {
    $(this.notices_area).find("[data-button=delete]").each(function(i, elem){
      $(elem).click(function(event) {
        this._click_delete(event.target);
      }.bind(this))
    }.bind(this))
   },

   _click_delete: function(button) {
    $.ajax("/notices/" + $(button).closest('div.group').data("notice"), {
        type: "delete",
        dataType: "json",
        success: function(data, status) {
          this._add_alert("Successfully deleted the notice", "success");
          $(button).closest('div.group').remove();
        }.bind(this).bind(button),
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

      $(this.element).mask("Sending...");

      var form_data = $(this.new_form).serializeArray();

      $.ajax("/notices", {
        type: "post",
        dataType: "json",
        data: form_data,
        success: function(data, status) {
          this._add_alert("Successfully created the notice", "success");
          this._click_cancel();
          $(this.notices_area).remove()
          var notice_area = $.parseHTML(JST["templates/notices_accordion_widget/main"]());
          $(this.element).append(notice_area);
          this.notices_area = $(this.element).find("[data-area=notices]")[0];
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