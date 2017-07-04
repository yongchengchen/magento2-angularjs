var config = {
    map: {
        '*': {
            angular: 'Yong_Angularjs/bower/angular/angular.min',
            angularBootstrap: 'Yong_Angularjs/bower/angular-bootstrap/ui-bootstrap-tpls.min',
            ngstorage: 'Yong_Angularjs/bower/ngstorage/ngStorage.min',
            mymodalService: 'Yong_Angularjs/js/mymodalService',
            modalScript: 'Yong_Angularjs/js/modalScript',
            syncKo: 'Yong_Angularjs/js/syncKo',
            mytabController: 'Yong_Angularjs/mytabController'
        }
    },
    "shim": {
        "Yong_Angularjs/bower/angular/angular.min": {
                "exports": "angular"
            },
        "Yong_Angularjs/bower/angular-bootstrap/ui-bootstrap-tpls.min": {
                "exports": "angularBootstrap"
            },
        "Yong_Angularjs/bower/ngstorage/ngStorage.min": {
                "exports": "ngStorage"
            },
        "Yong_Angularjs/js/mymodalService": {
                "exports": "mymodalService"
            },
        "Yong_Angularjs/js/modalScript": {
                "exports": "modalScript"
            },
        "Yong_Angularjs/js/syncKo": {
                "exports": "syncKo"
            },
        "Yong_Angularjs/mytabController": {
                "exports": "mytabController"
            }
        }
};
