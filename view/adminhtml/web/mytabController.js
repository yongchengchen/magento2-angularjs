define([], function() {
    'use strict';
    function mytabController($scope, $http, $window, mymodalService) {
        $scope.initProducts = function(data) {
            $scope.products = data;
        };


        $scope.delProduct = function(sku) {
            // for (var i = 0; i < $scope.products.length; i++) {
            //     if ($scope.products[i].simple_product_sku == sku) {
            //         $scope.products[i].is_delete = true;
            //         // $scope.products.splice(i, 1);
            //         return;
            //     }
            // }
        };

        $scope.openModal = function(_tempalteUrl, _dataUrl, _eventItem, _conditions) {
            $scope.modalEventItem = _eventItem;
            mymodalService.showModal(_tempalteUrl, _dataUrl, _eventItem, _conditions, $scope)
                .then(function(result) {
                if (result !== undefined && result.updateItem) {
                    angular.extend($scope.modalEventItem, result.updateItem);
                }
            });
        };
    }

    mytabController.$inject = ['$scope','$http', '$window', 'mymodalService'];
    return mytabController;
});