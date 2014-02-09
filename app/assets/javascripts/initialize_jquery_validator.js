$( document ).ready( function(){
	jQuery.validator.setDefaults({
    errorPlacement: function(error, element) {
    	$(element).tooltip('destroy');
      $(element).tooltip({title: error.text(), placement: 'bottom'});
    },

    highlight: function(element, errorClass, validClass) {
    	$(element).addClass('error');
		},
		unhighlight: function(element, errorClass, validClass) {
			$(element).removeClass('error');
		  $(element).tooltip('destroy');
		}
	});
});