/**
 * Creates theme object
 */
App.themes.iphoneBlack = App.App.create({
	id : 'iphoneBlack',
	name : 'Iphone Black',
});

/**
 * Apply theme effects to screen items
 */
App.themes.iphoneBlack.afterRender = function() {
	$(document).ready(
			function() {
				// header
				$('#btn-header-nav').click(
						function(e) {
							e.preventDefault();
							$('body').toggleClass("side-active");
							$('#body-container').toggleClass('span12')
									.toggleClass('span8');
							$('#header .navbar-inner').toggleClass('span12')
									.toggleClass('span8');
						});

				// footer
				$('#footer li a').click(function(e) {
					var li;
					e.preventDefault();
					li = $(e.target).parents("li[data-id]");
					$('#footer li').removeClass('active');
					return li.addClass('active');
				});

				// navbar
				$('#nav-bar li a').click(
						function(e) {
							var id, li;
							e.preventDefault();
							id = $(e.target).data("id");
							li = $(e.target).parent();
							if (typeof id === 'undefined') {
								id = $(e.target).parent().data("id");
								li = li.parent();
							}
							$('#nav-bar li').removeClass('active');
							li.addClass('active');

							// section for navigation.html page
							$('.listing-view ul[data-id]').addClass('hide');
							$('.listing-view ul[data-id="' + id + '"]')
									.removeClass('hide');
							// end section for navigation.html page

							// section for list.html page
							if (id != currentView) {
								$('#nav-bar').toggleClass('black');
							}
							// end section for list.html page

							// section for elements.html page
							if (id === 1 && currentView !== 1) {
								$('section.elements-section').addClass('hide');
								$('#bootstrap').removeClass('hide');
								$("#bootstrap .section").addClass('hide');
								$("#bootstrap .section." + section)
										.removeClass('hide');
							} else if (id === 2 && currentView !== 2) {
								$('section.elements-section').addClass('hide');
								$('#icons').removeClass('hide');
							}

							currentView = id;
							// end section for elements.html page
						});

				// section for elements.html page
				var section = 'bootstrap', currentView = 0;
				$('#selection select').on(
						'change',
						function(e) {
							e.preventDefault();
							$("#bootstrap .section").addClass('hide');
							section = $('#selection select').val();
							return $("#bootstrap .section." + section)
									.removeClass('hide');
						});
				// end section for elements.html page
			});
};

/**
 * Render Theme Templates
 */
App.themes.iphoneBlack.renderTemplate = function() {
	// Render default outlet
	this.render('theme_iphone_black/layout');

	this.render('theme_iphone_black/header', {
		outlet : 'header',
		into : 'theme_iphone_black/layout'
	}), this.render('theme_iphone_black/navbar', {
		outlet : 'navbar',
		into : 'theme_iphone_black/layout'
	}), this.render('theme_iphone_black/sidemenu', {
		outlet : 'sidemenu',
		into : 'theme_iphone_black/layout'
	}), this.render('theme_iphone_black/footer', {
		outlet : 'footer',
		into : 'theme_iphone_black/layout'
	});

	Ember.run.scheduleOnce('afterRender', this, function() {
		App.themes.iphoneBlack.afterRender();
	});
};