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