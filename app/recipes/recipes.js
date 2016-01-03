'use strict';

angular.module('myApp.recipes', ['ngRoute', 'myApp.api'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/recipes', {
            templateUrl: 'recipes/recipes.html',
            controller: 'RecipeController',
            controllerAs: 'recipesCtrl'
        });
    }])

    .controller('RecipeController', RecipeController);

RecipeController.$inject = ['$scope', 'Api'];
function RecipeController($scope, Api) {
    /*        Api.all().success(function (data) {
     $scope.allRecipes = data;
     }).error(function () {
     alert('error!');
     })*/


    var controller = this;
    Api.all().success(function (data) {
        $scope.recipes = data.Recipes;
    }).error(function () {
        $scope.recipes = [];
    })

    return controller;
}
