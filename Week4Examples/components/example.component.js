(()=>{
    'use strict';
    angular.module('examplesApp')
        .controller('exampleController', exampleController);
    
    exampleController.$inject=['exampleService', '$state'];
    function exampleController (service, $state){
        let $ctrl = this;
        $ctrl.exampleVar = '';

        $ctrl.exampleMethod = function(){
            console.log($ctrl);
            console.log(service.exampleVariable);
            console.log($state);
        };
    };
})();