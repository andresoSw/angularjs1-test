(function () {
'use strict';

angular.module('MenuApp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

  // Redirect to home page if no other URL matches
  $urlRouterProvider.otherwise('/');

  // *** Set up UI states ***
  $stateProvider
  // Home page
  .state('home', {
    url: '/',
    templateUrl: 'src/menulist/templates/home.template.html'
  })

  // categories page
  .state('categories', {
    url: '/categories',
    templateUrl: 'src/menulist/templates/categorylist.template.html',
    controller: 'CategoriesController as categoryList',
    resolve : {
      categoryItems: ['MenuDataService',function(MenuDataService){
        return MenuDataService.getAllCategories();
      }]
    }

  })
  // items page
  .state('items', {
    url: '/items/{categoryShortName}',
    templateUrl: 'src/menulist/templates/itemlist.template.html',
    controller: 'CategoryForItemController as itemList',
    resolve : {
      items: ['$stateParams','MenuDataService',function($stateParams,MenuDataService){
          return MenuDataService.getItemsForCategory($stateParams.categoryShortName);
      }]
    }
  });
}

})();
