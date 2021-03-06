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
