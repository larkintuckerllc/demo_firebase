var staticControllers = angular.module('staticControllers', []);

staticControllers.controller('ErrorCtrl', ['$scope', '$window', function ($scope, $window) {
	$scope.reloadApplication = function() {
		$window.location.href = '/app/';
	}
}]);

staticControllers.controller('LoginCtrl', ['$scope','blockUI', 'navigator', function($scope, blockUI, navigator) {
	blockUI.start();
	var ref = new Firebase('https://blinding-heat-8272.firebaseio.com');
	$scope.login = function() {
		ref.authWithOAuthRedirect("facebook", function(error, authData) {
		}, {
			remember: "default",
			scope: ""
		});
	}
        ref.onAuth(function(authData) {
		if (authData != null) {
			ref.child('users').child(authData.uid).set(authData);
			navigator.navigate('/');
		}
		blockUI.stop();
        });
}]);

staticControllers.controller('AboutCtrl', ['$scope', 'navigator', function($scope, navigator ) {
	$scope.navigate = navigator.navigate;
}]);
