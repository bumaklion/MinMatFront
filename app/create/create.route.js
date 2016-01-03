(function () {

    angular.module('myApp.create')
        .config(config);

    config.inject = ['$routeProvider'];
    function config($routeProvider) {
        $routeProvider
            .when('/create', {
                templateUrl: 'create/create.html',
                controller: 'CreateController',
                controllerAs: 'vm'
            });
    };

})();