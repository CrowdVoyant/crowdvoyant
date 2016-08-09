/**
* Topic
* @namespace crowdsource.forum.topic.services
*/
(function () {
	'use strict';

	angular
	.module('crowdsource.visual.services')
	.factory('Visual', Visual);

	Topic.$inject = ['$cookies', '$http', '$q', '$location', 'HttpService'];

	/**
	* @namespace Topic
	* @returns {Factory}
	*/

	function Visual($cookies, $http, $q, $location, HttpService) {
		var Visual = {
      getAllStories: getAllStories,
      getStories: getStories,
      getArticles: getArticles,
      getArticle: getArticle,
      getImages: getImages
		};

		return Visual;

		function getAllStories() {

			var settings = {
				url: '/api/story/',
				method: 'GET'
			};
			return HttpService.doRequest(settings);
		}

		function getStories(subs_id) {

			var settings = {
				url: '/api/subscription/'+subs_id+'/stories/',
				method: 'GET'
			};
			return HttpService.doRequest(settings);
		}

		function getArticles(story_id) {

			var settings = {
				url: '/api/story/'+story_id+'/articles',
				method: 'GET'
			};
			return HttpService.doRequest(settings);

		}

    function getArticle(article_id) {

			var settings = {
				url: '/api/article/'+article_id+'/',
				method: 'GET'
			};
			return HttpService.doRequest(settings);

		}

    function getImages(article_id) {

      var settings = {
        url: '/api/article/'+article_id+'/images/',
        method: 'GET'
      };
      return HttpService.doRequest(settings);

    }


	}

})();
