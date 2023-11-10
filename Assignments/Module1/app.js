/**
 * TODO:Implement basic result logic.
 *          itemTick = 0 : "Please enter data first"
 *          0 < itemTick <= 3 : "Enjoy!"
 *          3 < itemTick: "Too much!"
 *      Implement minification protection for dependency injection.
 */

(function (){ 
    'use strict'; 

    angular
        .module('lunchChecker', [])
        .controller('lunchCheckController', lunchCheckController);

    
    processList.$inject = ['$scope']; //Minification protection
    function lunchCheckController ($scope) {
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