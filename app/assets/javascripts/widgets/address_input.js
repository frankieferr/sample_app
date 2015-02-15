$.widget("frankie.address_input", {

  _create: function() {
    this.address_input_name = this.options.address_input_name || "input_text";
    this.place_input_name = this.options.place_input_name || "response_data";
    this.latitude_input_name = this.options.latitude_input_name || "latitude";
    this.longitude_input_name = this.options.longitude_input_name || "longitude";

    // Initiate autocomplete
    this._google_maps_autocomplete(this.element[0]);

    this._setup();
  },

  _setup: function() {
    // Set initial coordinates
    this.update_coordinates(null, null);

    // Modify the name of the input to be full_address
    var name = $(this.element).attr("name");
    $(this.element).attr("name", name + "[" + this.address_input_name + "]");

    // Create hidden latitude and longitude inputs.
    this.latitude_input = $.parseHTML(JST["templates/address_input_widget/hidden_field"]({ field_path: name, field_name: this.latitude_input_name, value: "", id: "latitude" }))[0];
    this.longitude_input = $.parseHTML(JST["templates/address_input_widget/hidden_field"]({ field_path: name, field_name: this.longitude_input_name, value: "", id: "longitude" }))[0];
    $(this.latitude_input).insertAfter(this.element);
    $(this.longitude_input).insertAfter(this.element);

    // Create hidden text area for JSONified place result.
    this.place_textarea = $("<textarea>").attr("name", name + "[" + this.place_input_name + "]").hide().insertAfter(this.element)[0];
  },

  _destroy: function() {
    // Remove the pac containers.
    this._destroy_pac_containers();
  },

  _destroy_pac_containers: function() {
    var obj = this.autocomplete.gm_accessors_.place;
    $.each(Object.keys(obj), function(i, key) {
      if(typeof(obj[key]) == "object" && obj[key].hasOwnProperty("gm_accessors_")) {
        obj = obj[key].gm_accessors_.input[key];
        return false;
      }
    });
    $.each(Object.keys(obj), function(i, key) {
      if($(obj[key]).hasClass("pac-container")) {
        obj = obj[key];
        return false;
      }
    });
    $(obj).remove();
  },

  _google_maps_autocomplete: function(element) {
    var options = {
      componentRestrictions: { country: "au" }
    };
    var autocomplete = new google.maps.places.Autocomplete(element, options);
    google.maps.event.addListener(autocomplete, 'place_changed', function() {
      var place = autocomplete.getPlace();

      if (place && place.geometry) {
        this.update_place(place);
      }
    }.bind(this));

    // When the address changes, we don't have a lat/long anymore
    $(element).change(function() {
      this.update_place(null);
    }.bind(this));

    this.autocomplete = autocomplete;
  },

  set_input: function(input) {
    $(this.element).val(input);
  },

  get_input: function() {
    return $(this.element).val();
  },

  set_response_data: function(response_data) {
    $(this.place_textarea).html(response_data);
  },

  get_response_data: function() {
    return $(this.place_textarea).html();
  },

  get_coordinates: function() {
    return { latitude: this.latitude, longitude: this.longitude};
  },

  update_place: function(place) {
    if(place) {
      this.set_response_data(JSON.stringify(place));
      this.update_coordinates(place.geometry.location.lat(), place.geometry.location.lng());
    } else {
      this.set_response_data(null);
      this.update_coordinates(null, null);
    }
  },

  update_coordinates: function(latitude, longitude) {
    this.latitude = latitude;
    this.longitude = longitude;

    $(this.latitude_input).val(this.latitude);
    $(this.longitude_input).val(this.longitude);

    this._trigger("coordinates_changed", null, { latitude: latitude, longitude: longitude });
  }

});

