define([], function(app){
    'use strict';

    function mymodalService($uibModal) {
        var modalDefaults = {
            backdrop: true, // or = true
            keyboard: true,
            modalFade: true,
        };
        
        var modalCaches = {};
        var service = {};

        service.showModal = function(_templateUrl, _dataUrl, _eventItem, conditions, rootScope) {
            if (_dataUrl) {
                if (typeof _dataUrl === 'object') {
                    _dataUrl = String.format(_dataUrl.url, _dataUrl.params);
                }
            }
            var modalConfig = {templateUrl:_templateUrl};
            angular.extend(modalConfig, modalDefaults);

            if (!modalConfig.controller) {
                modalConfig.controller = function($scope, $uibModalInstance, $http, $q) {
                    $scope.modal = {
                        eventItem: _eventItem,
                        condition: conditions,
                        dataUrl:_dataUrl,
                        RDS: 0, //remote dataset
                        callback: {}
                    };
                    $scope.parent = rootScope;

                    $scope.modal.ok = function(result) {
                        var callback = $scope.modal.callback;
                        if (callback) {
                            $scope.modal.Message = 'Sending your request, please wait.';
                            $http.post(callback.url, callback.params).then(function successCallback(res) {
                                if (res.data.success) {
                                    result = res.data;
                                    $uibModalInstance.close(result);
                                } else {
                                    $scope.modal.Message = res.data.reason;
                                }
                            }, function errorCallback(res) {
                                alert('Oops! Your request get error! status=' + res.status);
                            });
                        } else {
                            $uibModalInstance.close(result);
                        }
                    };

                    $scope.modal.confirm = function(result) {
                        $uibModalInstance.dismiss('cancel');
                    };

                    $scope.modal.close = function(result) {
                        $uibModalInstance.dismiss('cancel');
                    };

                    //convert json data as post form data
                    $scope.JSON2PostForm = function(parent_node_str, obj) {
                        var str = [];
                        for(var p in obj) {
                            var key = p;
                            if (parent_node_str !== '') {
                                key = parent_node_str + '[' + p +']';
                            }
                            if (Object.prototype.toString.call(obj[p]) === '[object Object]') {
                                str.push($scope.JSON2PostForm(key, obj[p]));
                            } else {
                                str.push(encodeURIComponent(key) + "=" + encodeURIComponent(obj[p]));
                            }
                        }
                        return str.join("&");
                    };

                    //please call initData from modal template,and also set datasource url from modal template
                    $scope.modal.initData = function(dataUrl, method, params, modal) {
                        if (modal === undefined) {
                            modal=$scope.modal;
                        }
                        if (dataUrl) {
                            var needCacheData = false;
                            if (dataUrl.indexOf('withCache=withCache') !== -1) {
                                needCacheData = true;
                            }
                            if (needCacheData) {
                                if (dataUrl in modalCaches) {
                                    modal.RDS = modalCaches[dataUrl];
                                    if (modal.RDS.callback) {
                                        modal.callback = modal.RDS.callback;
                                    }
                                    return;
                                }
                            }

                            if (method === 'post' || method === 'POST') {
                                $http({
                                    method: 'POST',
                                    url: dataUrl,
                                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                                    transformRequest: function(obj) {
                                        return $scope.JSON2PostForm('', obj);
                                    },
                                    data: params
                                }).success(function (res) {
                                    modal.RDS = res;
                        console.log(modal.RDS);
                                    
                                });
                            } else {
                                $http.get(dataUrl, params).then(function(res) {
                                    if (needCacheData) {
                                        modalCaches[dataUrl] = res.data;
                                    }
                                    modal.RDS = res.data;
                        console.log(modal.RDS);

                                    if (modal.RDS.callback) {
                                        modal.callback = modal.RDS.callback;
                                    }
                                });
                            }
                        }
                    
                    };


                };
            }
            return $uibModal.open(modalConfig).result;
        };

        return service;
    }

    mymodalService.$inject=['$uibModal'];

    return mymodalService;
});