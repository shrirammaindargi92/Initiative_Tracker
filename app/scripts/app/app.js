(function () {
    var initiativeTracker = angular.module("initiativeTracker", ['ngAnimate', 'ui.bootstrap', 'ui.router', 'ngResource', 'common.services', 'config', 'ui.mask']);
    initiativeTracker.config(function ($stateProvider, $urlRouterProvider, $httpProvider, $compileProvider, $sceDelegateProvider, $qProvider) {

        $urlRouterProvider.otherwise("/home");
        $stateProvider.state('Home', {
                url: '/home',
                templateUrl: 'views/home.html',

            })
            $stateProvider.state('RegisterUser', {
                url: '/registerUser',
                templateUrl: 'views/registerUser.html',

            })
            $stateProvider.state('ForgotPassword', {
                url: '/forgotPassword',
                templateUrl: 'views/forgotPassword.html',

            })
            $stateProvider.state('ResetPassword', {
                url: '/resetPassword',
                templateUrl: 'views/resetPassword.html',

            })
            $stateProvider.state('ResetPasswordSuccess', {
                url: '/resetPasswordSuccess',
                templateUrl: 'views/resetPasswordSuccess.html',

            })
        $stateProvider.state('Login', {
                url: '/login',
                templateUrl: 'views/login.html',

            })
            .state('App', {
                url: '/app',
                templateUrl: 'views/menu.html',

            })
            .state('App.editProfile', {
                url: '/editProfile',
                templateUrl: 'views/editProfile.html'

            })
            .state('App.UsersInitiative', {
                url: '/userInitiative',
                templateUrl: '/views/User/userInitiatives.html',

            })
            .state('App.MyInitiative', {
                url: '/myInitiative',
                template: '<div ui-view></div>'

            })
            .state('App.MyInitiative.AddNewInitiative', {
                url: '/addNewInitiative',
                templateUrl: '/views/User/addNewInitiative.html'

            })
             .state('App.MyInitiative.AddNewInitiative.Basic', {
                url: '/basic/:title/:desc/:img',
                templateUrl: '/views/User/basic.html',

            })
            .state('App.MyInitiative.AddNewInitiative.Advanced', {
                url: '/advanced/:title/:desc/:img',
                templateUrl: '/views/User/advanced.html',

            })
            .state('App.MyInitiative.AddNewInitiative.Preview', {
                url: '/preview/:title/:desc/:img',
                templateUrl: '/views/User/preview.html',

            })
            .state('App.MyInitiative.Dashboard', {
                url: '/dashboard',
                templateUrl: '/views/User/myInitiatives.html'

            })
            .state('App.AllInitiative', {
                url: '/allInitiative',
                templateUrl: '/views/Administrator/initiatives.html',

            })
            .state('App.Users', {
                url: '/users',
                templateUrl: '/views/Administrator/users.html',

            });

        $qProvider.errorOnUnhandledRejections(false);


    });


    initiativeTracker.run(function ($rootScope) {

        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {

        });
    });

})();
