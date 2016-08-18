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
webApp.factory('AUTH', function($http) {
	return {
		_signup : function(data) {
			return $http.post('/user', data);
		},
		_login : function(data) {
			return $http.post('/login', data);
		},
		_logout : function() {
			return $http.get('/logout');
		},
		_loggedin : function() {
			return $http.get('/loggedin');
		}
	}
});

webApp.factory('USER', function($http) {
	return {
		_list : function() {
			return $http.get('/api/user/');
		},
		_read : function(id) {
			return $http.get('/api/user/' + id);
		},
		_update : function(id, data) {
			return $http.put('/api/user/' + id, data);
		},
		_delete : function(id) {
			return $http.delete('/api/user/' + id);
		}
	}
});
//when application run
webApp.run(function($rootScope, AUTH, $cookies, ngProgressLite, $location){

	$rootScope.isUser = function(id){
		if (!_null($rootScope.user)) {
			if($rootScope.user.id == id)
				return true;
		}
		return false;
	};

	$rootScope.checkauth = function(data){
		//login (false) => data.self == false , (true) data.self = user data json
		if(data.self == false){
			$rootScope.isAuth = false;
		}
		else{
			$rootScope.isAuth = true;
			$rootScope.user = data.self;
			$location.path(back_url);
		}
	};

	var back_url = ($location.path() == '/login') ? '/' : $location.path();
	//run check once logged in
	AUTH._loggedin().success(function(data){
		$rootScope.checkauth(data);
	}).error(function(){
		$location.path('/login');
	});

	//when router start
	$rootScope.$on('$routeChangeStart', function(event, current, previous) {
		ngProgressLite.start();
	});

	//when router end
	$rootScope.$on('$routeChangeSuccess', function(event, current, previous) {
		ngProgressLite.done();
	});

});

// handle all authentication
webApp.controller('loginCtrl', function($scope, AUTH, $location) {
	$scope.items = {};

	$scope.login = function(){
		AUTH._login({email: $scope.email, password: $scope.password})
		.success(function(data){
			$scope.checkauth(data);
			console.clear();
		}).error(function(){alert('Tài khoản hoặc mật khẩu không đúng')});
	};

	
	$scope.signup = function(){
		AUTH._signup($scope.items)
		.success(function(data){
			console.log(data)
		}).error(function(data){
			console.log('data')
		});
	};

});

/* example tag: <a logout> link name </a> */
webApp.directive('logout', function($rootScope, AUTH, $location){
	return{
		restrict: 'A',
		link: function($scope, element, attributes){
			element.on('click', function(){
				AUTH._logout();
				$rootScope.isAuth = false;
				$rootScope.user = null;
				$location.path('/login');
			});
		}
	};
});


webApp.directive('headerPartial', function(){
	return{
		restrict: 'E',
		templateUrl: 'app/views/partials/header.html'
	}
});

webApp.directive('sidebarPartial', function(){
	return{
		restrict: 'E',
		templateUrl: 'app/views/partials/sidebar.html'
	}
});

webApp.directive('notificationsPartial', function(){
	return{
		restrict: 'E',
		templateUrl: 'app/views/partials/notifications.html'
	}
});

webApp.directive('breadcrumbPartial', function(){
	return{
		restrict: 'E',
		templateUrl: 'app/views/partials/breadcrumb.html'
	}
});

webApp.directive('messagesPartial', function(){
	return{
		restrict: 'E',
		templateUrl: 'app/views/partials/messages.html'
	}
});
webApp.controller('userListCtrl', function($scope, USER, $location) {
	$scope.items = {};

	USER._list()
	.success(function(data){
		console.log(data)
		$scope.$emit("title-page", "user List");
		
		$scope.items = data;
	});

	$scope.delete = function(index){
		if (confirm("Bạn thực sự muốn xóa ?")) {
			USER._delete(index).success(function(){
				$location.path('/');
			})
			.error(function(){
				alert('Có lỗi xảy ra vui lòng tải lại trang!');
			});
		}
	}

});

webApp.controller('userReadCtrl', function($scope, USER, $routeParams, $location) {
	$scope.items = {};

	USER._read($routeParams.userId)
	.success(function(data){
		$scope.$emit("title-page", "user detail");
		
		$scope.items = data;
	});

});

webApp.controller('userEditCtrl', function($scope, USER, $routeParams, $location) {
	$scope.items = {};

	USER._read($routeParams.userId)
	.success(function(data){
		$scope.$emit("title-page", "user edit");
		
		$scope.items = data;
		console.log($scope.items)
	});

	$scope.update = function(index){
		USER._read($routeParams.id, $scope.items)
		.success(function(data){
			$location.path('/');
		});
	};

});