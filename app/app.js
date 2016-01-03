'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute',
    'myApp.signIn',
    'myApp.create',
    'myApp.recipes',
    'myApp.version',
    'ngCookies'
])


    .config(['$routeProvider', function ($routeProvider) {
        //$routeProvider.otherwise({redirectTo: '/view1'});
    }])

    .service('UserSettings', ['$cookies', function ($cookies) {

        var service = this;

        this.getUser = function () {
            return angular.fromJson($cookies.get('currentUser'));
        }

        this.getUuid = function () {
            return service.getUser().uuid;
        };

        this.getUserName = function () {
            return service.getUser().username;
        };

        this.getPassword = function () {
            return service.getUser().password;
        };

        this.setUser = function (user) {
            $cookies.put('currentUser', angular.toJson(user));
        };

    }])


    .controller('AppController', function ($scope, UserSettings, $location) {
        $scope.userName = UserSettings.getUserName()
        $scope.uuid = UserSettings.getUuid()
        $scope.pass = UserSettings.getPassword();

        $scope.goto = function (view) {
            console.log("view: " + view)
            $location.url(view);
        }


    });

