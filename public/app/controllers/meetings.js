var meetingsControllers = angular.module('meetingsControllers', []);

meetingsControllers.controller('MeetingsCtrl', ['$scope', 'blockUI', 'navigator', '$routeParams', '$timeout', function ($scope, blockUI, navigator, $routeParams, $timeout) {
	var meetingId = $routeParams.id;
	$scope.inMeeting = false;
	$scope.anotherInMeeting = false;
	$scope.navigateBack = function() {
		navigator.navigate('/events/' + meetingId);
	};
	$scope.persons = [];
	blockUI.start();
	var ref = new Firebase('https://blinding-heat-8272.firebaseio.com');
        ref.onAuth(function(authData) {
		if (authData != null) {
			var meetingRef = ref.child('meetings').child(authData.uid);
			meetingRef.once('value', function(snapshot) {
				if (snapshot.val() === null) {
				
					// UPDATING PARTICIPANT LIST
					var eventMeetingsRef = ref.child('events').child(meetingId).child('meetings');
					eventMeetingsRef.on('child_added', function(meetingSnap) {
						ref.child('users').child(meetingSnap.name()).once('value', function(userSnap) {
							var obj = userSnap.val();
							var first = obj.facebook.cachedUserProfile.first_name;
							var picture = obj.facebook.cachedUserProfile.picture.data.url;
							$timeout(function() {
								$scope.persons.push({"$id": userSnap.name(), first: first, picture: picture});
							});
						});
					});
					eventMeetingsRef.on('child_removed', function(snapshot) {
						$timeout(function() {
							$scope.persons.splice($scope.persons.findIndex(function(element, index, array) {
								return (element.$id === snapshot.name());
							}),1);
						});
					});
	
					// JOIN THE MEETING
					meetingRef.set({event: meetingId});
				 	var onDisconnectMeetingRef = meetingRef.onDisconnect();
					onDisconnectMeetingRef.remove();
					var eventMeetingsItemRef = ref.child('events').child(meetingId).child('meetings').child(authData.uid);
					eventMeetingsItemRef.set(true);
				 	var onDisconnectEventMeetingsItemRef = eventMeetingsItemRef.onDisconnect();
					onDisconnectEventMeetingsItemRef.remove();
					
					// UPDATE UI	
					$timeout(function() {
						$scope.navigateBack = function() {
							meetingRef.remove();
							eventMeetingsItemRef.remove();
							eventMeetingsRef.off();
							onDisconnectMeetingRef.cancel();	
							onDisconnectEventMeetingsItemRef.cancel();	
							navigator.navigate('/events/' + meetingId);
						}
						$scope.inMeeting = true;
						blockUI.stop();
					});
				} else { 
					$timeout(function() {
						$scope.anotherInMeeting = true;
						blockUI.stop();
					});
				}
			});
		} else {
			$timeout(function() {
				navigator.navigate('/login');
				blockUI.stop();
			});
		}
        });
}]);
