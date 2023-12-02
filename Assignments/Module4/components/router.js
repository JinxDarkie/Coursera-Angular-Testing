(()=>{
    'use strict';
    angular.module('menuApp').config(configureRouter);

    configureRouter.$inject=[
        '$stateProvider',
        '$urlRouterProvider',
    ];
    function configureRouter(
            $stateProvider, 
            $urlRouterProvider
        ){
        console.log("Module fired successfully! Configuring router...");

        //If no URL matches, default to homepage.
        $urlRouterProvider.otherwise('/');

        //States
        $stateProvider
            .state('home',{
                url:'/',
                templateUrl:'pages/home.html'
            })
            .state('categories',{
                url:'/menu/categories',
                templateUrl:'pages/menu.html',
                controller:'menu as control'
            })
            .state('items',{ //God this is a nightmare of indentation.
                url:'/menu&\={categoryShortName}',
                templateUrl:'pages/categoryItems.html',
                controller:'categoryItems as control',
                resolve:{
                    categoryData:[
                        '$stateParams',
                        'menuDataService',
                        ($params, service)=>{
                            return service.fetchCategoryMenu($params.categoryShortName)
                                .then((promise)=>{
                                    return promise.data;
                                });
                        }]
                }
            });
    }
})();