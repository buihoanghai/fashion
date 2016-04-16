
module.exports = {
 app_files: {
    js: [
      'frontend/source/common/*/*.js',
      'frontend/source/common/**/*.js',
      '!frontend/source/common/**/*.spec.js',

      'frontend/source/app/*/*.js',
      'frontend/source/app/*.js',
      'frontend/source/app/*/**/*.js',
      '!frontend/source/app/**/*.spec.js'
    ],
	scss:[
		'frontend/source/app/**/*.scss',
		'frontend/source/scss/**/*.scss',
		'!frontend/source/scss/**/main.scss',
		'!frontend/source/scss/**/main-import.scss',
	],
    jsunit: [ 'frontend/source/app/**/*.spec.js' ],

    atpl: [ 'frontend/source/app/**/*.tpl.html' ],
    ctpl: [ 'frontend/source/common/**/*.tpl.html' ]
 },
  test_files: {
    js: [ 'frontend/source/vendor/bower/angular-mocks/angular-mocks.js' ]
  },

 vendor_files: {
     js_header: [
     ],
     cdn_header: [],

     js_footer: [

        'frontend/source/vendor/bower/lodash/lodash.js',
	   	'frontend/source/vendor/bower/fastclick/lib/fastclick.js',
	    'frontend/source/vendor/bower/angular/angular.js',
		'frontend/source/vendor/bower/angular-sanitize/angular-sanitize.js',
        'frontend/source/vendor/bower/angular-ui-router/release/angular-ui-router.js',	
		'frontend/source/vendor/bower/angular-translate/angular-translate.js'		
     ],
     cdn_footer: [
     ],

     assets: [
     ]
 },
};
