(function () {
    angular.module('common.services')
        .factory('AllInititivesResource', AllInititivesResource);

    AllInititivesResource.$inject = ['$q', '$filter', '$timeout','$q','$http'];

    function AllInititivesResource($q, $filter, $timeout, $q, $http) {

        
        function getInitiatives(){
        var defer = $q.defer();
        $http.get('http://localhost:3000/initiatives')
            .then(function(data) {     
                defer.resolve(data);
            },function(data) {
                    defer.reject(data);
            });
        return defer.promise; }
        
        
        
        function deleteInitiative(id) {
            var deferred = $q.defer();
             for (var i = 0; i < randomsItems.length; i++) {
                 if (randomsItems[i].id == id) {
                    randomsItems.splice(i, 1);
                    debugger
                    //  item.isDeleted = "Deleted";
                    deferred.resolve(randomsItems[i]);
                }
            }

            return deferred.promise;
        }
        
        return {
            getInitiatives:getInitiatives,
            deleteInitiative: deleteInitiative
        };
    }

}());
