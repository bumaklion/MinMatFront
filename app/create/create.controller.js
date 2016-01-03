(function () {

    angular.module('myApp.create')
        .controller('CreateController', CreateController);

    CreateController.inject = ['$scope', 'Api'];
    function CreateController($scope, Api) {
        var vm = this;

        vm.recipe = {}

        vm.create = function () {
            Api.create(vm.recipe).success(function () {
                alert('yes');
            }).error(function () {
                alert('nein');
            })
        }

    };

})();