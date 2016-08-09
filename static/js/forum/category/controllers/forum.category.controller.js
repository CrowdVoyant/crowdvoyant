/**
* WorkerProfileController
* @namespace crowdsource.forum.category.controllers
*/
(function () {
  'use strict';

  angular
  .module('crowdsource.forum.category.controllers')
  .controller('CategoryController', CategoryController);


  angular
  .module('crowdsource.forum.category.controllers')
  .controller('AddCategoryController', AddCategoryController);

  CategoryController.$inject = ['$location', '$scope', 'Authentication', 'Category', '$mdDialog', '$mdToast'];
  AddCategoryController.$inject = ['$location', '$scope', 'Authentication', 'Category', '$mdDialog'];

  /**
  * @namespace CategoryController
  */
  function CategoryController($location, $scope, Authentication, Category, $mdDialog, $mdToast) {
    var self = this;
    var userAccount = Authentication.getAuthenticatedAccount();
    if (!userAccount) {
      $location.path('/login');
      return;
    }
    self.categories=[];

    self.getCategories = function(){
      Category.getCategories().then(function (categoriesData) {
        self.categories = categoriesData[0];
      });
    };
    self.getCategories();

    self.add = function(ev) {
      $mdDialog.show({
        controller: AddCategoryController,
        controllerAs: 'addcategory',
        templateUrl: '/static/templates/forum/newCategory.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:true
      })
      .then(function(answer) {
        Category.addCategory(answer).then(function (categoryData){
          if(categoryData[1]=201){
            self.getCategories();
            $mdToast.show(
                $mdToast.simple()
                .content('New Category added : '+categoryData[0].title)
                .hideDelay(3000)
            );
          }
        });
      }, function() {
      });
    };



  }

  function AddCategoryController($location, $scope, Authentication, Category,   $mdDialog){
    var self = this;
    self.category = {
      parent : ""
    };
    self.categories=[];
    self.getCategories = function(){
      Category.getCategories().then(function (categoriesData) {
        self.categories = categoriesData[0];
      });
    };
    self.getCategories();
    self.cancel = function() {
      $mdDialog.cancel();
    };
    self.answer = function(category) {
      $mdDialog.hide(category);
    };
  }
})();
