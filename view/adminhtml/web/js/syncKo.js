define(['jquery'], function($){
    'use strict';
    function syncKo() {
        return function($scope, element, attrs) {
            $scope.$watch(attrs.from, function(newValue, oldValue) {
                if (newValue !== undefined) {
                    $('input[name='+ attrs.to +']').val(JSON.stringify(newValue)).trigger('change');
                }
            }, true);
        };
    }
    return syncKo;
});