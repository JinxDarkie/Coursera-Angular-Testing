(()=>{
    'use strict';
    angular.module('examplesApp',
        [])
        .config(()=>{
            console.log("Module successfully fired!");
        })
        .run(()=>{
            console.log("Module running!");
        });
    //Root component.
})();