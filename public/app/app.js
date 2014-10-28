var myApp = angular.module('myApp', [
	'ngRoute',
	'blockUI',
	'firebase',
	'navigatorServices',
	'staticControllers',
	'homeControllers',
	'eventsControllers',
	'meetingsControllers'
])
.config(function(blockUIConfigProvider) {
	blockUIConfigProvider.autoBlock(false);
});
