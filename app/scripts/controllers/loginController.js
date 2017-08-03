(function () {

    'use strict';

    angular.module('initiativeTracker')
        .controller('LoginController', LoginControllerFunction);

    LoginControllerFunction.$inject = ['$scope', '$state', 'authenticationFactory', 'libFactory', 'authTokenFactory','$q','$http'];

    function LoginControllerFunction($scope, $state, authenticationFactory, libFactory, authTokenFactory,$q,$http) {
        debugger
        var self = this;
        self.login = login;
        self.isSigningIn = true;
        self.loginFailed = false;
        self.blockedUser = false;
        function login() {
            debugger
            authenticationFactory.login(self.credentials.username, self.credentials.password).then(function success(response) {
                self.isSigningIn = false;
                self.user = authTokenFactory.getUserDetails();
                debugger
                if (self.user.role == 'user') {
                    debugger
                    $state.go("App.UsersInitiative");
                } else if (self.user.role == 'administrator') {
                    debugger
                    $state.go("App.AllInitiative");
                }


            }, function error(response) {
                
                self.isSigningIn = false;
                self.loginFailed = true;
                if (!authenticationFactory.getAuthenticationFlag()) {
                    self.loginFailed = true;
                    self.blockedUser = false;
                    debugger;
                }else if (!authenticationFactory.getActiveFlag()) {
                    self.blockedUser = true;
                    self.loginFailed = false;
                    debugger;
                } 
            });
        }
    }
}());
