(function () {

    'use strict';

    angular.module('initiativeTracker')
        .controller('BasicController', BasicControllerFunction);

    BasicControllerFunction.$inject = ['$scope', '$state', 'MyInititivesResource', '$stateParams','$uibModal'];

    function BasicControllerFunction($scope, $state, MyInititivesResource, $stateParams,$uibModal) {
        var self = this;
        self.basicInfo = {};
        if (MyInititivesResource.backUnabled) {
            self.basicInfo.title = $stateParams.title;
            self.basicInfo.desc = $stateParams.desc;
            if ($stateParams.img) {
                self.basicInfo.img = $stateParams.img;
                debugger
            }
        }

        self.gotoNextTab = function () {
            $state.go("App.MyInitiative.AddNewInitiative.Advanced", {
                'title': self.basicInfo.title,
                'desc': self.basicInfo.desc,
                'img': self.basicInfo.img
            });
        }
    
    }
}());
