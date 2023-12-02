(()=>{
    'use strict';

    //Root component.
    angular.module('examplesApp', ['ui.router']);

    angular.module('examplesApp')
    .run(()=>{
        console.log("Module running!");
    });
})();