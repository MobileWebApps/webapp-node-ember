/**
 * Defines Footer Toolbar Items
 */
App.footerToolbarlinks = [];

App.footerToolbarlinks.push(App.Link.create({
	linkText : 'maps',
	iconName : 'icon-location',
	linkToRouteContext: App.apps.maps
}));

App.footerToolbarlinks.push(App.Link.create({
	linkText : 'apps list',
	iconName : 'icon-list',
	linkToRouteContext: App.context.default_app
}));

App.footerToolbarlinks.push(App.Link.create({
	linkText : 'help',
	iconName : 'icon-info-circled',
	linkToRouteContext: App.apps.help
}));

App.footerToolbarlinks.push(App.Link.create({
	linkText : 'more',
	iconName : 'icon-dot-3',
	linkToRouteContext: App.context.default_app
}));