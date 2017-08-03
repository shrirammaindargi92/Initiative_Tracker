(function () {

    'use strict';

    angular.module('initiativeTracker')
        .controller('usersController', usersController);

    usersController.$inject = ['$scope', '$state', 'UserResource','$q','$http'];

    function usersController($scope, $state, UserResource,$q,$http) {

        var usersCtrl = this;
      
        usersCtrl.getUsers=function(){
            usersCtrl.isLoading = true;
            usersCtrl.noRecords = false;
            
            UserResource.userList.getUsers({
            }, function success(response, headers) {
                usersCtrl.displayed = [];
                debugger
                angular.forEach(response,function(user,key){
                    if(user.role == "user"){
                        debugger
                        usersCtrl.displayed.push(user);
                    }
                });

            }, function error(response) {

            })
            
            
        }
        

        usersCtrl.adminAction = function (id) {
            //To update we will get that specific object nd we will update it and then we will push that specific object to the file.
            /* var ObjeToUpdate  = {};*/
            var defer = $q.defer();
            $http.get('http://localhost:3000/users/'+parseInt(id))
            .then(function(data) {
               var ObjeToUpdate = data.data;
                debugger;
            console.log("object to update:"+JSON.stringify(ObjeToUpdate));
                if(ObjeToUpdate.status == "Active"){
                 ObjeToUpdate.status = "Inactive"; 
                  ObjeToUpdate.action= "Unblock";
                    }
                else if(ObjeToUpdate.status == "Inactive"){
                    ObjeToUpdate.status = "Active"; 
                  ObjeToUpdate.action= "Block";
                }
                 console.log("object after update:"+JSON.stringify(ObjeToUpdate));
                $http.put('http://localhost:3000/users/'+id,JSON.stringify(ObjeToUpdate))
            .then(function(data) {
            console.log("data from Json file updated success:"+JSON.stringify(data));
                usersCtrl.getUsers();
                defer.resolve();
            },function(data) {
            debugger
                defer.reject();
            });
                defer.resolve();
            },function(data) {
            debugger
                defer.reject();
            });
             //To update that object in our file
        return defer.promise;

        }
    }

}());
