App.context = Ember.Object.extend({ 
	appName: "Mobile App",
	themes_location: "templates/themes/",
	Apps_location: "templates/apps/",
	showNavbar : false,
	showFooter : false,
	default_app : {},
	default_theme : {},
	current_app : {},
	current_theme : {}

});

App.context.setCurrentApp = function(app) {
	App.context.current_app = app;
	App.context.showNavbar = app.showNavbar;
	App.context.showFooter = app.showFooter;
}
