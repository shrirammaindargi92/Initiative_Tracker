(function () {
    angular.module('common.services')
        .factory('UserResource', ['$resource', 'CONFIG', UserResource]);

    function UserResource($resource, CONFIG) {
        debugger
        return {

            'userList': $resource('http://localhost:3000/users', {}, {
                getUsers: {
                    method: 'GET',
                    isArray: true
                }
            }),
            'adminAction': $resource('http://localhost:3000/users', {}, {
                updateAction: {
                    method: 'PUT',
                    isArray: true
                }
            })
        };
    }
}());
