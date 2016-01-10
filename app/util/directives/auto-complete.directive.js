(function () {

    angular.module('myApp.util.directives')
        .directive('autoComplete', autoComplete);

    autoComplete.$inject = ['$timeout'];
    function autoComplete($timeout) {

        return {
            restrict: 'A',
            scope: {
                ngModel: '=',
                autoList: '=',
                displayField: '=',
                idField: '='
            },
            require: 'ngModel',
            link: function (scope, elm, attrs, ngModel, autoList) {

                var listValues;
                initListValies();

                function newValue(value) {
                    //convert selected value to 'object'
                    var selectedValue = value;
                    var convertedObject = null;
                    scope.autoList.forEach(function (obj) {
                        if (obj[scope.displayField].toUpperCase() == selectedValue.toUpperCase())
                            convertedObject = obj;
                    });


                    if (!convertedObject) {
                        //alert('failed to convert input <' + selectedValue + '> to an object!');
                    }
                    else {
                        //set the model
                        ngModel.$setViewValue(convertedObject);
                    }
                };

                function initListValies() {
                    //default value
                    if (!scope.idField)
                        scope.idField = 'uuid';

                    //default value
                    if (!scope.displayField)
                        scope.displayField = 'name';

                    //build array of display values
                    var list = [];

                    //we need to wait for the ajax request!
                    scope.$watch("autoList", function (newVal) {
                        if (newVal) {
                            scope.autoList.forEach(function (obj) {
                                list.push(obj[scope.displayField]);
                            });
                            listValues = list;
                        }
                    });
                }

                elm.change(function (event) {
                    newValue(this.value);
                });

                elm.autocomplete(
                    {
                        source: listValues,
                        search: function (oEvent, oUi) {
                            // get current input value
                            var sValue = $(oEvent.target).val();
                            // init new search array
                            var aSearch = [];
                            // for each element in the main array ...
                            $(listValues).each(function (iIndex, sElement) {
                                // ... if element starts with input value ...
                                if (sElement.substr(0, sValue.length).toUpperCase() == sValue.toUpperCase()) {
                                    // ... add element
                                    aSearch.push(sElement);
                                }
                            });
                            // change search array
                            $(this).autocomplete('option', 'source', aSearch);

                        },
                        minLength: 1,
                        select: function (event, ui) {
                            newValue(ui.item.value);
                        }
                    });
            }

        }
    }


})
();