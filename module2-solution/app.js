(function(){
'use strict';

angular.module('ShoppingListCheckOff',[])
.service('ShoppingListCheckOffService',ShoppingListCheckOffService)
.controller('ToBuyController',ToBuyController)
.controller('AlreadyBoughtController',AlreadyBoughtController);

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var toBuy = this;

  toBuy.moveFromBuyToBought = function(itemIndex) {
    ShoppingListCheckOffService.moveFromBuyToBought(itemIndex);
  };

  toBuy.getToBuyList = function(){
    return ShoppingListCheckOffService.getToBuyList();
  }
}

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var alreadyBought = this;

  alreadyBought.getBoughtList = function() {
    return ShoppingListCheckOffService.getBoughtList();
  }
}

function ShoppingListCheckOffService () {
  var service = this;
  service.toBuyList = [
    { name: "cookies", quantity: 6 },
    { name: "more Cookies", quantity: 7 },
    { name: "even more cookies", quantity: 8 },
    { name: "super cookies", quantity: 15 },
    { name: "not that good but still OK cookies", quantity: 10 }
  ];

  service.boughtList = [];

  service.getToBuyList = function(){
    return service.toBuyList;
  }

  service.getBoughtList = function(){
    return service.boughtList;
  }

  service.getItemFromBuyList = function(itemIndex){
    return service.toBuyList[itemIndex];
  };

  service.addToBoughtList = function(item){
    service.boughtList.push(item);
  };

  service.popFromToBuyList = function(itemIndex){
    var item = service.getItemFromBuyList(itemIndex);
    service.toBuyList.splice(itemIndex,1); //removing a single item
    return item;
  };

  service.moveFromBuyToBought = function (itemIndex) {
    var item = service.popFromToBuyList(itemIndex);
    service.addToBoughtList(item);
  };

}


})();
