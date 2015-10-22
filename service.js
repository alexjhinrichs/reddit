var app = angular.module('reddit');

app.service('FirebaseService', function($http, $q) {

	this.getData = function() {

		return $http ({
			method: 'GET',
			url: 'https://devmtn.firebaseio.com/posts.json'
		})
	};


	this.postNew = function(post) {

	  var guid = function() {
	    var s4 = function() {
	      return Math.floor((1 + Math.random()) * 0x10000)
	        .toString(16)
	        .substring(1);
	    }
	    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
	      s4() + '-' + s4() + s4() + s4();
	  }

	  	post.timestamp = Date.now();
		post.comments = [];
		post.karma = 0;
		post.id = guid();

	  var dfr = $q.defer();
	  $http ({
	  	method: 'PUT',
	  	url: 'https://devmtn.firebaseio.com/posts/' + post.id + '.json',
	  	data: post
	  }).then(function(res) {
	  	console.log(res);
	  	dfr.resolve(res);
	  });
	  return dfr.promise;
	};

	this.vote = function(id, direction, karma) {
		if(direction === 'up') {
			karma++;
		} else if (direction === 'down') {
			karma--;
		}
			return $http ({
			method: 'PATCH',
			url: 'https://devmtn.firebaseio.com/posts/' + id + '.json',
			data: {karma}
		})
	};

    this.submitComment = function(id, comments) {
        return $http({
            method: 'PATCH',
            url: 'https://devmtn.firebaseio.com/posts/' + id + '.json',
            data: {comments}
        })
    };
});