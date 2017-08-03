(function () {

    'use strict';

    angular.module('initiativeTracker')
        .controller('initiativesController', initiativesController);

    initiativesController.$inject = ['$scope', '$state', 'AllInititivesResource','$uibModal','$q','$http','MyInititivesResource'];

    function initiativesController($scope, $state, AllInititivesResource,$uibModal,$q, $http,MyInititivesResource) {

        var initiativesCtrl = this;
        initiativesCtrl.displayed = [];
         initiativesCtrl.getInitiatives = function(){
              AllInititivesResource.getInitiatives().then(function (result) {
                initiativesCtrl.displayed = result.data;
            });
             };

        initiativesCtrl.deleteInitiative = function (id) {
            MyInititivesResource.deleteInitiative(id).then(function (result) {
                debugger
              initiativesCtrl.getInitiatives();
            });

        }
        
        initiativesCtrl.openPopup = function(ImageData){
            var modalInstance = $uibModal.open({
                templateUrl: '/components/users/popup.html',
                controller: 'popUpController as ctrl',
                resolve:{
                img: function(){
                return ImageData;
            }
            }
            });
        };

    }
}());
