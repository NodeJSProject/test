'use strict';
var webApp = angular.module('webApp',['ngRoute', 'ngCookies', 'ngProgressLite']);

webApp.config(function($routeProvider, $locationProvider){
	$routeProvider
	.when('/',{
		templateUrl: 'app/views/user/list.html'
	})
	.when('/user/read/:userId',{
		templateUrl: 'app/views/user/detail.html'
	})
	.when('/user/edit/:userId',{
		templateUrl: 'app/views/user/edit.html'
	})
	.when('/login',{
		templateUrl: 'app/views/login.html'
	})
	.when('/fault',{
		templateUrl: 'app/views/fault.html'
	})
	.when('/404',{
		templateUrl: 'app/views/404.html'
	})
	.otherwise({redirectTo: '/404'});
	$locationProvider.html5Mode({
		enabled: true,
		requireBase: false
	});
});