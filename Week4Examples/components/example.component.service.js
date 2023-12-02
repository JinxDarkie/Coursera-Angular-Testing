(()=>{
    'use strict';
    angular.module('examplesApp')
        .service('exampleService', exampleService);
    
    function exampleService(){
        this.exampleVariable='Yeehaw';
    };
})();