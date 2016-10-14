(function (){
'use strict';

angular.module('MenuApp')
.controller('CategoryForItemController',CategoryForItemController);

CategoryForItemController.$inject = ['items'];
function CategoryForItemController(items){
  var itemList = this;
  itemList.items = items.menu_items;
  itemList.category = items.category;

}

})();
