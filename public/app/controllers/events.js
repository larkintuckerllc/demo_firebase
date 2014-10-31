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

var buildStart = function(scope) {
	return new Date(
		scope.startdate.getFullYear(),
		scope.startdate.getMonth(),
		scope.startdate.getDate(),
		scope.starttime.getHours(),
		scope.starttime.getMinutes(),
		scope.starttime.getSeconds(),
		0
	);
};
var buildEnd = function(scope) {
	return new Date(
		scope.enddate.getFullYear(),
		scope.enddate.getMonth(),
		scope.enddate.getDate(),
		scope.endtime.getHours(),
		scope.endtime.getMinutes(),
		scope.endtime.getSeconds(),
		0
	);
};

var eventsEditorCtrl = eventsControllers.controller('EventsEditorCtrl', ['$scope', 'blockUI', 'navigator', '$timeout', '$routeParams', '$window', function ($scope, blockUI, navigator, $timeout, $routeParams, $window) {
	$scope.id = $routeParams.id;
	$scope.navigate = navigator.navigate;
	$scope.validForm = function() {
		var valid = false;
		if (
			! $scope.editor.name.$error.required
			&& ! $scope.editor.startdate.$error.date
			&& ! $scope.editor.startdate.$error.required
			&& ! $scope.editor.starttime.$error.time
			&& ! $scope.editor.starttime.$error.required
			&& ! $scope.editor.enddate.$error.date
			&& ! $scope.editor.enddate.$error.required
			&& ! $scope.editor.endtime.$error.time
			&& ! $scope.editor.endtime.$error.required
		) {
			if (buildStart($scope).getTime() < buildEnd($scope).getTime()) {
				valid = true;
			}
		} 
		return valid;
	};
	blockUI.start();
	var ref = new $window.Firebase('https://blinding-heat-8272.firebaseio.com');
	$scope.add = function() {
		blockUI.start();
		// TRY CATCH IN PLACE BECAUSE THROWS ERROR INSTEAD OF RETURNING WITH ERROR
		try {
			ref.child('events').push({
				name: $scope.name,
				start: buildStart($scope).getTime(),
				end: buildEnd($scope).getTime(),
				image: 'assets/dynamic/img/gain.png',
				link: 'http://gainnet.org'
			}, function(error) {
				$timeout(function() {
					if (! error) {
						navigator.navigate('/');
					} else {
						navigator.navigate('/error');
					}
					blockUI.stop();
				});
			});	
		} catch(err) {
			navigator.navigate('/error');
			blockUI.stop();
		}
	};
	$scope.delete = function() {
		blockUI.start();
		// TRY CATCH IN PLACE BECAUSE THROWS ERROR INSTEAD OF RETURNING WITH ERROR
		try {
			ref.child('events').child($scope.id).remove(function(error) {
				$timeout(function() {
					if (! error) {
						navigator.navigate('/');
					} else {
						navigator.navigate('/error');
					}
					blockUI.stop();
				});
			});
		} catch(err) {
			navigator.navigate('/error');
			blockUI.stop();
		}
	};
	$scope.update = function() {
		blockUI.start();
		// TRY CATCH IN PLACE BECAUSE THROWS ERROR INSTEAD OF RETURNING WITH ERROR
		try {
			ref.child('events').child($scope.id).set({
				name: $scope.name,
				start: buildStart($scope).getTime(),
				end: buildEnd($scope).getTime(),
				image: 'assets/dynamic/img/gain.png',
				link: 'http://gainnet.org'
			}, function(error) {
				$timeout(function() {
					if (! error) {
						navigator.navigate('/events/' + $scope.id);
					} else {
						navigator.navigate('/error');
					}
					blockUI.stop();
				});
			});	
		} catch(err) {
			navigator.navigate('/error');
			blockUI.stop();
		}
		
	};
        ref.onAuth(function(authData) {
		if (authData != null) {
			if ($scope.id) {
				ref.child('events').child($routeParams.id).once('value', function(snapshot) {
					var val = snapshot.val();
					$timeout(function() {
						$scope.name = val.name;
						var start = new Date(val.start);
						$scope.startdate = new Date(
							start.getFullYear(),
							start.getMonth(),
							start.getDate(),
							0,
							0,
							0,
							0
						);
						$scope.starttime = new Date(
							1970,
							1,
							1,
							start.getHours(),
							start.getMinutes(),
							start.getSeconds(),
							0
						);
						var end = new Date(val.end);
						$scope.enddate = new Date(
							end.getFullYear(),
							end.getMonth(),
							end.getDate(),
							0,
							0,
							0,
							0
						);
						$scope.endtime = new Date(
							1970,
							1,
							1,
							end.getHours(),
							end.getMinutes(),
							end.getSeconds(),
							0
						);
						blockUI.stop();
					});
				});
			} else {
				blockUI.stop();
			}
		} else {
			navigator.navigate('/login');
			blockUI.stop();
		}
        });
}]);
