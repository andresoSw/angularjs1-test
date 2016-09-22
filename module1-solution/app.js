(function () {
'use strict';

angular.module('LunchCheck',[])
.controller('LunchCheckController',LunchCheckController);

LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope) {
  /* Defaults */
  $scope.items = "";
  $scope.lunchMessage = "";
  $scope.maxItemCount = 3;
  $scope.itemSeparator = ",";
  $scope.emptyItemColor = "red";
  $scope.nonEmptyItemColor = "green";

  $scope.checkIfTooMuch = function() {
    if ($scope.items == "") {
      updateMessage("Please enter data first",$scope.emptyItemColor);
      return;
    }
    if (itemCountBellowMax($scope.items,$scope.itemSeparator,$scope.maxItemCount)) {
      updateMessage("Enjoy!",$scope.nonEmptyItemColor);
    } else updateMessage("Too much!",$scope.nonEmptyItemColor);
  }

  function itemCountBellowMax(items,separator,maxCount){
    var nonEmptyItems = items.split(separator).filter(function(item) { return item.trim() !== '' });
    return nonEmptyItems.length <= maxCount;
  }

  function updateMessage(messageText,messageColor) {
    $scope.lunchMessage = messageText;
    $scope.messageColor = messageColor;
  }

}

})();
