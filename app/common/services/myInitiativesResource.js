(function () {
    angular.module('common.services')
        .factory('MyInititivesResource', MyInititivesResource);

    MyInititivesResource.$inject = ['$q', '$filter', '$timeout','$http'];

    function MyInititivesResource($q, $filter, $timeout,$http) {

        var randomsItems = [];
        var backUnabled = false;
        
        function getInitiatives(){
                 var defer = $q.defer();
        $http.get('http://localhost:3000/initiatives')
            .then(function(data) {
                defer.resolve(data);
            },function(data) {
                    defer.reject(data);
            });
        return defer.promise;
        }
        
        
        function addNewInitiative(newInitiative) {
             var defer = $q.defer();
        $http.post('http://localhost:3000/initiatives',newInitiative)
            .then(function(data) {     
            //console.log("Initiative added successfully in service");
                defer.resolve();
            },function(data) {
                    defer.reject();
            });
        return defer.promise;   
        }
        
        

        function deleteInitiative(id) {
            var deferred = $q.defer();
             $http.delete('http://localhost:3000/initiatives/'+id)
            .then(function(data) {     
           // console.log("Initiative delete successfully in service");
                defer.resolve();
            },function(data) {
                    defer.reject();
            });

            return deferred.promise;
        }

        return {
            addNewInitiative: addNewInitiative,
            deleteInitiative: deleteInitiative,
            getInitiatives: getInitiatives
        };
    }

}());
