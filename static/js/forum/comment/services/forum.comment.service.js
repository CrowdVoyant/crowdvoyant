/**
* Category
* @namespace crowdsource.forum.comment.services
*/
(function () {
	'use strict';

	angular
	.module('crowdsource.forum.comment.services')
	.factory('Comment', Comment);

	Comment.$inject = ['$cookies', '$http', '$q', '$location', 'HttpService'];

	/**
	* @namespace Comment
	* @returns {Factory}
	*/

	function Comment($cookies, $http, $q, $location, HttpService) {
		var Comment = {
			getComments: getComments,
			getPolls: getPolls,
			getAllComments: getAllComments,
			addComment: addComment,
			addLike: addLike,
			removeLike: removeLike,
			addPoll: addPoll
		};

		return Comment;

		function getComments(t_id) {

			var settings = {
				url: '/forum/topic/rest/'+t_id+'/comments/',
				method: 'GET'
			};
			return HttpService.doRequest(settings);
		}

		function getPolls(t_id) {

			var settings = {
				url: '/forum/topic/rest/'+t_id+'/polls/',
				method: 'GET'
			};
			return HttpService.doRequest(settings);
		}

		function getAllComments() {

			var settings = {
				url: '/forum/comment/rest/',
				method: 'GET'
			};
			return HttpService.doRequest(settings);
		}

		function addComment(comment) {

			var settings = {
				url: '/forum/comment/rest/',
				method: 'POST',
				data: {
					topic: comment.topic,
					comment: comment.comment,
					comment_html: comment.comment
				}
			};
			return HttpService.doRequest(settings);
		}

		function addLike(comment) {

			var settings = {
				url: '/forum/comment/like/rest/',
				method: 'POST',
				data: {
					comment: comment.id
				}
			};
			return HttpService.doRequest(settings);
		}

		function removeLike(comment) {

			var settings = {
				url: '/forum/comment/like/rest/'+comment.liked.id+'/',
				method: 'DELETE'
			};
			return HttpService.doRequest(settings);
		}

		function addPoll(poll) {

			var settings = {
				url: '/forum/topic/poll/rest/',
				method: 'POST',
				data: {
					topic: poll.topic,
					choice_limit: poll.choice_limit,
					choices: poll.choices
				}
			};
			return HttpService.doRequest(settings);
		}
	}

})();
