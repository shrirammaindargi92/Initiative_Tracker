(function () {
    angular.module('common.services')
        .factory('UserInitiativesResource', UserInitiativesResource);

    UserInitiativesResource.$inject = ['$q', '$filter', '$timeout','$q','$http','authTokenFactory'];

    function UserInitiativesResource($q, $filter, $timeout,$q, $http,authTokenFactory) {

        var randomsItems = [];
        var numberOfInitiatives = 0;
        
        function getInititatives(){
            var defer = $q.defer();
        $http.get('http://localhost:3000/initiatives')
            .then(function(data) {     
           
            numberOfInitiatives = data.data.length;
            
                defer.resolve(data);
            },function(data) {
                    defer.reject(data);
            });
        return defer.promise;     
        }
        
        

        function followInitiative(id) {
              var defer = $q.defer();
            var userid = parseInt(authTokenFactory.getUserDetails().id);
            debugger
            $http.get('http://localhost:3000/users/'+parseInt(userid))
            .then(function(data) {
                       var ObjeToUpdate = data.data;
                        ObjeToUpdate.initiativesFollowed.push(parseInt(id));
                        parseInt(ObjeToUpdate.noOfUsersFollowing);
                        $http.put('http://localhost:3000/users/'+userid,JSON.stringify(ObjeToUpdate))
                    .then(function(userData) {
                                     $http.get('http://localhost:3000/initiatives/'+parseInt(id))
                            .then(function(initiativeData) {
                                            var ObjeToUpdateInitiative = initiativeData.data;
                                            debugger;
                                            ObjeToUpdateInitiative.noOfUsersFollowing = parseInt(ObjeToUpdateInitiative.noOfUsersFollowing)+1;
                                                     debugger
                                                                                                $http.put('http://localhost:3000/initiatives/'+parseInt(id),ObjeToUpdateInitiative)
            .then(function(initiative_result) {
            defer.resolve(initiative_result);
               debugger 
            },function(data) {
                          defer.resolve(initiative_result);                               
                                                         debugger
            });
                                            defer.resolve(initiativeData);
                            },function(error_second_last) {
                            debugger
                                defer.reject();
                            });
                            defer.resolve(userData);
                    },function(error_third_last) {
                        debugger
                        defer.reject();
                    });
                defer.resolve(data);
            },function(error_fourth_last) {
                debugger
                defer.reject();
            });
        }

        return {
            followInitiative: followInitiative,
            getInititatives: getInititatives
        };
    }

}());
