(function (){
'use strict';

angular.module('MenuApp')
.controller('CategoriesController',CategoriesController);

CategoriesController.$inject = ['categoryItems'];
function CategoriesController(categoryItems){
  var categoryList = this;
  categoryList.categories = categoryItems;

}

})();
