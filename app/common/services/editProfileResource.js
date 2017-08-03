(function () {
    angular.module('common.services')
        .factory('EditProfileResource', EditProfileResource);

    EditProfileResource.$inject = ['$q','$http'];

    function EditProfileResource($q, $http) {

        
        function updateUser(updatedUser){
                var defer = $q.defer();
                $http.put('http://localhost:3000/users/'+updatedUser.id, updatedUser)
                    .then(function(data) {     
                        defer.resolve(data);
                    },function(data) {
                            defer.reject(data);
                    });
                return defer.promise; 
        }
        
        
        return {
            updateUser:updateUser
        };
    }

}());
