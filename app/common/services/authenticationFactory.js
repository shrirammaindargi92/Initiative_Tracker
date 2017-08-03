(function () {
    var services = angular.module("common.services");
    services.factory("authenticationFactory", ['$injector', 'loginResource', 'libFactory', '$rootScope', 'authTokenFactory','$q','$http',authenticationService]);

    function authenticationService($injector, loginResource, libFactory, $rootScope, authTokenFactory,$q,$http) {

      

        function login(username, password) {
            var defer = $q.defer();
        $http.get('http://localhost:3000/users').then(function(data) {
            var keepGoing = true;
            var updateFlag = false;
             var authenticatedUser = [];
            var keepGoing = true;
            authenticationFlag = false;
            activeFlag = true;
            debugger
            angular.forEach(data.data, function (user, key) {
                if(activeFlag){
                if (keepGoing) {
                        debugger    
                    if (username == user.username && password == user.password) {
                        debugger
                        authTokenFactory.setUserDetails(user);
                        if (user.status == 'Active') {
                            debugger
                             authenticatedUser.push(user);
                            authenticationFlag = true;
                            activeFlag = true;
                            keepGoing = false;
                            debugger
                        } else {
                           
                            activeFlag = false;
                            authenticationFlag = true;
                             debugger
                             defer.reject( activeFlag);
                        }
                    } else {
                        authenticationFlag = false;
                        debugger
                    }

                }
                }
                else{
                    defer.reject( activeFlag);
                }
            });

            if (!authenticationFlag) {
                defer.reject(authenticationFlag);
            }
            else{
                defer.resolve();
                }
            
                
            },
            function(data) {
            debugger
                angular.extend(_this, data);
            
        
                defer.reject();
            });
            

        return defer.promise;
        }

        function logout() {
            try {
                authTokenFactory.reset();

            } catch (error) {}

        }

        function getUserDetails() {
            debugger
            return authTokenFactory.getUserDetails();
        }

        function resetLocalStorage() {
            try {
                authTokenFactory.reset();
            } catch (error) {}

        }
         function getAuthenticationFlag(){
         
         return authenticationFlag;
         }
        function getActiveFlag(){
         
         return activeFlag;
         }

        return {
            login: login,
            logout: logout,
            getUserDetails: getUserDetails,
            resetLocalStorage: resetLocalStorage,
            getAuthenticationFlag:getAuthenticationFlag,
            getActiveFlag:getActiveFlag
             
        };
    }
}());
