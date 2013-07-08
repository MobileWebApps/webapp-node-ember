/**
 * Defines Side Menu Items
 */
App.sideMenulinks = [];

App.sideMenulinks.push(App.Link.create({
	linkText : 'home',
	iconName : 'icon-layout',
	linkToRouteContext: App.context.default_app
}));

App.sideMenulinks.push(App.Link.create({
	linkText : 'apps list',
	iconName : 'icon-list',
	linkToRouteContext: App.context.default_app
}));

App.sideMenulinks.push(App.Link.create({
	linkText : 'elements page',
	iconName : 'icon-info-circled',
	linkToRouteContext: App.context.default_app
}));

App.sideMenulinks.push(App.Link.create({
	linkText : 'settings',
	iconName : 'icon-cog',
	linkToRouteContext: App.context.default_app
}));

App.sideMenulinks.push(App.Link.create({
	linkText : 'help',
	iconName : 'icon-help',
	linkToRouteContext: App.apps.help
}));

App.sideMenulinks.push(App.Link.create({
	linkText : 'logout',
	iconName : 'icon-ccw',
	linkToRouteContext: App.context.default_app
}));
