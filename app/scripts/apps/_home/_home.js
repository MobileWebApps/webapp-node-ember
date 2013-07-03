//App Config
App.apps.home = App.App.create({
	id : '_home',
	name : 'Home',
	listInHomeApp : false,
	showNavbar : false
});
App.apps.home.register();

// Home Route
App.HomeIndexRoute = Ember.Route.extend({
	setupController : function(controller) {
		var appList = App.hlp.array.getMapValues(App.appsById)
		controller.set('title', "My App");
		controller.set('apps', appList);
	}
});

// Home Controller
App.HomeIndexController = Ember.ArrayController.extend({
	searchApp : function() {
		// Get the todo title set by the "New Todo" text field
		var searchBox = this.get('appSearchBox');
		if (!searchBox.trim()) {
			return;
		}
		// TODO: Search Apps function
	}
});

