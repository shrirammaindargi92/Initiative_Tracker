
 (function() {

    'use strict';

    angular.module('initiativeTracker')
        .controller('RegisterUserController', RegisterUserController);

    RegisterUserController.$inject = ['$state','authTokenFactory','RegisterUserResource','fileReader','$scope'];

    function RegisterUserController($state,authTokenFactory,RegisterUserResource,fileReader,$scope) {
        var self = this;  
        self.user = {};
        self.registerUser = function(){
                 RegisterUserResource.getUsers().then(function success(result) {
                        self.user.role = "user";
                        self.user.status = "Active";
                        self.user.action = "Block";
                        self.user.initiativesFollowed = [];
                        self.user.id = parseInt(result.data.length)+1;
                        console.log("New User to be created"+JSON.stringify(self.user));
                RegisterUserResource.registerUser(self.user).then(function success(result) {
                        alert("Profile Created successfully! Please Login to explore world of initiatives");
                        $state.go("Login");
                         
                    });
                    });
                
        };
         $scope.getFile = function () {
            fileReader.readAsDataUrl($scope.file, $scope)
                .then(function (result) {
                    self.user.imageSrc = result;
                    debugger
                });
        };
        
    }
}());
