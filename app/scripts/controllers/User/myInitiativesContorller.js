(function () {

    'use strict';

    angular.module('initiativeTracker')
        .controller('myInitiativesController', myInitiativesController);

    myInitiativesController.$inject = ['$scope', '$state', 'MyInititivesResource','$uibModal','authTokenFactory','$http'];

    function myInitiativesController($scope, $state, MyInititivesResource,$uibModal,authTokenFactory,$http) {

        var myInitiativesCtrl = this;
        myInitiativesCtrl.displayed = [];
        myInitiativesCtrl.noInitiativeMessage = true;
        myInitiativesCtrl.status={
                open:false
        };
        
        myInitiativesCtrl.getInitiatives = function () {
         $http.get('http://localhost:3000/initiatives')
            .then(function(data) {     
             console.log("all initiatives in controller of my initiatives:"+JSON.stringify(data.data));
                 var userId = parseInt(authTokenFactory.getUserDetails().id);
                angular.forEach(data.data, function (initiative, key) {
                    if(userId== parseInt(initiative.createdBy)){
                    myInitiativesCtrl.displayed.push(initiative);
                    }
                    debugger
                });
             if(parseInt(myInitiativesCtrl.displayed.length)==0){
                        myInitiativesCtrl.noInitiativeMessage = false;
                 debugger
                        }
             else{
                 myInitiativesCtrl.noInitiativeMessage = true;
                 debugger
             }
                
            },function(data) {
                    
            });
        }
        
        myInitiativesCtrl.deleteInitiative = function (id) {
            MyInititivesResource.deleteInitiative(id).then(function (result) {
                debugger
              /*myInitiativesCtrl.getInitiatives();*/
            });

        }


        myInitiativesCtrl.openPopup = function(ImageData){
            var modalInstance = $uibModal.open({
                templateUrl: '/components/users/popup.html',
                controller: 'popUpController as ctrl',
                resolve:{
                img: function(){
                return ImageData;
            }
            }
            });
        
        };

    }

}());
