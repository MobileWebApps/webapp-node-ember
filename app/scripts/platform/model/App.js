require('scripts/platform/model/RoutableObject');

App.apps = {};
App.appsById = [];

App.App = App.RoutableObject.extend({
	register: function() {
		App.appsById[this.id] = this;
	}
});