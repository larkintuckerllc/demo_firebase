var eventsControllers = angular.module('eventsControllers', []);

eventsControllers.controller('EventsCtrl', ['$scope', 'blockUI', 'navigator', '$timeout', '$routeParams', '$window', function ($scope, blockUI, navigator, $timeout, $routeParams, $window) {
	$scope.navigate = navigator.navigate;
	var d = new Date();
	$scope.now = d.getTime();
	blockUI.start();
	var ref = new $window.Firebase('https://blinding-heat-8272.firebaseio.com');
        ref.onAuth(function(authData) {
		if (authData != null) {
			ref.child('events').child($routeParams.id).once('value', function(snapshot) {
				var val = snapshot.val();
				val.$id = $routeParams.id;
				$timeout(function() {
					$scope.event = val;
					blockUI.stop();
				});
			});
		} else {
			navigator.navigate('/login');
			blockUI.stop();
		}
        });
}]);
