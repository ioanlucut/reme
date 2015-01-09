angular
    .module("common")
    .directive("validDate", function () {
        return {
            require: "ngModel",
            scope: {
                ngModel: "="
            },
            link: function (scope, el, attr, ngModel) {

                function isValidDate(date) {
                    if ( date === "" || _.isUndefined(date) ) {
                        return false;
                    }
                    return moment().diff(date) <= 0;
                }

                ngModel.$validators.validDate = function (date) {
                    return isValidDate(date);
                };
            }
        };
    });
