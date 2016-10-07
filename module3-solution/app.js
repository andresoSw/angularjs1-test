(function(){
'use strict';

angular.module('NarrowItDownApp',[])
.controller('NarrowItDownController',NarrowItDownController)
.service('MenuSearchService',MenuSearchService)
.constant('ApiBasePath', "http://davids-restaurant.herokuapp.com")
.directive('foundItems',FoundItems)
.directive('foundItemsDescription', FoundItemsDescription)
.directive('itemsLoaderIndicator',ItemsLoaderIndicator);

function FoundItems(){
  var ddo = {
    templateUrl: 'foundMenuItems.html',
    scope: {
      menuItems: '<',
      onRemove: '&',
    }
  };
  return ddo;
}

function FoundItemsDescription() {
  var ddo = {
    template: '{{ item.short_name }},{{ item.description}}'
  };
  return ddo;
}

function ItemsLoaderIndicator() {
  var ddo = {
    templateUrl: 'loader/itemsloaderindicator.template.html',
    scope: {
          isLoading: '&'
    },
    link: ItemsLoaderIndicatorDirectiveLink
  }
  return ddo;
}

function ItemsLoaderIndicatorDirectiveLink(scope, element, attrs, controller){
  scope.$watch('isLoading()', function (newValue, oldValue) {
      var loaderElem = element.find("div");
      var isLoading = newValue;
    if (isLoading) {
      loaderElem.css("display","inline");
    }
    else { loaderElem.css("display","none");
    }
  });
}

NarrowItDownController.$inject = ['MenuSearchService']
function NarrowItDownController(MenuSearchService) {
  var menu = this;
  menu.searchTerm = "";
  menu.message = "";
  menu.noResultsDefaultMessage = "Nothing found";
  menu.found = null;
  menu.isDataLoading = false;

  menu.getMatchedMenuItems = function(){
      if (menu.searchTerm == "") {
        menu.message = menu.noResultsDefaultMessage;
        return;
      }
      menu.isDataLoading = true;
      var promise = MenuSearchService.getMatchedMenuItems(menu.searchTerm);

      promise.then(function (response) {
        menu.isDataLoading = false;
        menu.found = response;
        menu.message = (menu.found.length==0) ? menu.noResultsDefaultMessage : "";
      })
      .catch(function (error) {
        resetController();
        console.log(error);
      });
  }

  menu.isLoading = function() {
    return menu.isDataLoading;
  }

  function resetController() {
    menu.found = [];
    menu.message = "";
    menu.isDataLoading = false;
  }

  menu.removeItem = function(index) {
    menu.found.splice(index,1); //one removal @ time
  };
}

MenuSearchService.$inject = ['$http','ApiBasePath'];
function MenuSearchService($http,ApiBasePath){
  var service = this;

  function filterMenuItems(items,attribute,searchTerm) {
      return items.filter(function(item){
          return (item[attribute].toLowerCase().indexOf(searchTerm) !== -1)
      });
  }

  service.getMatchedMenuItems = function(searchTerm) {
      var response = $http({
        method: "GET",
        url: (ApiBasePath + "/menu_items.json")
      }).then(function(result){
          var menuItems = result.data.menu_items;
          // process result and only keep items that match
          var foundItems = filterMenuItems(menuItems,'description',searchTerm);
          // return processed items
          return foundItems;
      });
      return response;
  }
}

})();
