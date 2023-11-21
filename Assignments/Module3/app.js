/**
 * Note to self in future: Figure out why I would ever use factories over services...
 * Or how to use factories in general really. I really don't get them.
 * 
 * Also figure out how to make HTTP requests to google servers to fetch data from
 * a spreadsheet (Though there's good chance I can't do that I think? I need to
 * dig into jQuery and mikeymckay's google-spreadsheet-javascript github project
 * https://github.com/mikeymckay/google-spreadsheet-javascript).
 */

(function (){
    'use strict';
    angular.module('narrowerApp',[])
        .service('searchService', searchService)
        .controller('narrowerController', narrowerController);
    

    function searchService(){

    };

    narrowerController.$inject=['searchService'];
    function narrowerController(service){

    };
})();