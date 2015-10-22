var app = angular.module('reddit');

app.controller('PostsController', function($scope, FirebaseService) {

	$scope.getPosts = function() {
		FirebaseService.getData().then(function(data) {
			$scope.posts = data.data;
			console.log(data);
		})
	}
	$scope.getPosts();

	$scope.addPost = function() {
		FirebaseService.postNew($scope.newPost)
			.then(function(res) {
				$scope.getPosts();
		})
	};


	$scope.vote = function(id, direction, karma) {
		FirebaseService.vote(id, direction, karma)
			.then(function() {
				$scope.getPosts();
		})
	};

	$scope.submitComment = function(id, text, comments) {
		if(!Array.isArray(comments)){
            comments = [];
        }
		FirebaseService.submitComment(id, comments)
			.then(function() {
				$scope.getPosts();
			})
	}
});