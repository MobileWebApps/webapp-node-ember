App.hlp.array = {}

App.hlp.array.getMapValues = function(map) {
	var values = Object.keys(map).map(function(key) {
		return map[key];
	});
	return values;
}