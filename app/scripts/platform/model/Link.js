App.Link = Ember.Object.extend({
	showLink : true,
	linkText : 'link',
	iconName : 'icon-layout',
	linkToRoute: 'apps.go',
	linkToRouteContext: null,
	cssClassName: 'linkObject',
	
	iconTag : function() {
		return '<i class="' + this.get('iconName') + '"></i>';
	}.property('iconName'),
	
	active : function() {
		return this.get('linkToRouteContext')== App.context.current_app;
	}.property('linkToRouteContext'),
	
});
