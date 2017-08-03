(function () {

    'use strict';

    angular.module('initiativeTracker')
        .controller('userInitiativesController', userInitiativesController);

    userInitiativesController.$inject = ['$scope', '$state', 'UserInitiativesResource','$uibModal','$q','$http','authTokenFactory'];

    function userInitiativesController($scope, $state, UserInitiativesResource,$uibModal,$q,$http,authTokenFactory) {

        var userInitiativesCtrl = this;
        userInitiativesCtrl.displayed = [];
       /* userInitiativesCtrl.follow = true;*/
        
        
        userInitiativesCtrl.getInitiatives = function(){
                     UserInitiativesResource.getInititatives().then(function success(result) {
                          var userId = parseInt(authTokenFactory.getUserDetails().id);
                angular.forEach(result.data, function (initiative, key) {
                    if(userId!= parseInt(initiative.createdBy)){
                    userInitiativesCtrl.displayed.push(initiative);
                    }
                    debugger
                });
            });
        };

        userInitiativesCtrl.followInitiative = function (id) {
            UserInitiativesResource.followInitiative(id).then(function (result) {
                userInitiativesCtrl.getInitiatives();
               });

        };
        

    }

}());



/* Logic for follow and unfollow
var arrayOfInitiatives = userInitiativesCtrl.displayed;
                angular.forEach(arrayOfInitiatives, function (initiative, key) {
                         angular.forEach(authTokenFactory.getUserDetails().initiativesFollowed, function (initiativeId, key) {
                             if(initiativeId == initiative.id){
                                initiative.status="Unfollow";
                             }
                    
                });
                });
                userInitiativesCtrl.follow = false;*/