var homeControllers = angular.module('homeControllers', []);

homeControllers.controller('HomeCtrl', ['$scope', 'blockUI', 'navigator', '$window', '$timeout', function ($scope, blockUI, navigator, $window, $timeout) {
	$scope.navigate = navigator.navigate;
	$scope.menuOpen = false;
	$scope.toggleMenu = function() {
		$scope.menuOpen = ! $scope.menuOpen;
	};
	var d = new Date();
	var now = d.getTime();
	$scope.currentEvent = function(event, index) {
		return event.start <= now;
	}
	$scope.futureEvent = function(event, index) {
		return event.start > now;
	}
	blockUI.start();
	var ref = new $window.Firebase('https://blinding-heat-8272.firebaseio.com');
	$scope.logout = function() {
		ref.unauth();
		navigator.navigate('/login');
	};
        ref.onAuth(function(authData) {
		if (authData != null) {
			$scope.user = {};
			$scope.user.first = authData.facebook.cachedUserProfile.first_name;
			$scope.user.picture = authData.facebook.cachedUserProfile.picture.data.url;
			ref.child('events').once('value', function(snapshot) {
				var val = snapshot.val();
				$timeout(function() {
					$scope.events  = Object.keys(val).map(function(key) {
						var obj = val[key];
						obj.$id = key;
						return obj;
					});
					blockUI.stop();
				});
			});
		} else {
			navigator.navigate('/login');
			blockUI.stop();
		}
        });
}]);
