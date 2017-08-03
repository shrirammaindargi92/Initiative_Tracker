(function(){
    "use strict";
    angular.module("initiativeTracker").
    controller("HomeController", homeControllerFunction);
homeControllerFunction.$inject = ["$scope","$http","$state","MyInititivesResource","$anchorScroll","$location"];
function homeControllerFunction($scope, $http,$state,MyInititivesResource,$anchorScroll,$location){

        var self = this;
        self.login = function(){
            $state.go("Login");
        }
        self.signup = function(){
            $state.go("RegisterUser");
        }
        self.scrollTo = function(id) {
      $location.hash(id);
      $anchorScroll();
   }

       self.myInterval = 3000;
  self.slides = [
    {
      image: 'http://lorempixel.com/400/200/'
    },
    {
      image: 'http://lorempixel.com/400/200/food'
    },
    {
      image: 'http://lorempixel.com/400/200/sports'
    },
    {
      image: 'http://lorempixel.com/400/200/people'
    }
  ];
  self.initiatives=[];
  MyInititivesResource.getInitiatives().then(function(result){
        for(var i=0; i<3; i++){
            self.initiatives.push(result.data[i]);
        }

  },function(){});
}
})();