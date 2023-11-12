/**
 * TODO:
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
            if($scope.lunchList==""){
                $scope.outputMessage="Please enter data first.";
                return;
            }

            var splitLunchList = $scope.lunchList.split(',');
            var itemTick = 0;

            splitLunchList.forEach(menuItem => {
                if(!menuItem.trim().length){ //Check to ensure item isn't empty/whitespace
                    itemTick++;
                }
            });

            if(itemTick <= 3) {
                $scope.outputMessage="Enjoy!";
            } else {
                $scope.outputMessage="Too much!";
            }
        }
    }

})();