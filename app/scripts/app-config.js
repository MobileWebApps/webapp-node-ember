//Log Device Browser
console.debug('Browser:',navigator.userAgent);

// Create a namespaces
App.hlp = {}
App.components = {};
App.themes = {};


// Load Components
require('scripts/platform/**/*');
require('scripts/helpers/**/*');
require('scripts/components/**/*');
require('scripts/themes/**/*');
require('scripts/apps/**/*');


// Load Application Wide UI Effects
require('scripts/app-effects');


// Configure Context
App.context.default_app = App.apps.home;
App.context.setCurrentApp(App.context.default_app);

App.context.default_theme = App.themes.iphoneBlack;
App.context.current_theme = App.context.default_theme;

