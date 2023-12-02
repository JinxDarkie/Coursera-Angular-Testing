(()=>{
    'use strict';

    angular.module('examplesApp').config(exampleConfig)

    /**Basically, to define router states, you do so within the
     * module's config.
     */
    exampleConfig.$inject=['$stateProvider', '$urlRouterProvider'];
    function exampleConfig($stateProvider, $urlRouter){

        //If no URL matches to states, then default to exampleState1.
        $urlRouter.otherwise('/');

        //These are the states that the stateProvider can swap between, with template links.
        $stateProvider
            .state('exampleStateHello', {
                //This is what's displayed on the search bar when this state is active
                url:'/', 
                templateUrl:'snippets/hello.html'
            })
            .state('exampleStateWorld',{
                url:'/exampleWebURL2',
                templateUrl:'snippets/world.html'
            })
            .state('scream',{
                url:'/exampleWebURL3',
                templateUrl: 'snippets/bark.html',
                controller: 'routeSnippetController as control'
            });
    }
})();