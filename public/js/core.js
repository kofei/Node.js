var scotchTodo = angular.module('scotchTodo', []);

function mainController($scope, $http) {
	$scope.formData = {};

	// when landing on the page, get todos and show them
	$http.get('./api/todos')
		.success(function(data) {
			$scope.todo = data;
		})
		.err(function(data) {
			console.log('Error:' + data);
		});

	// when submitting the add form, send the text to the node API
	$scope.createTodo = function() {
		$http.createTodo = function()  
			$http.post('/api/todos', $scope.formData)
				.success(function(data) {
					$scope.formData = {};				// clear the form so our user is ready to enter another
					$scope.todos = data;
					if (data.status == "FAIL") {
						alert (data.mag);
					}
					console.log(data);
				})
				.err(function(data) {
					console.log('Error: ' + data);
				});		
	};

	// delete a todo after checking it
	$scope.deleteTodo = function(id) {
		$http.delete('/api/todos/' + id)
			.success(function(data) {
				$scope.todo = data;
			})
			.error(function(data){
				console.log('Error: ' + data);
			});
	};
}
