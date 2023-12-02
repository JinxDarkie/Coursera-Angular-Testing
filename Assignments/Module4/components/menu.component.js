        /**
         * Turns out it really is simple this time around. No need to wrestle
         * with view updates it's just the routing that's the complicated part...
         */

(()=>{
    'use strict';
    angular.module('menuApp')
        .controller('menu',menuController);
    
    menuController.$inject=['menuDataService'];
    function menuController(service){
        let $ctrl=this;

        $ctrl.categories=service.fetchCategories()
            .then((response)=>{
                console.log("displaying categories...");
                console.log(response.data);

                $ctrl.categories=response.data;
            })
            .catch((errResponse)=>{
                console.log(errResponse);
            });
    }
})();