/**TODO: Find some way to grab params. */

(()=>{
    'use strict';

    angular.module('menuApp')
        .controller('categoryItems',categoryItems);
    
    categoryItems.$inject=['categoryData'];
    function categoryItems(data){
        let control=this;
        control.menuData = data;
        console.log(control.menuData);
    };
})();