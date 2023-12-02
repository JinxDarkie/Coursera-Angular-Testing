(()=>{
    'use strict';
    angular.module('examplesApp')
        .controller('exampleController', exampleController);
    
    exampleController.$inject=['exampleService'];
    function exampleController (service){
        let $ctrl = this;
        $ctrl.exampleVar = '';

        $ctrl.exampleMethod = function(){
            console.log($ctrl);
            console.log(service.exampleVariable);
        };
    };
})();