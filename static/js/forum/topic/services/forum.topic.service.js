/**
* Topic
* @namespace crowdsource.forum.topic.services
*/
(function () {
	'use strict';

	angular
	.module('crowdsource.forum.topic.services')
	.factory('Topic', Topic);

	Topic.$inject = ['$cookies', '$http', '$q', '$location', 'HttpService'];

	/**
	* @namespace Topic
	* @returns {Factory}
	*/

	function Topic($cookies, $http, $q, $location, HttpService) {
		var Topic = {
			getTopics: getTopics,
			getAllTopics: getAllTopics,
			getTopic: getTopic,
			addTopic: addTopic
		};

		return Topic;

		function getAllTopics() {

			var settings = {
				url: '/forum/topic/rest/',
				method: 'GET'
			};
			return HttpService.doRequest(settings);
		}

		function getTopics(c_id) {

			var settings = {
				url: '/forum/category/rest/'+c_id+'/topics/',
				method: 'GET'
			};
			return HttpService.doRequest(settings);
		}

		function getTopic(t_id) {

			var settings = {
				url: '/forum/topic/rest/'+t_id+'/',
				method: 'GET'
			};
			return HttpService.doRequest(settings);

		}

		function addTopic(topic) {

			var settings = {
				url: '/forum/topic/rest/',

				method: 'POST',
				data: {
					category : topic.category,
					title : topic.title
				}
			};
			return HttpService.doRequest(settings);
		}
	}

})();
