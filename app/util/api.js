'use strict';

angular.module('myApp.api', [])

    .service("Api", ['UserSettings', '$http', function (UserSettings, $http) {
        return {

            allMeasurements: function () {
                return $http({
                    method: 'GET',
                    url: 'http://localhost:8080/api/measurements',
                    headers: {
                        'Authorization': 'Basic ' + btoa(UserSettings.getUserName() + ':' + UserSettings.getPassword())
                    }
                });
            },

            ingredientsByName: function (name) {
                return $http({
                    method: 'GET',
                    url: 'http://localhost:8080/api/users/' + UserSettings.getUuid() + '/ingredients',
                    params: {name: name},
                    headers: {
                        'Authorization': 'Basic ' + btoa(UserSettings.getUserName() + ':' + UserSettings.getPassword())
                    }
                });
            },

            allIngredients: function () {
                return $http({
                    method: 'GET',
                    url: 'http://localhost:8080/api/users/' + UserSettings.getUuid() + '/ingredients',
                    headers: {
                        'Authorization': 'Basic ' + btoa(UserSettings.getUserName() + ':' + UserSettings.getPassword())
                    }
                });
            },

            all: function () {
                return $http({
                    method: 'GET',
                    url: 'http://localhost:8080/api/users/' + UserSettings.getUuid() + '/recipes',
                    headers: {
                        'Authorization': 'Basic ' + btoa(UserSettings.getUserName() + ':' + UserSettings.getPassword())
                    }
                });
            },

            create: function (newRecipe) {
                return $http({
                    method: 'POST',
                    url: 'http://localhost:8080/api/users/' + UserSettings.getUuid() + '/recipes',
                    headers: {
                        'Authorization': 'Basic ' + btoa(UserSettings.getUserName() + ':' + UserSettings.getPassword())
                    },
                    data: newRecipe
                });
            }
        }
    }])

;
