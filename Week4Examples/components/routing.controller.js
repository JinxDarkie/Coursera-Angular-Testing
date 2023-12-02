(()=>{
    'use strict';
    angular.module('examplesApp')
        .controller('routeSnippetController', [function()
        {
            let $ctrl = this;

            $ctrl.yellInConsole = function(){
                console.log("Scream.");
            }
        }
        ]);
})();