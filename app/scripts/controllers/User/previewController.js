(function () {

    'use strict';

    angular.module('initiativeTracker')
        .controller('PreviewController', PreviewControllerFunction);

    PreviewControllerFunction.$inject = ['$scope', '$state', '$stateParams', 'MyInititivesResource', 'UserResource','authTokenFactory','UserInitiativesResource'];

    function PreviewControllerFunction($scope, $state, $stateParams, MyInititivesResource, UserResource,authTokenFactory,UserInitiativesResource) {
        var self = this;
        self.newInitiative = {};
        self.newInitiative.title = $stateParams.title;
        self.newInitiative.desc = $stateParams.desc;
        self.newInitiative.img = $stateParams.img;
        self.newInitiative.isDeleted = "Delete";
        self.newInitiative.createdBy = parseInt(authTokenFactory.getUserDetails().id);
        self.newInitiative.id = parseInt(UserInitiativesResource.numberOfInitiatives);
        self.newInitiative.status = "follow",
        self.newInitiative.noOfUsersFollowing = 0;
        debugger
        self.cancel = function () {
            UserResource.backUnabled = false;
            $state.go("App.MyInitiative.Dashboard");
        };
        self.share = function () {
            UserResource.backUnabled = false;
            debugger
            MyInititivesResource.addNewInitiative(self.newInitiative).then(function (result) {
                $state.go("App.MyInitiative.Dashboard");
            });

        };
        self.gotoPreviousTab = function () {
            UserResource.backUnabled = true;
            $state.go("App.MyInitiative.AddNewInitiative.Advanced", {
                'title': $stateParams.title,
                'desc': $stateParams.desc,
                'img': $stateParams.img
            });
        }
    }
}());
