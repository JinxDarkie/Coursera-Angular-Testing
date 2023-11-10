(function (){ 
    /*Remember, you need this *immediately invoked function expression* to 
ensure variable scope stays in this function instead of going global and 
wasting resources. The angular.min file uses it too.*/

    'use strict'; 
    //Adds additional protections, much like the above IIFE
    //In this case I believe it's mainly enabling *strict* typing, so you can't
    //just 'x="yay";' a new var it needs to be defined as such.

    angular.module('firstAppTest', [])
    //The empty [] contains the module's dependencies.

    /*$scope is akin to props from react.js, except that it allows any
    variables you attach to it to be accessible to whatever element the
    .controller() is bound to (In this case 'controllerExample'). The
    children of that element can then access that data.*/
    .controller('controllerExample', function ($scope) {
        $scope.sampleText = "hello world!";

        $scope.inputText = "";
        $scope.inputLength= 0;
        $scope.displayLength = function(){
            $scope.inputLength = $scope.inputText.length;
        }
    });

})();