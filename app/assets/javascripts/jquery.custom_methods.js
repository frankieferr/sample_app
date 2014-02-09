 //= require jquery.validate

jQuery.validator.addMethod("positive", function(value, element) {
  return this.optional(element) || value > 0;
}, "Please enter a positive number");

jQuery.validator.addMethod("integer", function(value, element) {
  return this.optional(element) || value % 1 === 0;
}, "Please enter an integer number");

jQuery.validator.addMethod("number-not-taken", function(value, element, where) {
	var numbers = [];
	var not_taken = true;
	var	count = 0;

	if(where=="team") {
		$(element).closest("[data-area=team]").find("[data-value=number]").each(function(i, number){
			numbers.push($(number).find("span").text());
		});
		numbers.each(function(a_value) {
			if(value == a_value) count++;
		});
	} else if(where=="register_team") {
		$(element).closest("[data-area=players]").find("[data-input=number]").each(function(i, number){
			if(number != element){
				numbers.push($(number).val());
			}
		});
		numbers.each(function(a_value) {
			if(value == a_value) count++;
		});
	}
		if(count > 0) not_taken = false;

  return this.optional(element) || not_taken;
}, "The number has already been taken");