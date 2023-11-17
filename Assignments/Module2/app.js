/**TODO::
 *  Implement purchase all/cancel functionality
 *      When purchased out, the item is added to the buying list and removed 
 *          from stock.
 *      If there is nothing left in stock, the list should display 
 *          "Out of stock!"
 *  Implement partial-purchase/cancel functionality.
 */

/*
POTENTIAL SOLUTION? Parent storage controller whose $scope is inherited by 
the others?
REAL SLUTION: Use a custom service. Controllers aren't supposed to store
things or share data between controllers. Instead they're the middleman
between HTML elements and the service.

SERVICE - Stores and handles data shared across all components
CONTROLLER - Interfaces with services for HTML to hook onto
*/

(function (){ 
    'use strict'; 
    angular.module('shoppingListCheckoff', [])
        .service('ShoppingService', shoppingService)
        .controller('ToBuyController', toBuyController)
        .controller('AlreadyBoughtController', alreadyBoughtController);

        
    function shoppingService() {
        var service = this;
        service.shoppingList=[
            {item: "Cookies", stock: 332, 
                pricePer:{batch:5, cost:8.99}},
            {item: "Bread loaves", stock: 121, 
                pricePer:{batch:2, cost:12.99}},
            {item: "Burger patty pack", stock: 99, 
                pricePer:{batch:1, cost:14.99}},
            {item: "Knives", stock: 30, 
                pricePer:{batch:1, cost:19.99}},
            {item: "Cars", stock: 2, 
                pricePer:{batch:1, cost:15000.00}},
            {item: "Tin soldier box sets", stock: 44, 
                pricePer:{batch:1, cost:34.99}}
        ];
        service.purchaseList=[];
        service.shopEmpty = service.shoppingList == [];
        service.puchaseEmpty = service.purchaseList == [];
        
        service.fetchStock = function (){
            return service.shoppingList
        };
        service.fetchBought = function(){
            return service.purchaseList
        };

        service.buy = function(itemName, amount){
            /**
             * CHANGE OF PLANS:
             * When buy is pressed, just move item from shoppingList to
             * purchaseList. I can't figure out why things aren't working again...
             * 
             * Bug for future me to look at-- when purchaseList item's stock
             * is set to amount, stock becomes 0 for some reason.
             * 
             * Partial purchases also don't initiate a re-render by angularJS.
             * Probably needs me to wrap something in 
             * $scope.$apply(function(){    });
             */
            
            let shopIndex = service.shoppingList.findIndex(obj => 
                obj.item == itemName);
            
            console.log(shopIndex);
            
            service.purchaseList.push(service.shoppingList[shopIndex]);
            service.shoppingList.splice(shopIndex, 1);

            
            service.shopEmpty = service.shoppingList == [];
            service.puchaseEmpty = service.purchaseList == [];

            /**Find item index in shoppingList
             * Check if item already in purchaseList
             *  Add amount to purchaselist
             * Subtract item from shopping list
             *  If item stock < 1, splice from shopping list.
             */
            /*
            console.log("shop: " + shopIndex + "; bought: " + purchaseIndex
                + " amount to buy: " + amount);

            //NOTE: Add check to ensure that if amount > shopList stock, 
            // then amount added to purchaseList stock is amount-shoplist stock.
            //if (amount > service.shoppingList[shopIndex].stock){
            //    amount -= service.shoppingList[shopIndex].stock;
            //}

            if (purchaseIndex != -1){
                service.purchaseList[purchaseIndex].stock += amount;
            } else {
                service.purchaseList.push(service.shoppingList[shopIndex]);
                
                purchaseIndex = service.purchaseList.findIndex(obj =>
                    obj.item == itemName);
                
                //BUG, stock always = 0 here???
                service.purchaseList[purchaseIndex].stock = amount;
                console.log("amount during bug: " + amount 
                    + " index during bug: " + purchaseIndex);
            }
            console.log(service.purchaseList);

            service.shoppingList[shopIndex].stock -= amount;
            if(service.shoppingList[shopIndex].stock < 1){
                service.shoppingList.splice(shopIndex, 1);
            }
            console.log(service.shoppingList);

            */
        };
        
        service.cancel = function(itemName, amount){
            /**When cancel is pressed, just move item from purchaseList to
             * shoppingList.
             */
            
            let purchaseIndex = service.purchaseList.findIndex(obj =>
                obj.item == itemName);
            
            service.shoppingList.push(service.purchaseList[purchaseIndex]);
            service.purchaseList.splice(purchaseIndex, 1);
            
            service.shopEmpty = service.shoppingList == [];
            service.puchaseEmpty = service.purchaseList == [];
        };
    };

    toBuyController.$inject = ['ShoppingService']
    function toBuyController(shop) {
        var buyControl = this;

        buyControl.shoppingList = shop.fetchStock();
        buyControl.isEmpty = shop.shopEmpty;

        buyControl.purchase = function (itemName, amount){
            shop.buy(itemName, amount);
        };
    };


    alreadyBoughtController.$inject=['ShoppingService']
    function alreadyBoughtController(shop) {
        var boughtControl = this;

        boughtControl.boughtList = shop.fetchBought();
        boughtControl.isEmpty = shop.puchaseEmpty;


        boughtControl.cancel = function (itemName, amount){
            shop.cancel(itemName, amount);
        }
    };

})();