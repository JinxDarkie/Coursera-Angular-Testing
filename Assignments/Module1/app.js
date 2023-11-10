/**
 * TODO: Implement basic result logic.
 *          itemTick = 0 : "Please enter data first"
 *          0 < itemTick <= 3 : "Enjoy!"
 *          3 < itemTick: "Too much!"
 */

(function (){ 
    'use strict'; 

    angular
        .module('lunchChecker', [])
        .controller('lunchCheckController', lunchCheckController);

    function lunchCheckController ($scope, $filter) {
        $scope.lunchList = "";
        $scope.outputMessage = "";

        $scope.processList = function (){
            var splitLunchList = $scope.lunchList.split(',');
            var itemTick = 0;

            splitLunchList.forEach(menuItem => {
                if(menuItem!=""){
                    itemTick++;
                }
            });

            $scope.outputMessage="Testing testing";
        }
    }

})();