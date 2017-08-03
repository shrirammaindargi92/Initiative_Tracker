(function () {

    'use strict';

    angular.module('initiativeTracker')
        .controller('MainController', MainControllerFunction);

    MainControllerFunction.$inject = ['$scope', '$state', 'authTokenFactory', 'authenticationFactory'];

    function MainControllerFunction($scope, $state, authTokenFactory, authenticationFactory) {
        var self = this;
        self.user = authTokenFactory.getUserDetails();
        /*if(!authTokenFactory.getUserDetails().imageSrc){
            self.user.imageSrc = "../../images/user_1.jpg";
        }*/
        debugger
        self.logout = function () {
            authenticationFactory.logout();
            $state.go("Login");
        }
        self.editProfile = function(){
        $state.go("App.editProfile");
        
        }
    }
}());
