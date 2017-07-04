define([], function(app){
    'use strict';

    function modalScript() {
        return function(scope, element, attrs) {
            var modal = scope.modal;
            eval(attrs.modalScript);
        };
    }
    return modalScript;
});