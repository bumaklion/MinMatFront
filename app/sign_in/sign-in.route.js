(function () {

    angular.module('myApp.signIn')
        .config(config);

    config.inject = ['$routeProvider'];
    function config($routeProvider) {
        $routeProvider
            .when('/sign_in', {
                templateUrl: 'sign_in/sign-in.html',
                controller: 'SignInController',
                controllerAs: 'vm'
            });
    };

})();