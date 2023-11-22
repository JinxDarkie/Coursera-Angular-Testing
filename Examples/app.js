/**Create a service that takes in text input and delays its own processing.
 * Check if input contains happy and is over 5 characters long.
 * IF successful, output "yay!"
 * IF either fail, output "Aw..."
 * This contains examples for how you use $q, which is mostly useful for
 * asynchronous programming (Mainly involving HTTP requests, tho as you can
 * see $timeout calls for its useage).
 * 
 * !!!Note on AngularJS digest cycle!!!
 * It does NOT catch text updates, as it is still the *same object* somehow.
 * To avoid this bug from now on, you need to make a new variable and stick it
 * onto the text you want updated!
 * 
 * 
 */

(function (){
    'use strict'; 
    angular.module('examplesApp', [])
        .service('exampleService',exampleService)
        .controller('asyncTextCheck',asyncTextCheck)
        .service('httpServer',httpServer)
        .controller('httpController',httpController);

    exampleService.$inject=['$q','$timeout'];
    function exampleService($q, $ti){
        var service = this;

        service.inputText="";
        service.resultText="Put an input!";

        /**Example of how you can have multiple promises running at the
         * same time.
         * You use $q.all to fire every relevant promise/deferred task, then,
         * when they're all complete, you use .then() for what happens when all
         * tasks are successful, and .catch() if one of them fails.
         * 
         * This isn't the only way async tasks can be handled, .race() for
         * example resolves when atleast one called task is completed.
         * 
         * Refer to https://docs.angularjs.org/api/ng/service/$q for documentation
         */
        service.respond = function(){
            var lengthPromise = this.checkLength(this.inputText);
            var happyPromise = this.containsHappy(this.inputText);

            console.log("Processing input...");

            /**Note in regards to $q.all
             * Basically it only returns the reject result of the earliest
             * error to be passed down into the following methods.
             * IF inputText were "boo!" for example, err.message would read
             * checkLength's rejection output. If inputText were "I'm angry!"
             * then err.message will read containsHappy's rejection output.
             * You can't combine multiple rejection outputs basically.
            */
            var returnPromise = $q
                .all([lengthPromise, happyPromise])
                .then(function (response){
                    service.resultText = "Yay!";
                    console.log("Yay! ");
                })
                .catch(function (err){
                    service.resultText= "Aww... " + err.message;
                    console.log("Aww... " + err.message);
                });

            return returnPromise;
        };

        /**The general pattern here is that you first create a defer object,
         * which represents an asynchronous task that will eventually finish.
         * You then perform the asynchronous task, resolve or reject accordingly,
         * then return the result.
         */
        service.checkLength = function(input){
            console.log(input);

            var deferred= $q.defer();
            
            var result = {message: ""};
            /*This is important for outputs on resolve/rejection.
            //Can be any variable. Objects are ideal so you can return multiple
            //things (A la, an "ok" message and the results of a calculation,
            //for example).*/

            //$ti delays the following's execution by 1 second.
            $ti(function(){
                if (input.length >= 5){
                    deferred.resolve(result);
                } else {
                    result.message = "I bet you're faking it...";
                    deferred.reject(result);
                }
            }, 1000);

            return deferred.promise;
        };

        service.containsHappy = function(input){
            var deferred= $q.defer();
            var result = {message: ""};

            $ti(function(){
                if(input.toLowerCase().includes("happy")){
                    deferred.resolve(result);
                } else {
                    result.message = "Not happy?...";
                    deferred.reject(result);
                }
            }, 2000);

            return deferred.promise;
        };

        service.passInput = (input) => {
            service.inputText = input;
        };
    };

    asyncTextCheck.$inject=['exampleService', '$scope'];
    function asyncTextCheck(service, $sc){
        this.inputText=service.inputText;
        $sc.resultText=service.resultText;

        this.checkInput= function() {
            /**Note to self, when updating variables in service, you NEED
             * to do it via a function call. Things like input text do not
             * automatically get passed to the service when changed.
             */
            service.passInput(this.inputText);

            console.log("input registered...");
            console.log("Current input: " + this.inputText);

            /**
             * Unique bug for this situation: Text does not wait for async
             * service promises to resolve before updating, leading to the
             * dom text only updating on a second button click. To ensure code 
             * only executes when promises
             * are resolved, you have to make the function pass its resulting
             * promise down here so you can wrap the code in a 
             * .then((respond)=>{ })
             */
            service.respond().then((respond) =>{
            
                /**ANOTHER NOTE, you NEED to manually update variables in the scope.
                 * Again, they don't update automatically when service variables
                 * change.
                 */
                $sc.resultText = service.resultText;
            });
        };
    };

    httpServer.$inject=['$q','$http'];
    function httpServer($q,$http){
        var service=this;
        service.menuList={};

        service.promiseHTTP= function(search){
            let result={};

            result=$http({
                method: "GET",
                url: "https://coursera-jhu-default-rtdb.firebaseio.com/menu_items.json"
            });

            service.menuList = result;
            return result;
        };
        service.serveHTTP=function(search){
            let deferred=$q.defer();
            let result={};
        };
    };

    httpController.$inject=['httpServer','$scope'];
    function httpController(service,$sc){
        $sc.menuList=service.menuList;
        $sc.searchInput="";
        $sc.searchFailed=false;
        
        $sc.serveSearch=function(){
            service.promiseHTTP($sc.searchInput)
                .then((response)=>{
                    $sc.searchFailed=false;
                    $sc.menuList=service.menuList;
                })
                .catch((errResponse)=>{
                    $sc.searchFailed=true;
                    console.log(errResponse.status);
                });
        };
    };

})();