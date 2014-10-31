angular.module('myApp').config(['$routeProvider', function($routeProvider) {
	$routeProvider.
		when('/', {
      	  		templateUrl: 'views/home.html',
       			controller: 'HomeCtrl'
      		}).
		when('/login', {
      	  		templateUrl: 'views/login.html',
       			controller: 'LoginCtrl'
      		}).
		when('/error', {
      	  		templateUrl: 'views/error.html',
       			controller: 'ErrorCtrl'
      		}).
		when('/about', {
      	  		templateUrl: 'views/about.html',
       			controller: 'AboutCtrl'
		}).
                when('/events/:id', {
                        templateUrl: 'views/events.html',
                        controller: 'EventsCtrl'
                }).
                when('/events_editor', {
                        templateUrl: 'views/events_editor.html',
                        controller: 'EventsEditorCtrl'
                }).
                when('/events_editor/:id', {
                        templateUrl: 'views/events_editor.html',
                        controller: 'EventsEditorCtrl'
                }).
                when('/meetings/:id', {
                        templateUrl: 'views/meetings.html',
                        controller: 'MeetingsCtrl'
                }).
      		otherwise({
       			redirectTo: '/'
      		});
}]);
