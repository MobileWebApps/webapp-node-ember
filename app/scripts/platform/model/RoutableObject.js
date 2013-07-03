require('scripts/platform/model/Context');

/**
 * Define objects that can be used on
 * ember routes
 */
App.RoutableObject = Ember.Object.extend({
	id : null,
	name : 'unnamed',
	listInHomeApp : true,
	showNavbar : true,
	showFooter : true,
	
	location : function() {
		return App.context.Apps_location + this.get('id');
	}.property('id'),

	indexTemplate : function() {
		return this.get('location') + '/index';
	}.property('location'),

	route : function() {
		return this.get('id');
	}.property('id'),
	
	routerMapResource : function() {
		
	}

});