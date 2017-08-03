(function(){
 angular.module("common.services")
 .factory("RegisterUserResource",registerUserResourceFunction );
registerUserResourceFunction.$inject = ["$q","$http"];

function registerUserResourceFunction($q, $http) {
    var numberOfUsers = 0;

    function registerUser(newUser){
        var defferedObj = $q.defer();
        debugger
        $http.post("http://localhost:3000/users",newUser).then(function(result){
            debugger
                defferedObj.resolve(result);
        }, function(response){
            defferedObj.reject();
        });
         return defferedObj.promise;
    };


    function getUsers(){
        var defer = $q.defer();
        $http.get('http://localhost:3000/users')
            .then(function(data) {     
           
            numberOfUsers = data.data.length;
            
                defer.resolve(data);
            },function(data) {
                    defer.reject(data);
            });
        return defer.promise; 

    }
    return{
        registerUser:registerUser,
        getUsers:getUsers

         }

}

})();