angular.module('config', [])

.constant('CONFIG', {url:{base:'/api',login:'/login',users:'/users',adminAction:'/action'}})

.value('debug', true)

;