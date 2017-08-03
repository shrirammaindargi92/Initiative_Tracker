(function() {
    var services = angular.module("common.services");
    services.factory("libFactory", ['$window', 'notify', function($window, notify) {

        function notification(message, type) {
            var cssClass = "";
            if (type == "success") {
                cssClass = "alert-success";
            } else if (type == "fail") {
                cssClass = "alert-danger";
            }
            notify({
                message: message,
                classes: cssClass,
                duration: 2000
            });
        }
        return {
            '_': $window._,
            notification: notification,
            //base64: $base64,
            //md5: md5
        };
    }]);
}());
