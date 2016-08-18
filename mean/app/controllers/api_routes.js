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