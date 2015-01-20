/* Natural Language Date Input */

angular
    .module("common")
    .directive("nlpDate", function ($rootScope, DATE_SOURCE) {
        return {
            require: 'ngModel',
            scope: {
                date: "=",
                text: "=ngModel"
            },
            restrict: "A",
            link: function (scope, el, attrs, ctrl) {
                scope.$watch("text", function (text) {

                    // Implement validation
                    if ( attrs.required && text && attrs.separator ) {

                        // Make sure there is text before the separator
                        ctrl.$setValidity('nlp-required', $.trim(text).indexOf(attrs.separator) !== 0);
                    }

                    // If a separator was specified, use it
                    if ( text && attrs.separator ) {
                        text = text.split(attrs.separator)[1];
                    }

                    // Don't parse empty strings
                    if ( !text ) return;

                    // Parse the string with SugarJS (http://sugarjs.com/)
                    var date = Date.create(text);
                    if ( !date.isValid() ) return;

                    // Make sure date limits are respected
                    if ( attrs.minDate && date.isBefore(scope.$eval(attrs.minDate)) ) return;
                    if ( attrs.maxDate && attrs.maxDate && date.isAfter(attrs.maxDate) ) return;

                    if ( scope.date.getYear() != date.getYear() || scope.date.getMonth() != date.getMonth() || scope.date.getDay() != date.getDay() ) {

                        // Date was changed
                        $rootScope.$broadcast("nlpDate:dateChange", null);
                    }

                    if ( scope.date.getHours() != date.getHours() || scope.date.getMinutes() != date.getMinutes() || scope.date.getSeconds() != date.getSeconds() ) {

                        // Time was changed
                        $rootScope.$broadcast("nlpDate:timeChange", null);
                    }

                    /**
                     * Set date source.
                     * @type {boolean}
                     */
                    date[DATE_SOURCE.isFromNlp] = true;

                    /**
                     * Set the computed date
                     * @type {text}
                     */
                    scope.date = date;
                });
            }
        }
    });
