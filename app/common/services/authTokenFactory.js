(function() {
    var services = angular.module("common.services");
    services.factory("authTokenFactory", ['$localStorage', 'libFactory', '$rootScope', authTokenFac]);

    function authTokenFac($localStorage, libFactory, $rootScope) {


        function getUserDetails() {
            debugger
            return $localStorage.user;

        }

        function setUserDetails(user) {
            if (!libFactory._.isEmpty(user)) {
                debugger;
                $localStorage.user = user;
            } else {
                delete $localStorage.user;
            }
        }

        function reset() {
            $localStorage.$reset();
        }

        return {
            setUserDetails: setUserDetails,
            getUserDetails: getUserDetails,
            reset: reset
        };
    }
}());
