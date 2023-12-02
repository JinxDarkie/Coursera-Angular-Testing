(()=>{
    'use strict';

    angular.module('menuData')
        .service('menuDataService',menuDataService);

    menuDataService.$inject=['$http'];
    function menuDataService($http){
        let service=this;

        /**Fetch categories from server and return result (Either error or array
         * of objects containing each category's name). */
        service.fetchCategories=()=>{
            let promise = 
            $http({
                method:'GET',
                url:'https://coursera-jhu-default-rtdb.firebaseio.com/categories.json'
            });

            return promise;
        };

        /**Fetch specific category's menu and return result*/
        service.fetchCategoryMenu=(shortName)=>{
            console.log("Fetching " + shortName + " menu!");

            return $http({
                method:'GET',
                url: 
                    'https://coursera-jhu-default-rtdb.firebaseio.com/menu_items/'
                    +shortName+'.json'
            });
        };
    }

})();