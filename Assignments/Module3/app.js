/**
 * Note to self in future: Figure out why I would ever use factories over services...
 * Or how to use factories in general really. I really don't get them.
 * 
 * Also figure out how to make HTTP requests to google servers to fetch data from
 * a spreadsheet (Though there's good chance I can't do that I think? I need to
 * dig into jQuery and mikeymckay's google-spreadsheet-javascript github project
 * https://github.com/mikeymckay/google-spreadsheet-javascript).
 * 
 * BUGS:
 *  Nothing Found element does not disappear when list fills.[FIXED]
 *      ng-if should ALWAYS be hooked onto a $scope boolean that gets updated
 *      when appropriate. Otherwise Angular's digest cycle is going to miss it,
 *      thus causing the view-related bugs (That plus the check would only be
 *      performed by the element once-- when it's rendered).
 *  Nothing found element does not appear when list empties [FIXED]
 *      ng-if doesn't accept truthy statements(0,1, null, etc etc) only
 *      bool.
 *  Filter loop does not properly search fetchedMenu. [FIXED]
 *      Bug tracked down, objects are NOT iterable by default. You must iterate
 *      over its properties instead via FOR... IN, not for... each or for... of.
 *  Both .then and .catch in promiseMenu service function are somehow firing at 
 *  the same time??? [FIXED]
 *      Turns out it's intentional. Catch will also catch any errors thrown within
 *      .then() and I incorrectly assumed there could only be $http errors (Which
 *      led to me not seeing the errors telling me objects aren't iterable since
 *      I was console.logging errorResponse.status and not just errorResponse).
 * 
 * TODO:
 *  Implement basic HTTP fetch functionality on button. [DONE]
 *  Implement basic list display functionality [DONE]
 *      Remember, each item should display its shortname, its name, and its
 *      description. They should also have a button to throw out the item from
 *      the list.
 *  Implement filter functionality [DONE]
 *      Comb through each item's description string for a match with the search
 *      box's input and display only that (Put it in a separate found array for
 *      display).
 *      Nothing should display if either the found array is empty or the search
 *      box input is empty.
 *  Implement list removal functionality [DONE]
 *      When the throw out menu item button is pressed, that specific menu item
 *      should be removed from the list and disappear from display.
 *  Make the list look good!
 * 
 * NOTE:
 *  HTTP caching is unecessary (You can make an HTTP request every time the
 *      button is pressed. Not good practice but it's faster to implement
 *      which is more important).
 */

(function (){
    'use strict';
    angular.module('narrowerApp',[])
        .service('searchService', searchService)
        .controller('narrowerController', narrowerController)
        .directive('foundItems',foundItems)
        .constant('baseURLPath',"https://coursera-jhu-default-rtdb.firebaseio.com");
    
    function foundItems(){
        return {
            restrict: 'E',
            scope:{
                found:'=',
                onRemove: '='
            },
            templateUrl:'loader/listMenuSnippet.html' 
            //Note to self, templateUrl, NOT templateURL. Case sensitive.
        }
    };

    searchService.$inject=['$http','baseURLPath'];
    function searchService($http,baseURL){
        var service=this;
        service.fetchedMenu={};
        service.foundMenu={};

        /**Fetch menu from server, then filter menu for display if successful. */
        service.promiseMenu=function(search){
            console.log("Searching menu server...");

            let result=
            $http({
                method:'GET',
                url:(baseURL+"/menu_items.json")
            })
            .then((response)=>{
                console.log('Menu fetched!');
                service.fetchedMenu=response.data;
                console.log(service.fetchedMenu);
                service.filterMenu(search);
            })
            .catch((errReponse)=>{
                console.log('ERR SERVER: ' + errReponse);
            });

            return result;
        };

        service.filterMenu=function(search){
            console.log('Filtering menu');
            //service.foundMenu=service.fetchedMenu;
            
            console.log(service.fetchedMenu);
            service.foundMenu=[];

            //Check to ensure empty strings instantly cancel as intended.
            if(search.trim()==""){return;}

            for (let categoryKey in service.fetchedMenu) {
                let category=service.fetchedMenu[categoryKey];
                console.log(categoryKey);

                //If category contains match item, push to found and replace
                // its menu items array with cachedMatched.
                let itemMatch=false;
                let cachedMatched=[];

                category.menu_items.forEach(item => {
                    if(item.description.toLowerCase().includes(search.toLowerCase())){
                        itemMatch=true;
                        cachedMatched.push(item);
                    }
                });

                if(itemMatch){
                    category.menu_items=cachedMatched;
                    service.foundMenu.push(category);
                }
            }
        };

        service.throwItem=function(shortName){
            /*FOREACH CATEGORY, FOREACH ITEM, if shortName==item.shortname, 
             *splice item.
            */
            console.log("Searching for " + shortName);
            
            for (let categoryKey in service.foundMenu) {
                let category=service.foundMenu[categoryKey].menu_items;
                console.log("CATEGORY:" + categoryKey);

                for(let itemKey in category){
                    console.log("   ITEM:" + itemKey);
                    if (category[itemKey].short_name==shortName){
                        console.log("Splicing " + itemKey);
                        category.splice(itemKey, 1);
                    }
                }
                
                //If category empty, splice category.
                if(!category.length){service.foundMenu.splice(categoryKey,1);}
             }
        }
    };

    narrowerController.$inject=['searchService','$scope'];
    function narrowerController(service,$sc){
        var control=this;
        $sc.foundList={};
        $sc.listEmpty=!$sc.foundList.length;
        $sc.initialized=false;
        control.searchInput='';

        control.removeItem=function(item){
            console.log("Remove button pressed! " + item);
            service.throwItem(item);
            $sc.foundList=service.foundMenu;
            $sc.listEmpty=$sc.foundList.length == 0;
        };

        control.searchServer=function(){
            console.log("Search button pressed!");
            $sc.foundList={}; //Empty foundList every time

            service.promiseMenu(control.searchInput)
                .then((response)=>{
                    console.log("Displaying menu... " + control.searchInput);

                    $sc.foundList=service.foundMenu;
                    $sc.listEmpty=$sc.foundList.length == 0;
                    $sc.initialized=true;
                    
                    console.log($sc.foundList);
                    console.log($sc.foundList.length);
                })
                .catch((errResponse)=>{
                });
        };
    };
})();