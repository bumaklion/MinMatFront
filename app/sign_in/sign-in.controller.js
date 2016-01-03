(function () {

    angular.module('myApp.signIn')
        .controller('SignInController', SignInController);

    SignInController.inject = ['$scope', '$http', 'UserSettings', '$location', '$timeout'];
    function SignInController($scope, $http, UserSettings, $location, $timeout) {
        var vm = this;

        vm.credentials = {
            username: '',
            username: '',
            password: ''
        };

        vm.login = function (credentials) {
            var req = {
                method: 'POST',
                url: 'http://localhost:8080/api/authentication',
                headers: {
                    'Authorization': 'Basic ' + btoa(credentials.username + ':' + credentials.password)
                },
                data: {username: credentials.username}
            }


            $http(req).
                success(function (data, status, headers, config) {
                    $timeout(function () {
                        /*                        UserSettings.currentUser.uuid = data.uuid;
                         UserSettings.currentUser.username = credentials.username;
                         UserSettings.currentUser.password = credentials.password;*/

                        UserSettings.setUser({
                            username: $scope.credentials.username,
                            password: $scope.credentials.password,
                            uuid: data.uuid
                        });

                        $location.path('/view2');
                        $scope.$apply();
                    })
                }).
                error(function (data, status, headers, config) {
                    alert('error' + status);
                });


        };

    };

})();