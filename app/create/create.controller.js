(function () {

    angular.module('myApp.create')
        .controller('CreateController', CreateController);

    CreateController.inject = ['$scope', 'Api', '$timeout'];
    function CreateController($scope, Api, $timeout) {
        var vm = this;

        vm.recipe = {};
        vm.newIngredient = newIngredient;
        vm.measurements;
        vm.defaultMeasurement;
        //TODO: byt namn till availibe ingridients eller nåt
        vm.ingredients;

        init();

        function init() {
            $timeout(function () {
                Api.allIngredients().success(function (data) {
                    vm.ingredients = data.Ingredients;
                }).error(function (error, status) {
                    alert('failed to get ingredients!\nerror: ' + error + "\nstatus: " + status);
                    vm.ingredients = [];
                });

                Api.allMeasurements().success(function (data) {
                    vm.measurements = data.Measurements;

                    vm.measurements.forEach(function (m) {
                        if (m.name == 'st')
                            vm.defaultMeasurement = m;
                    });

                    if (!vm.recipe.recipeIngredients)
                        newIngredient();

                }).error(function (error, status) {
                    alert('failed to get measurements!\nerror: ' + error + "\nstatus: " + status);
                    vm.measurements = [];
                });
            });
        }

        function newIngredient() {
            if (!vm.recipe.recipeIngredients)
                vm.recipe.recipeIngredients = [];

            vm.recipe.recipeIngredients.push({
                'amount': 1,
                measurement: vm.defaultMeasurement
            });
        };

        vm.create = function () {


            /*            Api.ingredientsByName('spaghettI').success(function (data) {
             alert(JSON.stringify(data));
             }).error(function () {
             alert('nein');
             });*/

            //HAXXA TILL
            // POSTAS SEPARAT!

            vm.recipe.recipeIngredients.forEach(function (recIng) {
                console.log('recIng: ' + JSON.stringify(recIng));

                //new ingredients
                if (!recIng.ingredient.uuid) {
                    //TODO: skapa den!
                    /*                    console.log('ingredient: ' + recIng.ingredient);
                     //first make sure the ingredient really does not exist
                     Api.ingredientsByName(recIng.ingredient).success(function (data) {


                     ///hmm. modell och gui binder dubbelt men inte rätt från detta håll...


                     //   $scope.check = function () {
                     recIng.ingredient = data.Ingredients[0];
                     //  };


                     }).error(function () {
                     alert('failed to create ingredient!\n\nerror: ' + JSON.stringify(error) + "\nstatus: " + status);
                     })*/
                }


            });

            //TODO: de är rätt här, men textfälten måste updpateras eftersom den numera visar [object Object].
            vm.recipe.recipeIngredients.forEach(function (recIng) {
                console.log('recIng_FIXED: ' + JSON.stringify(recIng));
            });


            //ingridients
            //instructions
            //comments
            /*

             Api.create(vm.recipe).success(function () {
             alert('yes');
             }).error(function (error, status) {
             alert('receipt:\n\n' + JSON.stringify(vm.recipe) + '\nfailed to create recipe!\n\nerror: ' + JSON.stringify(error) + "\nstatus: " + status);
             })*/
        }

    };

})();

