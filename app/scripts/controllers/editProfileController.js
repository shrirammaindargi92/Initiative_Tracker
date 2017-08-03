
 (function() {

    'use strict';

    angular.module('initiativeTracker')
        .controller('EditProfileController', EditProfileController);

    EditProfileController.$inject = ['$scope', '$state','authTokenFactory','EditProfileResource','fileReader'];

    function EditProfileController($scope, $state,authTokenFactory,EditProfileResource,fileReader) {
        var self = this;  
        self.user = {};
        angular.copy(authTokenFactory.getUserDetails(),self.user);
        if(!authTokenFactory.getUserDetails().imageSrc){
        self.user.imageSrc = "../../images/user_1.jpg";
        }
        
        self.update = function(updatedUser){
            var img = document.getElementById('imageid');
            if(img.clientWidth>134 || img.clientHeight>175){
                alert("Oops! Due to storage capacity and good user experience we strongly recommend you to upload the image of leser size: e.g. : 134*175 To see updated changes please logou and login again" );
                 }
                    EditProfileResource.updateUser(updatedUser).then(function success(result) {
                          authTokenFactory.setUserDetails(result.data);
                        alert("Profile updated successfully!");
                         
                    });
        };
         $scope.getFile = function () {
            fileReader.readAsDataUrl($scope.file, $scope)
                .then(function (result) {
                    self.user.imageSrc = result;
                    debugger
                });
        };
        
    }
}());
