$( document ).ready(function() {
  $.each($("[data-widget][data-auto-widget=true]"), function(i, elem) {
  	$(elem)[$(elem).data("widget")]();
  });
});