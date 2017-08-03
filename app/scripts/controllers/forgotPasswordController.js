(function(){
    "use strict";
    angular.module("initiativeTracker").
    controller("ForgotPasswordController", ForgotPasswordControllerFunction);
ForgotPasswordControllerFunction.$inject = ["$scope","$http","$state",'RegisterUserResource','EditProfileResource','authTokenFactory'];
function ForgotPasswordControllerFunction($scope, $http,$state,RegisterUserResource,EditProfileResource,authTokenFactory){
        var self = this;
       
        self.recover = function(){
            self.autherizationFailed = false;
            var autherizationFlag = false;
           
        RegisterUserResource.getUsers().then(function success(result) {
                       angular.forEach(result.data, function(user, id){
                           debugger
                            if(user.username == self.recoveryUsername && user.contactNo == self.reoveryContact){
                               
                                     authTokenFactory.setUserDetails(user);
                                debugger
                                $state.go("ResetPassword");
                                autherizationFlag = true;
                            }
                            else{
                                autherizationFlag = false;
                            }
                       });
                        if(autherizationFlag){
                            self.autherizationFailed = false;
                        }
                        else{
                            self.autherizationFailed = true;
                        }
                    });
            }
            self.recoverAndLogin = function(){
                    RegisterUserResource.getUsers().then(function success(result) {
                        var userC = authTokenFactory.getUserDetails();
                        var username = userC.username;
                        var contactNo = userC.contactNo;
                       angular.forEach(result.data, function(user, id){
                           debugger
                            if(user.username == username && user.contactNo == contactNo){
                                user.password = self.recoveryPassword;
                                debugger
                                EditProfileResource.updateUser(user).then(function success(result) {
                                     $state.go("ResetPasswordSuccess");
                    });
                            }
                       });
                    });
                    
            }
}
})();