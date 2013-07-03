require('scripts/components/views/GoogleMapsApi');

App.components.GoogleMaps = {};

App.components.GoogleMaps.getGeocoder = function() {
	if (!App.components.GoogleMaps.geocoder) {
		App.components.GoogleMaps.geocoder = new google.maps.Geocoder();
	}
	return App.components.GoogleMaps.geocoder;
}

/**
 * Converts an string to a location
 * and centers the map on it
 */
App.components.GoogleMaps.findAddress = function(address, map) {
	App.components.GoogleMaps
			.getGeocoder()
			.geocode(
					{
						'address' : address
					},
					function(results, status) {
						if (status == google.maps.GeocoderStatus.OK) {
							map.setCenter(results[0].geometry.location);
							var marker = new google.maps.Marker({
								map : map,
								position : results[0].geometry.location
							});
						} else {
							alert("Geocode was not successful for the following reason: "
									+ status);
						}
					});
}


/**
 * Reverse geocode a location (finds what exists in a given point)
 * and centers the map on it
 */
App.components.GoogleMaps.findLocation = function(latlng, map) {
	var latlng = input.split(",", 2);
	var lat = parseFloat(latlngStr[0]);
	var lng = parseFloat(latlngStr[1]);
	var latlng = new google.maps.LatLng(lat, lng);
	App.components.GoogleMaps.getGeocoder().geocode({
		'latLng' : latlng
	}, function(results, status) {
		if (status == google.maps.GeocoderStatus.OK) {
			if (results[1]) {
				map.setZoom(11);
				marker = new google.maps.Marker({
					position : latlng,
					map : map
				});
				infowindow.setContent(results[1].formatted_address);
				infowindow.open(map, marker);
			}
		} else {
			alert("Geocoder failed due to: " + status);
		}
	});
}


/**
 * Renders Google Maps in a <div> element
 */
App.components.GoogleMaps.createMap = function(mapdiv, mapOptions) {
	// Enable the visual refresh
	google.maps.visualRefresh = true;

	// Creates Map
	var map = new google.maps.Map(mapdiv, mapOptions);

	// Show Traffic Layer
	if (false) {
		var trafficLayer = new google.maps.TrafficLayer();
		trafficLayer.setMap(map);
	}

	// Show Transit Layer
	if (false) {
		var transitLayer = new google.maps.TransitLayer();
		transitLayer.setMap(map);
	}

	// Show Bicycling Layer
	if (false) {
		var bikeLayer = new google.maps.BicyclingLayer();
		bikeLayer.setMap(map);
	}

	// Show Weather Layer
	if (false) {
		google.maps.event.addListener(weatherLayer, 'click', function(e) {
			alert('The current temperature at ' + e.featureDetails.location
					+ ' is ' + e.featureDetails.current.temperature
					+ ' degrees.');
		});

		var weatherLayer = new google.maps.weather.WeatherLayer({
			temperatureUnits : google.maps.weather.TemperatureUnit.FAHRENHEIT
		});
		weatherLayer.setMap(map);

		var cloudLayer = new google.maps.weather.CloudLayer();
		cloudLayer.setMap(map);

	}

};

/**
 * Creates an Ember View to display Google Maps
 */
App.GoogleMapsView = Ember.View.extend({
	templateName : 'views/googlemaps',
	map : null,
	didInsertElement : function() {
		var mapOptions = {
			center : new google.maps.LatLng(40.714353, -74.005973),
			zoom : 13,
			mapTypeId : google.maps.MapTypeId.ROADMAP,
			disableDefaultUI : false, // disables automatic behaviour
			panControl : false,
			mapTypeControl : true,
			zoomControl : true,
			scaleControl : true,
			streetViewControl : true,
			overviewMapControl : true
		};

		var mapdiv = this.$().get(0);
		var map = App.components.GoogleMaps.createMap(mapdiv, mapOptions);
		this.set('map', map);

		// Configure Map Area
		var w = '600px';
		var h = '800px';
		var useragent = navigator.userAgent;
		if (useragent.indexOf('iPhone') != -1
				|| useragent.indexOf('Android') != -1) {
			width = '100%';
			height = '100%';
		}

		this.$().css({
			width : w,
			height : h
		});

	}
});
