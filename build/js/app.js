/**
 * Main common module declaration including ui templates.
 */
angular
    .module("common", [
        "ui.router",
        "restmod",
        "ui.bootstrap.transition",
        "ui.bootstrap.datepicker",
        "ui.bootstrap.dropdown",
        "ui.bootstrap.tooltip",
        "ui.bootstrap.popover",
        "ui.bootstrap.modal"
    ])
    .config(["$httpProvider", function ($httpProvider) {
        $httpProvider.interceptors.push("HumpsInterceptor");
        $httpProvider.interceptors.push("JWTInterceptor");
    }]);
;/**
 * Common states.
 */
angular
    .module("common")
    .constant("STATES", {
        home: "home",
        profile: "profile",
        reminders: "reminders",
        account: "account"
    })
    .constant("ACCESS_LEVEL", {
        forLoggedUser: "forLoggedUser",
        forGuestUser: "forGuestUser"
    });
;/* Animate */

angular
    .module("common")
    .directive("animate", function () {
        return {
            restrict: "A",
            link: function (scope, el, attrs) {

                // Apply the animate class when the given event occurs
                scope.$on(attrs.animateOn, function () {
                    el.addClass(attrs.animateClass);
                });

                // Remove the animate class on animation end
                el.on('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                    el.removeClass(attrs.animateClass);
                });
            }
        }
    });
;/* Auto focus */

angular
    .module("common")
    .directive("autoFocus", ["$timeout", function ($timeout) {
        return {
            restrict: "A",
            link: function (scope, el, attrs) {
                if ( !attrs.autoFocus ) {

                    // No model to watch, focus the element
                    el.focus();
                }
                else {

                    // Watch the specified model, and auto-focus the element when the model is "true"
                    scope.$watch(attrs.autoFocus, function (val) {
                        if ( val === true ) {
                            $timeout(function () {
                                el.focus();
                            });
                        }
                    });
                }
            }
        }
    }]);
;angular.module('ui.bootstrap.datepicker', ['ui.bootstrap.position'])

    .constant('datepickerConfig', {
        dayFormat: 'dd',
        monthFormat: 'MMMM',
        yearFormat: 'yyyy',
        dayHeaderFormat: 'EEE',
        dayTitleFormat: 'MMMM yyyy',
        monthTitleFormat: 'yyyy',
        showWeeks: true,
        startingDay: 0,
        yearRange: 20,
        minDate: null,
        maxDate: null
    })

    .controller('DatepickerController', ["$scope", "$attrs", "dateFilter", "datepickerConfig", function ($scope, $attrs, dateFilter, datepickerConfig) {
        var format = {
                day: getValue($attrs.dayFormat, datepickerConfig.dayFormat),
                month: getValue($attrs.monthFormat, datepickerConfig.monthFormat),
                year: getValue($attrs.yearFormat, datepickerConfig.yearFormat),
                dayHeader: getValue($attrs.dayHeaderFormat, datepickerConfig.dayHeaderFormat),
                dayTitle: getValue($attrs.dayTitleFormat, datepickerConfig.dayTitleFormat),
                monthTitle: getValue($attrs.monthTitleFormat, datepickerConfig.monthTitleFormat)
            },
            startingDay = getValue($attrs.startingDay, datepickerConfig.startingDay),
            yearRange = getValue($attrs.yearRange, datepickerConfig.yearRange);

        this.minDate = datepickerConfig.minDate ? new Date(datepickerConfig.minDate) : null;
        this.maxDate = datepickerConfig.maxDate ? new Date(datepickerConfig.maxDate) : null;

        function getValue(value, defaultValue) {
            return angular.isDefined(value) ? $scope.$parent.$eval(value) : defaultValue;
        }

        function getDaysInMonth(year, month) {
            return new Date(year, month, 0).getDate();
        }

        function getDates(startDate, n) {
            var dates = new Array(n);
            var current = startDate, i = 0;
            while ( i < n ) {
                dates[i++] = new Date(current);
                current.setDate(current.getDate() + 1);
            }
            return dates;
        }

        function makeDate(date, format, isSelected, isSecondary) {
            return { date: date, label: dateFilter(date, format), selected: !!isSelected, secondary: !!isSecondary };
        }

        this.modes = [
            {
                name: 'day',
                getVisibleDates: function (date, selected) {
                    var year = date.getFullYear(), month = date.getMonth(), firstDayOfMonth = new Date(year, month, 1);
                    var difference = startingDay - firstDayOfMonth.getDay(),
                        numDisplayedFromPreviousMonth = (difference > 0) ? 7 - difference : -difference,
                        firstDate = new Date(firstDayOfMonth), numDates = 0;

                    if ( numDisplayedFromPreviousMonth > 0 ) {
                        firstDate.setDate(-numDisplayedFromPreviousMonth + 1);
                        numDates += numDisplayedFromPreviousMonth; // Previous
                    }
                    numDates += getDaysInMonth(year, month + 1); // Current
                    numDates += (7 - numDates % 7) % 7; // Next

                    var days = getDates(firstDate, numDates), labels = new Array(7);
                    for ( var i = 0; i < numDates; i++ ) {
                        var dt = new Date(days[i]);
                        days[i] = makeDate(dt, format.day, (selected && selected.getDate() === dt.getDate() && selected.getMonth() === dt.getMonth() && selected.getFullYear() === dt.getFullYear()), dt.getMonth() !== month);
                    }
                    for ( var j = 0; j < 7; j++ ) {
                        labels[j] = dateFilter(days[j].date, format.dayHeader);
                    }
                    return { objects: days, title: dateFilter(date, format.dayTitle), labels: labels };
                },
                compare: function (date1, date2) {
                    return (new Date(date1.getFullYear(), date1.getMonth(), date1.getDate()) - new Date(date2.getFullYear(), date2.getMonth(), date2.getDate()) );
                },
                split: 7,
                step: { months: 1 }
            },
            {
                name: 'month',
                getVisibleDates: function (date, selected) {
                    var months = new Array(12), year = date.getFullYear();
                    for ( var i = 0; i < 12; i++ ) {
                        var dt = new Date(year, i, 1);
                        months[i] = makeDate(dt, format.month, (selected && selected.getMonth() === i && selected.getFullYear() === year));
                    }
                    return { objects: months, title: dateFilter(date, format.monthTitle) };
                },
                compare: function (date1, date2) {
                    return new Date(date1.getFullYear(), date1.getMonth()) - new Date(date2.getFullYear(), date2.getMonth());
                },
                split: 3,
                step: { years: 1 }
            },
            {
                name: 'year',
                getVisibleDates: function (date, selected) {
                    var years = new Array(yearRange), year = date.getFullYear(), startYear = parseInt((year - 1) / yearRange, 10) * yearRange + 1;
                    for ( var i = 0; i < yearRange; i++ ) {
                        var dt = new Date(startYear + i, 0, 1);
                        years[i] = makeDate(dt, format.year, (selected && selected.getFullYear() === dt.getFullYear()));
                    }
                    return { objects: years, title: [years[0].label, years[yearRange - 1].label].join(' - ') };
                },
                compare: function (date1, date2) {
                    return date1.getFullYear() - date2.getFullYear();
                },
                split: 5,
                step: { years: yearRange }
            }
        ];

        this.isDisabled = function (date, mode) {
            var currentMode = this.modes[mode || 0];
            return ((this.minDate && currentMode.compare(date, this.minDate) < 0) || (this.maxDate && currentMode.compare(date, this.maxDate) > 0) || ($scope.dateDisabled && $scope.dateDisabled({date: date, mode: currentMode.name})));
        };
    }])

    .directive('datepicker', ["dateFilter", "$parse", "datepickerConfig", "$log", function (dateFilter, $parse, datepickerConfig, $log) {
        return {
            restrict: 'EA',
            replace: true,
            templateUrl: 'template/datepicker/datepicker.html',
            scope: {
                dateDisabled: '&'
            },
            require: ['datepicker', '?^ngModel'],
            controller: 'DatepickerController',
            link: function (scope, element, attrs, ctrls) {
                var datepickerCtrl = ctrls[0], ngModel = ctrls[1];

                if ( !ngModel ) {
                    return; // do nothing if no ng-model
                }

                // Configuration parameters
                var mode = 0, selected = new Date(), showWeeks = datepickerConfig.showWeeks;

                if ( attrs.showWeeks ) {
                    scope.$parent.$watch($parse(attrs.showWeeks), function (value) {
                        showWeeks = !!value;
                        updateShowWeekNumbers();
                    });
                } else {
                    updateShowWeekNumbers();
                }

                if ( attrs.min ) {
                    scope.$parent.$watch($parse(attrs.min), function (value) {
                        datepickerCtrl.minDate = value ? new Date(value) : null;
                        refill();
                    });
                }
                if ( attrs.max ) {
                    scope.$parent.$watch($parse(attrs.max), function (value) {
                        datepickerCtrl.maxDate = value ? new Date(value) : null;
                        refill();
                    });
                }

                function updateShowWeekNumbers() {
                    scope.showWeekNumbers = mode === 0 && showWeeks;
                }

                // Split array into smaller arrays
                function split(arr, size) {
                    var arrays = [];
                    while ( arr.length > 0 ) {
                        arrays.push(arr.splice(0, size));
                    }
                    return arrays;
                }

                function refill(updateSelected) {
                    var date = null, valid = true;

                    if ( ngModel.$modelValue ) {
                        date = new Date(ngModel.$modelValue);

                        if ( isNaN(date) ) {
                            valid = false;
                            $log.error('Datepicker directive: "ng-model" value must be a Date object, a number of milliseconds since 01.01.1970 or a string representing an RFC2822 or ISO 8601 date.');
                        } else if ( updateSelected ) {
                            selected = date;
                        }
                    }
                    ngModel.$setValidity('date', valid);

                    var currentMode = datepickerCtrl.modes[mode], data = currentMode.getVisibleDates(selected, date);
                    angular.forEach(data.objects, function (obj) {
                        obj.disabled = datepickerCtrl.isDisabled(obj.date, mode);
                    });

                    ngModel.$setValidity('date-disabled', (!date || !datepickerCtrl.isDisabled(date)));

                    scope.rows = split(data.objects, currentMode.split);
                    scope.labels = data.labels || [];
                    scope.title = data.title;
                }

                function setMode(value) {
                    mode = value;
                    updateShowWeekNumbers();
                    refill();
                }

                ngModel.$render = function () {
                    refill(true);
                };

                scope.select = function (date) {
                    if ( mode === 0 ) {
                        var dt = ngModel.$modelValue ? new Date(ngModel.$modelValue) : new Date(0, 0, 0, 0, 0, 0, 0);
                        dt.setFullYear(date.getFullYear(), date.getMonth(), date.getDate());
                        ngModel.$setViewValue(dt);
                        refill(true);
                    } else {
                        selected = date;
                        setMode(mode - 1);
                    }
                };
                scope.move = function (direction) {
                    var step = datepickerCtrl.modes[mode].step;
                    selected.setMonth(selected.getMonth() + direction * (step.months || 0));
                    selected.setFullYear(selected.getFullYear() + direction * (step.years || 0));
                    refill();
                };
                scope.toggleMode = function () {
                    setMode((mode + 1) % datepickerCtrl.modes.length);
                };
                scope.getWeekNumber = function (row) {
                    return ( mode === 0 && scope.showWeekNumbers && row.length === 7 ) ? getISO8601WeekNumber(row[0].date) : null;
                };

                function getISO8601WeekNumber(date) {
                    var checkDate = new Date(date);
                    checkDate.setDate(checkDate.getDate() + 4 - (checkDate.getDay() || 7)); // Thursday
                    var time = checkDate.getTime();
                    checkDate.setMonth(0); // Compare with Jan 1
                    checkDate.setDate(1);
                    return Math.floor(Math.round((time - checkDate) / 86400000) / 7) + 1;
                }
            }
        };
    }])

    .constant('datepickerPopupConfig', {
        dateFormat: 'yyyy-MM-dd',
        currentText: 'Today',
        toggleWeeksText: 'Weeks',
        clearText: 'Clear',
        closeText: 'Done',
        closeOnDateSelection: true,
        appendToBody: false,
        showButtonBar: true
    })

    .directive('datepickerPopup', ['$compile', '$parse', '$document', '$position', 'dateFilter', 'datepickerPopupConfig', 'datepickerConfig',
        function ($compile, $parse, $document, $position, dateFilter, datepickerPopupConfig, datepickerConfig) {
            return {
                restrict: 'EA',
                require: 'ngModel',
                link: function (originalScope, element, attrs, ngModel) {
                    var scope = originalScope.$new(), // create a child scope so we are not polluting original one
                        dateFormat,
                        closeOnDateSelection = angular.isDefined(attrs.closeOnDateSelection) ? originalScope.$eval(attrs.closeOnDateSelection) : datepickerPopupConfig.closeOnDateSelection,
                        appendToBody = angular.isDefined(attrs.datepickerAppendToBody) ? originalScope.$eval(attrs.datepickerAppendToBody) : datepickerPopupConfig.appendToBody;

                    attrs.$observe('datepickerPopup', function (value) {
                        dateFormat = value || datepickerPopupConfig.dateFormat;
                        ngModel.$render();
                    });

                    scope.showButtonBar = angular.isDefined(attrs.showButtonBar) ? originalScope.$eval(attrs.showButtonBar) : datepickerPopupConfig.showButtonBar;

                    originalScope.$on('$destroy', function () {
                        $popup.remove();
                        scope.$destroy();
                    });

                    attrs.$observe('currentText', function (text) {
                        scope.currentText = angular.isDefined(text) ? text : datepickerPopupConfig.currentText;
                    });
                    attrs.$observe('toggleWeeksText', function (text) {
                        scope.toggleWeeksText = angular.isDefined(text) ? text : datepickerPopupConfig.toggleWeeksText;
                    });
                    attrs.$observe('clearText', function (text) {
                        scope.clearText = angular.isDefined(text) ? text : datepickerPopupConfig.clearText;
                    });
                    attrs.$observe('closeText', function (text) {
                        scope.closeText = angular.isDefined(text) ? text : datepickerPopupConfig.closeText;
                    });

                    var getIsOpen, setIsOpen;
                    if ( attrs.isOpen ) {
                        getIsOpen = $parse(attrs.isOpen);
                        setIsOpen = getIsOpen.assign;

                        originalScope.$watch(getIsOpen, function updateOpen(value) {
                            scope.isOpen = !!value;
                        });
                    }
                    scope.isOpen = getIsOpen ? getIsOpen(originalScope) : false; // Initial state

                    function setOpen(value) {
                        if ( setIsOpen ) {
                            setIsOpen(originalScope, !!value);
                        } else {
                            scope.isOpen = !!value;
                        }
                    }

                    var documentClickBind = function (event) {
                        if ( scope.isOpen && event.target !== element[0] ) {
                            scope.$apply(function () {
                                setOpen(false);
                            });
                        }
                    };

                    var elementClickBind = function (e) {
                        scope.$apply(function () {
                            setOpen(!scope.isOpen);
                        });

                        e.preventDefault();
                        e.stopPropagation();
                    };

                    // popup element used to display calendar
                    var popupEl = angular.element('<div datepicker-popup-wrap><div datepicker></div></div>');
                    popupEl.attr({
                        'ng-model': 'date',
                        'ng-change': 'dateSelection()'
                    });
                    var datepickerEl = angular.element(popupEl.children()[0]),
                        datepickerOptions = {};
                    if ( attrs.datepickerOptions ) {
                        datepickerOptions = originalScope.$eval(attrs.datepickerOptions);
                        datepickerEl.attr(angular.extend({}, datepickerOptions));
                    }

                    // TODO: reverse from dateFilter string to Date object
                    function parseDate(viewValue) {
                        if ( !viewValue ) {
                            ngModel.$setValidity('date', true);
                            return null;
                        } else if ( angular.isDate(viewValue) ) {
                            ngModel.$setValidity('date', true);
                            return viewValue;
                        } else if ( angular.isString(viewValue) ) {
                            var date = new Date(viewValue);
                            if ( isNaN(date) ) {
                                ngModel.$setValidity('date', false);
                                return undefined;
                            } else {
                                ngModel.$setValidity('date', true);
                                return date;
                            }
                        } else {
                            ngModel.$setValidity('date', false);
                            return undefined;
                        }
                    }

                    ngModel.$parsers.unshift(parseDate);

                    // Inner change
                    scope.dateSelection = function (dt) {
                        if ( angular.isDefined(dt) ) {
                            scope.date = dt;
                        }
                        ngModel.$setViewValue(scope.date);
                        ngModel.$render();

                        if ( closeOnDateSelection ) {
                            setOpen(false);
                        }
                    };

                    element.bind('input change keyup', function () {
                        scope.$apply(function () {
                            scope.date = ngModel.$modelValue;
                        });
                    });

                    // Outter change
                    ngModel.$render = function () {
                        var date = ngModel.$viewValue ? dateFilter(ngModel.$viewValue, dateFormat) : '';
                        element.val(date);
                        scope.date = ngModel.$modelValue;
                    };

                    function addWatchableAttribute(attribute, scopeProperty, datepickerAttribute) {
                        if ( attribute ) {
                            originalScope.$watch($parse(attribute), function (value) {
                                scope[scopeProperty] = value;
                            });
                            datepickerEl.attr(datepickerAttribute || scopeProperty, scopeProperty);
                        }
                    }

                    addWatchableAttribute(attrs.min, 'min');
                    addWatchableAttribute(attrs.max, 'max');
                    if ( attrs.showWeeks ) {
                        addWatchableAttribute(attrs.showWeeks, 'showWeeks', 'show-weeks');
                    } else {
                        scope.showWeeks = 'show-weeks' in datepickerOptions ? datepickerOptions['show-weeks'] : datepickerConfig.showWeeks;
                        datepickerEl.attr('show-weeks', 'showWeeks');
                    }
                    if ( attrs.dateDisabled ) {
                        datepickerEl.attr('date-disabled', attrs.dateDisabled);
                    }

                    function updatePosition() {
                        scope.position = appendToBody ? $position.offset(element) : $position.position(element);
                        scope.position.top = scope.position.top + element.prop('offsetHeight');
                    }

                    element.bind('click', elementClickBind);
                    scope.$watch('isOpen', function (value) {
                        if ( value ) {
                            updatePosition();
                            $document.bind('click', documentClickBind);
                        } else {
                            $document.unbind('click', documentClickBind);
                        }

                        if ( setIsOpen ) {
                            setIsOpen(originalScope, value);
                        }
                    });

                    scope.today = function () {
                        var today = new Date();
                        today.setHours(scope.date.getHours());
                        today.setMinutes(scope.date.getMinutes());
                        today.setSeconds(scope.date.getSeconds());

                        scope.dateSelection(today);
                    };
                    scope.clear = function () {
                        scope.dateSelection(null);
                    };

                    var $popup = $compile(popupEl)(scope);
                    if ( appendToBody ) {
                        $document.find('body').append($popup);
                    } else {
                        element.after($popup);
                    }
                }
            };
        }])

    .directive('datepickerPopupWrap', function () {
        return {
            restrict: 'EA',
            replace: true,
            transclude: true,
            templateUrl: 'template/datepicker/popup.html',
            link: function (scope, element, attrs) {
                element.bind('click', function (event) {
                    event.preventDefault();
                    event.stopPropagation();
                });
            }
        };
    });
;/* Email list */

angular
    .module("common")
    .directive("emailList", [function () {
        return {
            restrict: "A",
            require: "ngModel",
            scope: {
                emails: "=ngModel",
                parentForm: "="
            },
            templateUrl: "app/common/partials/emailList/emailList.html",
            link: function (scope, el, attrs) {

                scope.canAddEmail = true;
                scope.$watch("emails.length", function (newLength, oldLength) {

                    if ( newLength > oldLength ) {

                        // Focus the new input
                        el.find("input").focus();
                    }
                });

                scope.addEmail = function (email) {
                    if ( isNaN(attrs.maxEmails) || scope.emails.length < parseInt(attrs.maxEmails) ) {
                        scope.emails.push(email);
                    }

                    if ( !isNaN(attrs.maxEmails) && scope.emails.length >= parseInt(attrs.maxEmails) ) {
                        scope.canAddEmail = false;
                    }
                };

                scope.removeEmail = function (index) {
                    scope.emails.splice(index, 1);
                    scope.canAddEmail = true;
                };
            }
        }
    }]);
;/* Focus the first erroneous input on form submit */

angular
    .module("common")
    .directive("focusFirstError", [function () {
        return {
            restrict: "A",
            link: function (scope, el, attrs) {

                var errorSelector = attrs.focusFirstError || ".form-control.ng-invalid";

                el.on("submit", function () {
                    el.find(errorSelector).first().focus();
                });
            }
        }
    }]);
;/**
 * Header directive responsible for header common template.
 */
angular
    .module("common")
    .directive("header", function () {
        return {
            restrict: "A",
            templateUrl: "app/common/partials/header.html",
            link: function (scope, el) {

            }
        };
    });
;/* Natural Language Date Input */

angular
    .module("common")
    .directive("nlpDate", ["$rootScope", "$", function ($rootScope, $) {
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
                        ctrl.$setValidity('nlp-required', $.trim(text).indexOf(attrs.separator) != 0);
                    }

                    // If a separator was specified, use it
                    if ( text && attrs.separator ) {
                        text = text.split(attrs.separator)[1];
                    }

                    // Don't parse empty strings
                    if ( !text ) return;

                    // Parse the string with SugarJS (http://sugarjs.com/)
                    var date;
                    switch ( attrs.prefer ) {
                        case "past":
                            date = Date.past(text);
                            break;
                        case "future":
                            date = Date.future(text);
                            break;
                        default:
                            date = Date.create(text);
                            break;
                    }
                    if ( !date.isValid() ) return;

                    // Make sure date limits are respected
                    if ( attrs.minDate && date.isBefore(attrs.minDate) ) return;
                    if ( attrs.maxDate && date.isAfter(attrs.maxDate) ) return;

                    if ( scope.date.getYear() != date.getYear() || scope.date.getMonth() != date.getMonth() || scope.date.getDay() != date.getDay() ) {

                        // Date was changed
                        $rootScope.$broadcast("nlpDate:dateChange", null);
                    }

                    if ( scope.date.getHours() != date.getHours() || scope.date.getMinutes() != date.getMinutes() || scope.date.getSeconds() != date.getSeconds() ) {

                        // Time was changed
                        $rootScope.$broadcast("nlpDate:timeChange", null);
                    }

                    scope.date = date;
                });
            }
        }
    }]);
;/* Perfect scrollbar */

angular
    .module("common")
    .directive("perfectScrollbar", function () {
        return {
            restrict: 'A',
            link: function (scope, el, attrs) {

                // Init the perfect scrollbar
                el.perfectScrollbar({
                    wheelSpeed: scope.$eval(attrs.wheelSpeed) || 50,
                    wheelPropagation: scope.$eval(attrs.wheelPropagation) || false,
                    minScrollbarLength: scope.$eval(attrs.minScrollbarLength) || false,
                    useBothWheelAxes: scope.$eval(attrs.useBothWheelAxes) || false,
                    useKeyboard: scope.$eval(attrs.useKeyboard) || true,
                    suppressScrollX: scope.$eval(attrs.suppressScrollX) || false,
                    suppressScrollY: scope.$eval(attrs.suppressScrollY) || false,
                    scrollXMarginOffset: scope.$eval(attrs.scrollXMarginOffset) || 0,
                    scrollYMarginOffset: scope.$eval(attrs.scrollYMarginOffset) || 0
                });

                // Update the perfect scrollbar
                attrs.updateOn && scope.$on(attrs.updateOn, function () {
                    el.perfectScrollbar("update");
                });
            }
        }
    });
;/* Scroll to an element on the page */

angular
    .module("common")
    .directive("scrollTo", ["$window", "$", function ($window, $) {
        return {
            restrict: "A",
            link: function (scope, el, attrs) {
                el.on("click", function (e) {

                    // TODO: Find a more angular-ish solution to this problem
                    $("html, body").animate({ scrollTop: $(attrs.scrollTo).offset().top }, parseInt(attrs.scrollSpeed) || 800);
                    e.preventDefault();
                });
            }
        }
    }]);
;/* Timepicker popup */

angular.module("common").
    directive("timepickerPopup", function () {
        return {
            require: "ngModel",
            scope: {
                date: "=ngModel"
            },
            templateUrl: "app/common/partials/timepickerPopup/timepickerPopup.html",
            restrict: "A",
            link: function (scope, el, attrs) {

                // Create the times array
                scope.times = function createTimesArray() {

                    var today = new Date();
                    today.setHours(0);
                    today.setMinutes(0);

                    var timestamp = today.getTime();
                    var step = scope.$eval(attrs.step) || 30;
                    var steps = 24 * 60 / step;
                    var times = [];

                    for ( var i = 0; i < steps; i++ ) {
                        var d = new Date(timestamp);
                        if ( scope.date.getHours() == d.getHours() && scope.date.getMinutes() == d.getMinutes() ) {
                            scope.selectedIndex = i;
                        }

                        times.push({
                            index: i,
                            hour: d.getHours(),
                            minute: d.getMinutes(),
                            timestamp: timestamp
                        });

                        timestamp += step * 60 * 1000;
                    }

                    return times;
                }();

                // Update selected index when date changes
                scope.$watch("date", function (date) {

                    // Init selectedIndex
                    scope.selectedIndex = null;

                    for ( var i = 0; i < scope.times.length; i++ ) {
                        if ( date.getHours() == scope.times[i].hour && date.getMinutes() == scope.times[i].minute ) {
                            scope.selectedIndex = i;
                        }
                    }
                });

                // Set time by hour and minute
                scope.setTime = function (i, hour, minute) {
                    scope.selectedIndex = i;
                    scope.date.setHours(hour);
                    scope.date.setMinutes(minute);
                };

                // Get the dropdown toggle and dropdown menu
                var dropdownToggle = el.children().eq(0);
                var dropdownMenu = el.children().eq(1);

                dropdownToggle.on("click", function () {

                    // Find the selected item
                    var selectedItem = dropdownMenu.children().eq(scope.selectedIndex);

                    // Reset scrollTop
                    dropdownMenu.scrollTop(0);

                    // Calculate and apply scrollTop
                    var visibleItems = Math.round(dropdownMenu.height() / selectedItem.outerHeight());
                    var scrollTop = selectedItem.position().top - (Math.round(0.5 * visibleItems) - 1) * selectedItem.outerHeight();
                    dropdownMenu.scrollTop(Math.max(scrollTop, 0));

                    // Highlight the selected item
                    scope.highlightSelected = true;
                    scope.$apply();

                    // Update the perfect scrollbar
                    scope.$broadcast("perfectScrollbar:update", null);
                });

                dropdownMenu.on("mouseenter", function () {

                    // Stop highlighting the selected item
                    scope.highlightSelected = false;
                    scope.$apply();
                });
            }
        }
    });
;/* Friendly date filter */

angular
    .module("common")
    .filter('friendlyDate', function () {
        return function (date) {

            if ( !_.isDate(date) ) {
                date = moment(date).toDate();
            }

            var dateFormat = "{Weekday}, {dd} {Month} {yyyy}";

            // Use custom date format for Today and Tomorrow
            date.isToday() && (dateFormat = "Today, {dd} {Month} {yyyy}");
            date.isTomorrow() && (dateFormat = "Tomorrow, {dd} {Month} {yyyy}");

            return date.format(dateFormat);

        };
    });
;/* Friendly date filter */

angular
    .module("common")
    .filter('friendlyHour', function () {
        return function (date) {

            return moment(date).format("h:mm");
        };
    });
;// See https://github.com/fmquaglia/ngOrderObjectB
angular
    .module('common')
    .filter('orderObjectBy', function () {
        return function (items, field, reverse) {
            var filtered = [];
            angular.forEach(items, function (item) {
                filtered.push(item);
            });
            function index(obj, i) {
                return obj[i];
            }

            filtered.sort(function (a, b) {
                var comparator;
                var reducedA = field.split('.').reduce(index, a);
                var reducedB = field.split('.').reduce(index, b);
                if ( reducedA === reducedB ) {
                    comparator = 0;
                } else {
                    comparator = (reducedA > reducedB ? 1 : -1);
                }
                return comparator;
            });
            if ( reverse ) {
                filtered.reverse();
            }
            return filtered;
        };
    });
;angular
    .module("common")
    .service("CamelCaseTransform", ["humps", function (humps) {

        /**
         * Transformation type. Can be camelize or decamelize only.
         * @type {{CAMELIZE: string, DECAMELIZE: string}}
         */
        this.TRANSFORMATION_TYPE = {
            CAMELIZE: "CAMELIZE",
            DECAMELIZE: "DECAMELIZE"
        };

        /**
         * Transforms an object camelized or decamelized.
         * @param objectToTransform
         * @param transformationType
         */
        this.transform = function (objectToTransform, transformationType) {
            if ( objectToTransform && _.isArray(objectToTransform) ) {
                _.each(objectToTransform, _.bind(function (arrayElement) {
                    this.transformObject(arrayElement, transformationType);
                }, this));
            } else {
                this.transformObject(objectToTransform, transformationType);
            }
        };

        /**
         * Transforms an object camelized or decamelized (handles only simple objects, non-array).
         * @param objectToTransform
         * @param transformationType
         */
        this.transformObject = function (objectToTransform, transformationType) {
            var thisService = this;

            if ( objectToTransform && _.isObject(objectToTransform) ) {
                _.each(objectToTransform, function (value, key) {
                    if ( objectToTransform.hasOwnProperty(key) ) {
                        var newKey = transformationType === thisService.TRANSFORMATION_TYPE.CAMELIZE ? humps.camelize(key) : humps.decamelize(key);
                        if ( key !== newKey ) {
                            objectToTransform[newKey] = objectToTransform[key];
                            delete objectToTransform[key];
                        }
                    }
                });
            }
        };
    }]);
;angular
    .module("common")
    .factory("HumpsInterceptor", ["CamelCaseTransform", function (CamelCaseTransform) {

        return {

            request: function (config) {
                CamelCaseTransform.transform(config.data, CamelCaseTransform.TRANSFORMATION_TYPE.DECAMELIZE);

                return config;
            },

            response: function (response) {
                CamelCaseTransform.transform(response.data, CamelCaseTransform.TRANSFORMATION_TYPE.CAMELIZE);

                return response;
            }

        };

    }]);
;/* Timezone detect */

angular
    .module("common")
    .factory("humps", [function () {

        return window.humps;

    }]);
;/* jQuery */

angular
    .module("common")
    .factory("$", [function () {

        return window.$;

    }]);
;/* Timezone detect */

angular
    .module("common")
    .factory("jstz", [function () {

        return window.jstz;

    }]);
;angular
    .module('common')
    .service('JWTHelper', function () {

        this.urlBase64Decode = function (str) {
            var output = str.replace('-', '+').replace('_', '/');
            switch ( output.length % 4 ) {
                case 0:
                {
                    break;
                }
                case 2:
                {
                    output += '==';
                    break;
                }
                case 3:
                {
                    output += '=';
                    break;
                }
                default:
                {
                    throw 'Illegal base64url string!';
                }
            }
            return window.atob(output);
        };

        this.decodeToken = function (token) {
            var parts = token.split('.');

            if ( parts.length !== 3 ) {
                throw new Error('JWT must have 3 parts');
            }

            var decoded = this.urlBase64Decode(parts[1]);
            if ( !decoded ) {
                throw new Error('Cannot decode the token');
            }

            return JSON.parse(decoded);
        };

        this.getTokenExpirationDate = function (token) {
            var decoded;
            decoded = this.decodeToken(token);

            if ( !decoded.exp ) {
                return null;
            }

            var d = new Date(0); // The 0 here is the key, which sets the date to the epoch
            d.setUTCSeconds(decoded.exp);

            return d;
        };

        this.isTokenExpired = function (token) {
            var d = this.getTokenExpirationDate(token);

            if ( !d ) {
                return false;
            }

            // Token expired?
            return !(d.valueOf() > new Date().valueOf());
        };
    });
;angular
    .module("common")
    .provider('JWTInterceptor', function () {

        this.authHeader = 'Authorization';
        this.authPrefix = 'Bearer ';

        var config = this;

        this.$get = ["$q", "$injector", "$rootScope", "SessionService", "JWTTokenRefresher", function ($q, $injector, $rootScope, SessionService, JWTTokenRefresher) {
            return {
                request: function (request) {
                    if ( request.skipAuthorization ) {
                        return request;
                    }

                    request.headers = request.headers || {};
                    // Already has an Authorization header
                    if ( request.headers[config.authHeader] ) {
                        return request;
                    }

                    if ( SessionService.sessionExists() ) {
                        JWTTokenRefresher.refreshTokenIfExpired();
                    }

                    var tokenPromise = $q.when($injector.invoke(function () {
                        return SessionService.getJwtToken();
                    }, this, {
                        config: request
                    }));

                    return tokenPromise.then(function (token) {
                        if ( token ) {
                            request.headers[config.authHeader] = config.authPrefix + token;
                        }
                        return request;
                    });
                }
            };
        }];
    });
;angular
    .module("common")
    .service("JWTTokenRefresher", ["$injector", "JWTHelper", "SessionService", function ($injector, JWTHelper, SessionService) {

        this.refreshTokenIfExpired = function () {
            if ( this.isTokenExpired() ) {
                this.refreshToken();
            }
        };

        this.isTokenExpired = function () {
            return JWTHelper.isTokenExpired(SessionService.getJwtToken());
        };

        this.refreshToken = function () {
            return $injector.get('AuthService').refreshToken();
        };
    }]);
;/* Mixpanel */

angular
    .module("common")
    .factory("mixpanel", [function () {

        return window.mixpanel;
    }]);
;/**
 * Session service which encapsulates the whole logic account related to the cookie which contains currently logged in user.
 */
angular
    .module("common")
    .service("SessionService", ["$cookies", "CamelCaseTransform", function ($cookies, CamelCaseTransform) {

        /**
         * Cookie key for session data.
         *
         * @type {string}
         */
        var cookieDataKey = "auth_session_data";
        var jwtTokenKey = "auth_jwt_token";

        /**
         * Create session.
         *
         * @param data
         */
        this.create = function (data, jwtToken) {
            this.setData(data);
            this.setJwtToken(jwtToken);
        };

        /**
         * Set the session data.
         *
         * @param data
         */
        this.setData = function (data) {
            CamelCaseTransform.transform(data, CamelCaseTransform.TRANSFORMATION_TYPE.CAMELIZE);

            $cookies[cookieDataKey] = angular.toJson(data);
        };

        /**
         * Return the session data.
         */
        this.getData = function () {
            return angular.fromJson($cookies[cookieDataKey]);
        };

        /**
         * Set the token data.
         *
         * @param data
         */
        this.setJwtToken = function (data) {
            $cookies[jwtTokenKey] = angular.toJson(data);
        };

        /**
         * Return the session data.
         */
        this.getJwtToken = function () {
            return angular.fromJson($cookies[jwtTokenKey]);
        };

        this.sessionExists = function () {
            return $cookies[cookieDataKey] && $cookies[jwtTokenKey];
        };

        /**
         * Destroy session.
         */
        this.destroy = function () {
            delete $cookies[cookieDataKey];
            delete $cookies[jwtTokenKey];
        };

    }]);
;angular
    .module("common")
    .service("StatesHandler", ["$state", "$stateParams", "STATES", function ($state, $stateParams, STATES) {

        this.goHome = function () {
            this.go(STATES.home);
        };

        this.goToProfile = function () {
            this.go(STATES.profile);
        };

        this.goToReminders = function () {
            this.go(STATES.reminders);
        };

        this.goToLogin = function () {
            this.go(STATES.account);
        };

        this.goToResetPassword = function () {
            this.go(STATES.account);
        };

        this.go = function (state) {
            $state.go(state);
        };

        this.refreshCurrentState = function () {
            $state.transitionTo($state.current, $stateParams, {
                reload: true,
                inherit: false,
                notify: true
            });
        }
    }]);;/* URL To */

angular
    .module("common")
    .factory("URLTo", [function () {

        return window.URLTo;

    }]);
;/**
 * Main account module declaration including ui templates.
 */
angular
    .module("account", [
        "ui.router",
        "restmod",
        "common"
    ])
    .config(["$stateProvider", "$httpProvider", function ($stateProvider, $httpProvider) {

        // Register AuthInterceptor
        $httpProvider.interceptors.push("AuthInterceptor");

        // Home
        $stateProvider

            // Login page
            .state("account", {
                url: "/account",
                templateUrl: "app/account/partials/account.html"
            })

            // Profile page
            .state("profile", {
                url: "/profile",
                templateUrl: "app/account/partials/profile.html",
                controller: "ProfileCtrl",
                title: "Profile",
                resolve: {
                    helloMessage: function () {
                        return {
                            message: 'I am in login page!'
                        };
                    }
                }
            })

            // Logout page
            .state("account:logout", {
                url: "/account/logout",
                controller: "LogoutCtrl",
                templateUrl: "app/account/partials/logout.html",
                resolve: {
                    isSuccessfullyLoggedOut: ["$q", "AuthService", function ($q, AuthService) {
                        AuthService.logout();

                        return true;
                    }]
                }

            })

            // Validate password reset token
            .state({
                name: "account:validatePasswordResetToken",
                url: "/account/reset-password/{token}",
                templateUrl: "app/account/partials/validate_password_reset_token.html",
                controller: "ValidatePasswordResetTokenCtrl",
                resolve: {
                    validateTokenResult: ["$stateParams", "$q", "AuthService", function ($stateParams, $q, AuthService) {
                        var deferred = $q.defer();

                        AuthService.validatePasswordResetToken($stateParams.token)
                            .then(function (response) {

                                // Take the email from
                                deferred.resolve({successful: true, email: response.email});

                                return response;
                            }).catch(function (response) {

                                deferred.resolve({successful: false, errors: response.data && response.data.errors});

                                return response;
                            });

                        return deferred.promise;
                    }]
                }
            })
    }])

    .run(["$rootScope", "AuthFilter", function ($rootScope, AuthFilter) {

        // Setup route filters
        $rootScope.$on("$stateChangeStart", AuthFilter);

    }]);;/**
 * Account related constants.
 */
angular
    .module("account")
    .constant("AUTH_EVENTS", {
        isLoggedIn: "auth-is-logged-in",
        loginSuccess: "auth-login-success",
        loginFailed: "auth-login-failed",
        logoutSuccess: "auth-logout-success",
        sessionTimeout: "auth-session-timeout",
        notAuthenticated: "auth-not-authenticated",
        notAuthorized: "auth-not-authorized"
    })
    .constant("AUTH_URLS", {
        login: "auth/login",
        logout: "auth/logout",
        currentUser: "auth/user",
        auth: "accounts",
        create: "accounts/create",
        update: "accounts/update",
        details: "accounts/details",
        requestPasswordReset: "accounts/request_password_reset_token",
        validatePasswordResetToken: "accounts/validate_password_reset_token/:token",
        updatePassword: "accounts/update_password",
        resetPasswordWithToken: "accounts/reset_password_with_token/:token",
        refreshToken: "auth/refresh_token"
    })
    .constant("ACCOUNT_FORM_STATE", {
        login: "login",
        logout: "logout",
        signUp: "signUp",
        forgotPassword: "forgotPassword",
        forgotPasswordEmailSent: "forgotPasswordEmailSent",
        updateProfile: "updateProfile",
        resetPassword: "resetPassword",
        resetPasswordSuccessfully: "resetPasswordSuccessfully",
        updatePassword: "updatePassword",
        updatePasswordSuccessfully: "updatePasswordSuccessfully"
    })
    .constant("AUTH_TOKEN_HEADER", "authtoken");
;angular
    .module("account")
    .constant("USER_URLS", {
        userUnique: "accounts/is_unique_email"
    });
;/**
 * Forgot password controller responsible for user forgot password action.
 */
angular
    .module("account")
    .controller("ForgotPasswordCtrl", ["$state", "$scope", "AuthService", "AUTH_EVENTS", "ACCOUNT_FORM_STATE", "AccountFormToggle", function ($state, $scope, AuthService, AUTH_EVENTS, ACCOUNT_FORM_STATE, AccountFormToggle) {

        /**
         * Flag which tells if the authentication went well or not.
         * @type {boolean}
         */
        $scope.isRequestPasswordErrorOcurred = false;

        $scope.errorMessages = "";

        /**
         * Request password reset up user information.
         */
        $scope.forgotPasswordData = {
            email: ""
        };

        /**
         * Request password reset functionality.
         */
        $scope.requestPasswordReset = function () {
            if ( $scope.forgotPasswordForm.$valid ) {
                AuthService
                    .requestPasswordReset($scope.forgotPasswordData.email)
                    .then(function () {
                        $scope.isRequestPasswordErrorOcurred = false;
                        AccountFormToggle.setState(ACCOUNT_FORM_STATE.forgotPasswordEmailSent);
                    })
                    .catch(function (response) {
                        $scope.isRequestPasswordErrorOcurred = true;

                        $scope.errorMessages = response.data && response.data.errors;
                    });
            }

        }
    }]);
;/**
 * Login controller responsible for user login actions.
 */
angular
    .module("account")
    .controller("LoginCtrl", ["$scope", "AuthService", "AUTH_EVENTS", "ACCOUNT_FORM_STATE", "AccountFormToggle", "StatesHandler", function ($scope, AuthService, AUTH_EVENTS, ACCOUNT_FORM_STATE, AccountFormToggle, StatesHandler) {

        /**
         * Set default state.
         */
        AccountFormToggle.setState(ACCOUNT_FORM_STATE.login);

        /**
         * Flag which tells if the authentication went well or not.
         * @type {boolean}
         */
        $scope.isAuthenticationErrorOcurred = false;

        /**
         * Login user information.
         * @type {{username: string, password: string}}
         */
        $scope.loginData = {
            email: "",
            password: ""
        };

        /**
         * Login functionality.
         * @param loginData
         */
        $scope.login = function (loginData) {
            if ( $scope.loginForm.$valid ) {

                AuthService
                    .login(loginData.email, loginData.password)
                    .then(function () {

                        $scope.isAuthenticationErrorOcurred = false;
                        StatesHandler.goHome();
                    })
                    .catch(function () {

                        $scope.isAuthenticationErrorOcurred = true;
                    });
            }
        }
    }]);
;/**
 * Logout controller responsible for user logout actions.
 */
angular
    .module("account")
    .controller("LogoutCtrl", ["$scope", "$timeout", "AuthService", "$cookies", "StatesHandler", "isSuccessfullyLoggedOut", function ($scope, $timeout, AuthService, $cookies, StatesHandler, isSuccessfullyLoggedOut) {

        $scope.isSuccessfullyLoggedOut = isSuccessfullyLoggedOut;

        /**
         * Redirect to home after 1,5 sec.
         */
        $timeout(function () {
            StatesHandler.goHome();
        }, 1500);

    }]);
;/**
 * Profile controller responsible for user update profile action.
 */
angular
    .module("account")
    .controller("ProfileCtrl", ["$q", "$scope", "$rootScope", "StatesHandler", "ProfileFormToggle", "ACCOUNT_FORM_STATE", function ($q, $scope, $rootScope, StatesHandler, ProfileFormToggle, ACCOUNT_FORM_STATE) {

        /**
         * Set default state.
         */
        ProfileFormToggle.setState(ACCOUNT_FORM_STATE.updateProfile);

        /**
         * Current user.
         * @type {$rootScope.currentUser|*}
         */
        $scope.user = $rootScope.currentUser;

        /**
         * Error messages.
         * @type {string}
         */
        $scope.errorMessages = "";

        /**
         * Profile user information
         */
        $scope.profileData = {
            firstName: $scope.user.model.firstName,
            lastName: $scope.user.model.lastName,
            email: $scope.user.model.email,
            timezone: $scope.user.model.timezone
        };

        /**
         * Update profile functionality.
         */
        $scope.updateProfile = function (profileData) {

            if ( $scope.profileForm.$valid ) {

                // Update the user
                $scope.user
                    .$save(profileData)
                    .then(function () {
                        $scope.user.$refresh().then(function () {
                            // Set form to pristine
                            $scope.profileForm.$setPristine();
                            $scope.errorMessages = "";

                            // Set for updated to true
                            $scope.isProfileUpdated = true;
                        });
                    })
                    .catch(function (response) {
                        $scope.errorMessages = response.data && response.data.errors && response.data.errors.email;

                        if ( _.isEmpty($scope.errorMessages) ) {
                            $scope.errorMessages = ["We encountered a small problem. Please be patient, we come back to you."]
                        }

                        $scope.isProfileUpdated = false;
                    });
            }
        };

        $scope.getMeBack = function () {
            StatesHandler.goToReminders();
        }
    }]);;/**
 * Sign up controller responsible for user sign up action.
 */
angular
    .module("account")
    .controller("SignUpCtrl", ["$scope", "AuthService", "StatesHandler", "User", "$timeout", "jstz", function ($scope, AuthService, StatesHandler, User, $timeout, jstz) {

        /**
         * Flag which tells if the sign up error occurred.
         * @type {boolean}
         */
        $scope.isSignUpErrorOcurred = false;

        /**
         * Error messages.
         * @type {string}
         */
        $scope.errorMessages = "";

        /**
         * Sign up user information.
         * @type {{firstName: string, lastName: string, email: string, password: string}}
         */
        $scope.signUpData = {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            timezone: ""
        };

        /**
         * Sign up functionality.
         * @param signUpData
         */
        $scope.signUp = function (signUpData) {
            if ( $scope.signUpForm.$valid ) {

                // Compute timezone
                $scope.signUpData.timezone = jstz.determine().name();

                // Create a new user
                User.$new()
                    .$create(signUpData)
                    .then(function () {
                        $scope.isSignUpErrorOcurred = false;

                        // Log in the user
                        AuthService
                            .login(signUpData.email, signUpData.password)
                            .then(function () {
                                StatesHandler.goToReminders();
                            });
                    })
                    .catch(function (response) {

                        $scope.errorMessages = response.data && response.data.errors;

                        if ( _.isEmpty($scope.errorMessages) ) {
                            $scope.errorMessages = ["We encountered a small problem. Please be patient, we come back to you."]
                        }

                        $scope.isSignUpErrorOcurred = true;
                    });
            }

        }
    }]);
;/**
 * Update password controller.
 */
angular
    .module("account")
    .controller("UpdatePasswordCtrl", ["$scope", "AuthService", "ACCOUNT_FORM_STATE", "ProfileFormToggle", function ($scope, AuthService, ACCOUNT_FORM_STATE, ProfileFormToggle) {

        /**
         * Flag which tells if the update password action went well or not.
         * @type {boolean}
         */
        $scope.isUpdatePasswordErrorOcurred = false;

        $scope.errorMessages = "";

        /**
         * Update password user information.
         * @type {{oldPassword: string, newPassword: string, newPasswordConfirmation: string}}
         */
        $scope.updatePasswordData = {
            oldPassword: "",
            newPassword: "",
            newPasswordConfirmation: ""
        };

        /**
         * Update password data functionality.
         * @param updatePasswordData
         */
        $scope.updatePassword = function (updatePasswordData) {
            if ( $scope.updatePasswordForm.$valid ) {

                AuthService
                    .updatePassword(updatePasswordData.oldPassword, updatePasswordData.newPassword, updatePasswordData.newPasswordConfirmation)
                    .then(function () {
                        $scope.isUpdatePasswordErrorOcurred = false;
                        ProfileFormToggle.setState(ACCOUNT_FORM_STATE.updatePasswordSuccessfully);
                    })
                    .catch(function (response) {
                        $scope.isUpdatePasswordErrorOcurred = true;

                        $scope.errorMessages = response.data && response.data.errors;

                        if ( _.isEmpty($scope.errorMessages) ) {
                            $scope.errorMessages = ["We encountered a small problem. Please be patient, we come back to you."]
                        }

                        // remove data from inputs
                        $scope.updatePasswordData.oldPassword = "";
                        $scope.updatePasswordData.newPassword = "";
                        $scope.updatePasswordData.newPasswordConfirmation = "";
                    });
            }
        }
    }]);
;angular
    .module("account")
    .controller("ValidatePasswordResetTokenCtrl", ["$scope", "$stateParams", "$timeout", "AuthService", "StatesHandler", "ProfileFormToggle", "ACCOUNT_FORM_STATE", "validateTokenResult", function ($scope, $stateParams, $timeout, AuthService, StatesHandler, ProfileFormToggle, ACCOUNT_FORM_STATE, validateTokenResult) {

        /**
         * Flag which tells if user is currently authenticated while coming to this page.
         */
        $scope.isUserAuthenticated = AuthService.isAuthenticated();

        /**
         * Flag which says if errors have ocured while trying to reset the password.
         * @type {boolean}
         */
        $scope.isResetPasswordErrorOcurred = false;

        /**
         * Error messages
         * @type {string}
         */
        $scope.errorMessages = "";

        /**
         * If validation is successful, then fetch the email, and build form data.
         */
        if ( validateTokenResult.successful ) {

            /**
             * Reset password data (used if
             * @type {{email: string, password: string, passwordConfirmation: string, token: *}}
             */
            $scope.resetPasswordData = {
                email: validateTokenResult.email,
                password: "",
                passwordConfirmation: "",
                token: $stateParams.token
            };

            $scope.isTokenValid = true;
        }
        else {
            $scope.errorMessages = validateTokenResult.errors;
        }

        /**
         * Reset password data functionality.
         * @param resetPasswordData
         */
        $scope.resetPassword = function (resetPasswordData) {
            if ( $scope.resetPasswordForm.$valid ) {

                AuthService
                    .resetPasswordWithToken(resetPasswordData.email, resetPasswordData.password, resetPasswordData.passwordConfirmation, resetPasswordData.token)
                    .then(function () {
                        $scope.isResetPasswordErrorOcurred = false;
                        $scope.successfullyReseted = true;
                        ProfileFormToggle.setState(ACCOUNT_FORM_STATE.resetPasswordSuccessfully);

                        // Log in the user, and forward it to the reminders page.
                        AuthService
                            .login(resetPasswordData.email, resetPasswordData.password)
                            .then(function () {
                                $timeout(function () {
                                    StatesHandler.goToReminders();
                                }, 1500);
                            });
                    })
                    .catch(function (response) {
                        $scope.isResetPasswordErrorOcurred = true;

                        $scope.errorMessages = response.data && response.data.errors;

                        if ( _.isEmpty($scope.errorMessages) ) {
                            $scope.errorMessages = ["We encountered a small problem. Please be patient, we come back to you."]
                        }

                        // remove data from inputs
                        $scope.resetPasswordData.newPassword = "";
                        $scope.resetPasswordData.newPasswordConfirmation = "";
                    });
            }
        };

        /**
         * Continues to reset password page. (try again functionality)
         */
        $scope.continueToResetPassword = function () {
            if ( $scope.isUserAuthenticated ) {
                AuthService.logout();
            }
            ProfileFormToggle.setState(ACCOUNT_FORM_STATE.forgotPassword);
            StatesHandler.goToLogin();
        }
    }]);
;/**
 * Directive responsible for switching account forms between them.
 */
angular
    .module("account")
    .directive("accountFormToggle", ["AccountFormToggle", "ACCOUNT_FORM_STATE", function (AccountFormToggle, ACCOUNT_FORM_STATE) {
        return {
            restrict: "A",
            link: function (scope) {
                scope.AccountFormToggle = AccountFormToggle;
                scope.ACCOUNT_FORM_STATE = ACCOUNT_FORM_STATE;
            }
        };
    }]);
;/**
 * Directive responsible for switching update profile forms between them.
 */
angular
    .module("account")
    .directive("profileFormToggle", ["ProfileFormToggle", "ACCOUNT_FORM_STATE", function (ProfileFormToggle, ACCOUNT_FORM_STATE) {
        return {
            restrict: "A",
            link: function (scope) {
                scope.ProfileFormToggle = ProfileFormToggle;
                scope.ACCOUNT_FORM_STATE = ACCOUNT_FORM_STATE;
            }
        };
    }]);
;/**
 * Directive responsible for checking of a password is strong enough.
 */
angular
    .module("account")
    .directive("strongPassword", function () {
        return {
            require: "ngModel",
            link: function (scope, el, attr, ngModel) {

                /**
                 * Check whether a password is strong enough.
                 *
                 * @param password
                 * @returns {boolean}
                 */
                function isStrongPassword(password) {
                    return !!password && password.length >= 7;
                }

                ngModel.$validators.strongPassword = function (password) {
                    return isStrongPassword(password);
                }
            }
        };
    });
;angular
    .module("account")
    .directive("uniqueEmail", ["$q", "$timeout", "UserService", function ($q, $timeout, UserService) {
        return {
            require: "ngModel",
            scope: {
                ngModel: "="
            },
            link: function (scope, el, attr, ngModel) {

                /**
                 * Check whether an email address is unique.
                 *
                 * @param email
                 * @returns {promise|defer.promise}
                 */
                ngModel.$asyncValidators.uniqueEmail = function (email) {
                    var deferred = $q.defer();

                    UserService
                        .isUnique(email)
                        .then(function (response) {
                            if ( !response.isUnique ) {
                                deferred.reject();
                            }
                            else {
                                deferred.resolve(response.isUnique);
                            }
                        });

                    return deferred.promise;

                }
            }
        };
    }]);
;/**
 * Directive responsible for checking of an email is valid.
 */
angular
    .module("account")
    .directive("validEmail", function () {
        return {
            require: "ngModel",
            link: function (scope, el, attr, ngModel) {

                /**
                 * Check whether a string is a valid email address
                 *
                 * @param email
                 * @returns {boolean}
                 */
                function isValidEmail(email) {
                    return /[^\s@]+@[^\s@]+\.[^\s@]+/.test(email);
                }

                ngModel.$validators.validEmail = function (email) {
                    return isValidEmail(email);
                }
            }
        };
    });
;/**
 * Account form toggle responsible to keep the state of the current displayed account form.
 */
angular
    .module("account")
    .service("AccountFormToggle", ["ACCOUNT_FORM_STATE", function (ACCOUNT_FORM_STATE) {
        this.state = ACCOUNT_FORM_STATE.login;

        this.setState = function (state) {
            this.state = state;
        };
    }]);



;/**
 * Authentication service which encapsulates the whole logic account related of a user.
 */
angular
    .module("account")
    .service("AuthService", ["$rootScope", "$q", "$http", "$cookies", "SessionService", "AUTH_EVENTS", "AUTH_URLS", "AUTH_TOKEN_HEADER", function ($rootScope, $q, $http, $cookies, SessionService, AUTH_EVENTS, AUTH_URLS, AUTH_TOKEN_HEADER) {

        /**
         * Is User already authenticated ?
         * @returns {*}
         */
        this.isAuthenticated = function () {
            return SessionService.sessionExists();
        };

        /**
         * Login functionality
         *
         * @param email
         * @param password
         * @returns {*}
         */
        this.login = function (email, password) {

            return $http.post(URLTo.api(AUTH_URLS.login), {
                email: email,
                password: password
            }).then(function (response) {

                SessionService.create(response.data, response.headers()[AUTH_TOKEN_HEADER]);
                $rootScope.$broadcast(AUTH_EVENTS.loginSuccess, response);

                return response;
            }).catch(function (response) {

                SessionService.destroy();
                $rootScope.$broadcast(AUTH_EVENTS.loginFailed, response);

                return $q.reject(response);
            });
        };

        /**
         * Logout functionality
         *
         * @returns {*}
         */
        this.logout = function () {
            SessionService.destroy();
            $rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
        };

        /**
         * Request password reset functionality
         * @param email
         * @returns {*}
         */
        this.requestPasswordReset = function (email) {
            return $http.post(URLTo.api(AUTH_URLS.requestPasswordReset), {
                email: email
            });
        };

        /**
         * Reset password with token.
         *
         * @param email
         * @param password
         * @param passwordConfirmation
         * @param token
         * @returns {*}
         */
        this.resetPasswordWithToken = function (email, password, passwordConfirmation, token) {
            return $http
                .post(URLTo.api(AUTH_URLS.resetPasswordWithToken, {":token": token}),
                {
                    email: email,
                    password: password,
                    passwordConfirmation: passwordConfirmation
                },
                {
                    skipAuthorization: true
                })
                .then(function (response) {
                    return response.data;
                });
        };

        /**
         * Validate password reset token.
         *
         * @param token
         * @returns {*}
         */
        this.validatePasswordResetToken = function (token) {
            return $http
                .get(URLTo.api(AUTH_URLS.validatePasswordResetToken, {":token": token}),
                {
                    skipAuthorization: true
                }).then(function (response) {
                    return response.data;
                });
        };

        /**
         * Update password.
         *
         * @param oldPassword
         * @param newPassword
         * @param newPasswordConfirmation
         * @returns {*}
         */
        this.updatePassword = function (oldPassword, newPassword, newPasswordConfirmation) {
            return $http
                .post(URLTo.api(AUTH_URLS.updatePassword),
                {
                    oldPassword: oldPassword,
                    newPassword: newPassword,
                    newPasswordConfirmation: newPasswordConfirmation
                }).then(function (response) {
                    return response.data;
                });
        };

        /**
         * Refreshes current token.
         * @returns {*}
         */
        this.refreshToken = function () {
            return $http
                .post(URLTo.api(AUTH_URLS.refreshToken));

        };
    }]);
;/**
 * Authentication service filter used to redirect user to the home page if it is already logged in.
 */
angular
    .module("account")
    .service("AuthFilter", ["AuthService", "StatesHandler", function (AuthService, StatesHandler) {

        return function (event, toState) {
            if ( (toState.url === '/account' || toState.url === "/") && AuthService.isAuthenticated() ) {

                // Prevent transition
                event.preventDefault();
                StatesHandler.goToReminders();
            } else if ( (toState.url === '/profile' || toState.url === '/reminders' || toState.url === '/') && !AuthService.isAuthenticated() ) {

                // Prevent transition
                event.preventDefault();
                StatesHandler.goToLogin();
            }
        };

    }]);
;/**
 * Authentication service interceptor used to listen to server responses.
 */
angular
    .module("account")
    .factory("AuthInterceptor", ["$rootScope", "$q", "SessionService", "AUTH_EVENTS", function ($rootScope, $q, SessionService, AUTH_EVENTS) {

        return {

            /**
             * Response error interceptor.
             *
             * @param response
             * @returns {Promise}
             */
            responseError: function (response) {
                if ( response.status === 401 ) {
                    $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated, response);
                }
                if ( response.status === 403 ) {
                    $rootScope.$broadcast(AUTH_EVENTS.notAuthorized, response);
                }
                if ( response.status === 419 || response.status === 440 ) {
                    $rootScope.$broadcast(AUTH_EVENTS.sessionTimeout, response);
                }

                return $q.reject(response);
            }
        };

    }]);
;/**
 * Profile form toggle responsible to keep the state of the current displayed update profile form.
 */
angular
    .module("account")
    .service("ProfileFormToggle", ["ACCOUNT_FORM_STATE", function (ACCOUNT_FORM_STATE) {
        this.state = ACCOUNT_FORM_STATE.updateProfile;

        this.setState = function (state) {
            this.state = state;
        };
    }]);



;angular
    .module("account")
    .service("UserService", ["$http", "$q", "USER_URLS", function ($http, $q, USER_URLS) {

        /**
         * The list of already verified email addresses.
         *
         * @type {{}}
         */
        this.uniqueEmailCache = {};

        /**
         * Check if an email address is unique.
         *
         * @param email
         * @returns {*}
         */
        this.isUnique = function (email) {
            // Create deferred
            var deferred = $q.defer();

            if ( !_.isUndefined(this.uniqueEmailCache[email]) ) {

                // Use the value from cache
                deferred.resolve({
                    isUnique: this.uniqueEmailCache[email],
                    email: email
                });
            } else {
                $http
                    .get(URLTo.api(USER_URLS.userUnique), {params: {email: email}})
                    .then(_.bind(function (response) {
                        this.uniqueEmailCache[email] = response.data.isUnique;
                        deferred.resolve({
                            isUnique: true,
                            email: email
                        });
                    }, this))
                    .catch(function (response) {
                        deferred.resolve({
                            isUnique: _.isEmpty(response.data.errors),
                            email: email
                        });
                    });
            }

            return deferred.promise;
        };

        /**
         * Reset the unique email cache.
         */
        this.resetUniqueEmailCache = function () {
            this.uniqueEmailCache = {};
        };
    }]);
;angular
    .module("account")
    .factory("User", ["SessionService", "$q", "$http", "AUTH_URLS", function (SessionService, $q, $http, AUTH_URLS) {
        return {

            $new: function () {

                return {

                    /**
                     * User model (DTO)
                     */
                    model: {
                        userId: "",
                        firstName: "",
                        lastName: "",
                        email: "",
                        password: "",
                        timezone: ""
                    },

                    /**
                     * Loads a user from cookies.
                     * @returns {*}
                     */
                    loadFromSession: function () {
                        this.setSelectiveKey(this.model, SessionService.getData() || {});

                        return this;
                    },

                    /**
                     * Saves a user to cookies.
                     * @returns {*}
                     */
                    saveToSession: function () {
                        var sessionData = {};
                        this.setSelectiveKey(sessionData, this, ["password"]);
                        SessionService.setData(sessionData);

                        return this;
                    },

                    /**
                     * Updates a user account.
                     * @returns {*}
                     */
                    $save: function (fromData) {
                        var toBeSaved = {};
                        this.setSelectiveKey(toBeSaved, fromData);

                        return this.updateAccount(toBeSaved);
                    },

                    /**
                     * Creates a user account with given fromData.
                     * @param fromData
                     * @returns {*}
                     */
                    $create: function (fromData) {
                        var toBeCreated = {};
                        this.setSelectiveKey(toBeCreated, fromData);

                        return this.createAccount(toBeCreated);
                    },

                    $refresh: function () {
                        var that = this;

                        return this
                            .retrieveDetails()
                            .then(function (response) {
                                that.setSelectiveKey(that, response.data);
                                that.saveToSession();

                                return response;
                            })
                            .catch(function (response) {
                                return $q.reject(response);
                            });
                    },

                    /**
                     * Retrieves details about the current account.
                     * @returns {*}
                     */
                    retrieveDetails: function () {
                        return $http.get(URLTo.api(AUTH_URLS.details));
                    },

                    /**
                     * Creates the account.
                     * @param account
                     * @returns {*}
                     */
                    createAccount: function (account) {
                        return $http.post(URLTo.api(AUTH_URLS.create), account);
                    },

                    /**
                     * Updates given account.
                     * @param account
                     * @returns {*}
                     */
                    updateAccount: function (account) {
                        return $http.post(URLTo.api(AUTH_URLS.update), account);
                    },

                    /**
                     * Sets selective keys on a target object from a source object.
                     * @param targetObject
                     * @param sourceObject
                     * @param skipKeys
                     */
                    setSelectiveKey: function (targetObject, sourceObject, skipKeys) {
                        _.each(_.keys(this.model), function (key) {
                            if ( !(skipKeys && _.contains(skipKeys, key)) ) {
                                targetObject[key] = sourceObject[key];
                            }
                        });
                    }

                }
            }

        }
    }]);;/**
 * Main site module declaration including ui templates.
 */
angular
    .module("site", [
        "ngAnimate",
        "ui.router",
        "ui.bootstrap.bindHtml",
        "account"
    ])
    .config(["$stateProvider", function ($stateProvider) {

        // Home
        $stateProvider

            // Home page
            .state("home", {
                url: "/",
                templateUrl: "app/site/partials/home.html",
                controller: "HomeCtrl",
                title: "Home",
                resolve: {
                    helloMessage: function () {
                        return {
                            message: 'I am home!'
                        };
                    }
                }
            })
    }]);
;/**
 * Home controller.
 */
angular
    .module("site")
    .controller("HomeCtrl", ["$scope", "helloMessage", function ($scope, helloMessage) {
        $scope.helloMessage = helloMessage;
    }]);;/**
 * Main site module declaration including ui templates.
 */
angular
    .module("reminders", [
        "ui.router",
        "ui.bootstrap.transition",
        "ui.bootstrap.datepicker",
        "ui.bootstrap.dropdown",
        "ui.bootstrap.tooltip",
        "ui.bootstrap.popover",
        "ui.bootstrap.modal",
        "common",
        "feedback"
    ])
    .config(["$stateProvider", function ($stateProvider) {

        $stateProvider

            .state("reminders", {
                url: "/reminders",
                views: {

                    '': { templateUrl: 'app/reminders/partials/reminder/reminders.html' },

                    'create@reminders': {
                        templateUrl: "app/reminders/partials/reminder/reminders.create.html",
                        controller: "ReminderCtrl"
                    },

                    'list@reminders': {
                        templateUrl: "app/reminders/partials/reminder/reminders.list.html",
                        controller: "ReminderListCtrl",
                        resolve: {
                            reminderList: ["$q", "ReminderService", function ($q, ReminderService) {
                                var deferred = $q.defer();
                                ReminderService
                                    .getAllReminders()
                                    .then(function (response) {
                                        deferred.resolve(response);
                                    }).catch(function () {
                                        deferred.resolve([]);
                                    });

                                return deferred.promise;
                            }]
                        }
                    }
                }
            });
    }]);
;/**
 * Reminders constants.
 */
angular
    .module("reminders")
    .constant("REMINDER_URLS", {
        create: "reminders",
        update: "reminders/:reminderId",
        details: "reminders/:reminderId",
        delete: "reminders/:reminderId",
        allReminders: "reminders",
        pastReminders: "reminders/past?:local_time&:local_time_zone",
        upcomingReminders: "reminders/upcoming?:local_time&:local_time_zone"
    })
    .constant("REMINDER_EVENTS", {
        isCreated: "reminder-is-created",
        isDeleted: "reminder-is-deleted",
        isUpdated: "reminder-is-updated"
    });;angular
    .module("reminders")
    .controller("ReminderCtrl", ["$scope", "ReminderModalService", function ($scope, ReminderModalService) {

        $scope.cancel = function () {
            ReminderModalService.modalInstance.dismiss("cancel");
            $scope.isOpen = false;
        };

        $scope.openReminderModalService = function () {
            ReminderModalService.open();
        };
    }]);
;angular
    .module("reminders")
    .controller("ReminderDeleteModalCtrl", ["$scope", "$rootScope", "$stateParams", "$window", "$", "URLTo", "ReminderDeleteModalService", "reminder", "$timeout", "StatesHandler", "REMINDER_EVENTS", function ($scope, $rootScope, $stateParams, $window, $, URLTo, ReminderDeleteModalService, reminder, $timeout, StatesHandler, REMINDER_EVENTS) {

        /**
         * Reminder to be created (injected with few default values)
         */
        $scope.reminder = reminder;

        /**
         * Flag which represents whether
         * @type {boolean}
         */
        $scope.isDeleting = false;

        // Focus the first input when modal is opened
        ReminderDeleteModalService.modalInstance
            .opened
            .then(function () {
                $scope.isOpen = true;
            }
        );

        // Remove the reminder
        $scope.deleteReminderAndClose = function () {
            if ( !$scope.isDeleting ) {

                // Is deleting reminder
                $scope.isDeleting = true;

                // Destroy reminder
                $scope.reminder.destroy()
                    .then(function (reminderAsResponse) {

                        // Wait 2 seconds, and close the modal
                        $timeout(function () {
                            ReminderDeleteModalService.modalInstance.close();
                        }, 1000);

                        $timeout(function () {
                            $rootScope.$broadcast(REMINDER_EVENTS.isDeleted, {
                                reminder: $scope.reminder.model,
                                message: 'Reminder successfully deleted!'
                            });
                        }, 1500);
                    })
                    .catch(function () {

                        // Error
                        $scope.isDeleting = false;
                        alert("Something went wrong. Please try again.");
                    });
            }
        };
    }]);
;/**
 * Reminders controller.
 */
angular
    .module("reminders")
    .controller("ReminderListCtrl", ["$scope", "reminderList", "ReminderDeleteModalService", "ReminderUpdateModalService", "REMINDER_EVENTS", "$log", "flash", function ($scope, reminderList, ReminderDeleteModalService, ReminderUpdateModalService, REMINDER_EVENTS, $log, flash) {
        $scope.reminderList = reminderList;

        $scope.cancel = function () {
            ReminderDeleteModalService.modalInstance.dismiss("cancel");
            ReminderDeleteModalService.modalInstance.dismiss("cancel");
            $scope.isOpen = false;
        };

        /**
         * Open DELETE modal
         * @param reminder
         */
        $scope.openDeleteReminderModalService = function (reminder) {
            ReminderDeleteModalService.open(reminder.reminderId);
        };

        /**
         * Open UPDATE modal
         * @param reminder
         */
        $scope.openUpdateReminderModalService = function (reminder) {
            ReminderUpdateModalService.open(reminder.reminderId);
        };

        /**
         * On reminder created, display a success message, and add reminder to the list.
         */
        $scope.$on(REMINDER_EVENTS.isCreated, function (event, args) {
            flash.success = args.message;

            $scope.reminderList.push(args.reminder);
        });

        /**
         * On reminder updated, simply display the message.
         */
        $scope.$on(REMINDER_EVENTS.isUpdated, function (event, args) {
            flash.success = args.message;

            removeReminderFrom($scope.reminderList, args.reminder);
            $scope.reminderList.push(args.reminder);
        });

        /**
         * On reminder deleted, display a success message, and remove the reminder from the list.
         */
        $scope.$on(REMINDER_EVENTS.isDeleted, function (event, args) {
            flash.success = args.message;

            removeReminderFrom($scope.reminderList, args.reminder);
        });

        /**
         * Removes given reminder from the list.
         * @param reminderList
         * @param reminderToBeRemoved
         */
        function removeReminderFrom(reminderList, reminderToBeRemoved) {
            _.remove(reminderList, function (reminderFromArray) {
                var reminderId = _.parseInt(reminderToBeRemoved.reminderId, 10);
                var reminderFromArrayId = _.parseInt(reminderFromArray.reminderId, 10);
                if ( _.isNaN(reminderFromArrayId) || _.isNaN(reminderId) ) {
                    return false;
                }

                return reminderFromArrayId === reminderId;
            });
        }
    }]);;angular
    .module("reminders")
    .controller("ReminderModalCtrl", ["$scope", "$rootScope", "$stateParams", "$window", "$", "URLTo", "ReminderModalService", "ReminderUpdateModalService", "reminder", "$timeout", "StatesHandler", "REMINDER_EVENTS", function ($scope, $rootScope, $stateParams, $window, $, URLTo, ReminderModalService, ReminderUpdateModalService, reminder, $timeout, StatesHandler, REMINDER_EVENTS) {

        /**
         * Reminder to be created (injected with few default values)
         */
        $scope.reminder = reminder;

        /**
         * Flag which says whether reminder is new or not.
         */
        $scope.isNew = $scope.reminder.isNew();

        /**
         * Flag which represents whether
         * @type {boolean}
         */
        $scope.isSaving = false;

        /**
         * Reminder examples pool
         * @type {string[]}
         */
        var reminderExamples = [
            "Pay rent @tomorrow at 3pm",
            "Josh's birthday party @next Friday at 18:00",
            "Christmas gifts @dec 20 at 3pm",
            "Send email to Rachel @in 4 hours",
            "Team meeting @10am",
            "My brother's wedding next month @June 22"
        ];

        /**
         * Random reminder example
         * @type {string}
         */
        $scope.randomExample = reminderExamples[Math.floor((Math.random() * reminderExamples.length))];

        // Save the reminder
        $scope.saveReminder = function (reminderForm) {
            if ( reminderForm.$valid && !$scope.isSaving ) {

                // Is saving reminder
                $scope.isSaving = true;

                $scope.reminder.save()
                    .then(function (reminderAsResponse) {
                        $timeout(function () {
                            if ( $scope.isNew ) {
                                ReminderModalService.modalInstance.close();
                            }
                            else {
                                ReminderUpdateModalService.modalInstance.close();
                            }

                            $rootScope.$broadcast($scope.isNew ? REMINDER_EVENTS.isCreated : REMINDER_EVENTS.isUpdated, {
                                reminder: reminderAsResponse,
                                message: 'Reminder successfully saved!'
                            });
                        }, 500);
                    })
                    .catch(function () {

                        // Error
                        $scope.isSaving = false;
                        alert("Something went wrong. Please try again.");
                    });
            }
        };
    }]);
;/* Saved reminder controller */

angular
    .module("reminders")
    .controller("ReminderSavedCtrl", ["$rootScope", "$scope", "$state", "FeedbackModal", "reminder", function ($rootScope, $scope, $state, FeedbackModal, reminder) {

        $rootScope.$state = $state;
        $scope.reminder = reminder;

        // Open feedback modal
        $scope.openFeedbackModal = function () {
            FeedbackModal.open();
        };

    }]);
;/* Feedback modal */

angular
    .module("reminders")
    .service("ReminderDeleteModalService", ["$modal", function ($modal) {

        // Init modal instance
        this.modalInstance = null;

        // Init the feedback modal window
        this.open = function (reminderId) {

            // Create modal instance
            this.modalInstance = $modal.open({
                templateUrl: "app/reminders/partials/reminderModal/reminderDeleteModal.html",
                controller: "ReminderDeleteModalCtrl",
                windowClass: "modal-feedback",
                resolve: {
                    reminder: ["Reminder", function (Reminder) {
                        return new Reminder.build({}).fetch(reminderId);
                    }]
                }
            });
        };

    }]);
;/* Feedback modal */

angular
    .module("reminders")
    .service("ReminderModalService", ["$modal", function ($modal) {

        // Init modal instance
        this.modalInstance = null;

        // Init the feedback modal window
        this.open = function () {

            // Create modal instance
            this.modalInstance = $modal.open({
                templateUrl: "app/reminders/partials/reminderModal/reminderModal.html",
                controller: "ReminderModalCtrl",
                windowClass: "modal-feedback",
                resolve: {
                    reminder: ["$window", "Reminder", "jstz", function ($window, Reminder, jstz) {
                        // Make the reminder due the next hour
                        var defaultDueOn = Date.create().addHours(1).set({minute: 0, second: 0});

                        return new Reminder.build({
                            text: "",
                            dueOn: defaultDueOn,
                            timezone: jstz.determine().name(),
                            additionalAddresses: []
                        });
                    }]
                }
            });
        };

    }]);
;/**
 * Reminders service which encapsulates the whole logic related to reminders.
 */
angular
    .module("reminders")
    .service("ReminderService", ["$rootScope", "$q", "$http", "$cookies", "SessionService", "AUTH_EVENTS", "REMINDER_URLS", function ($rootScope, $q, $http, $cookies, SessionService, AUTH_EVENTS, REMINDER_URLS) {

        /**
         * Update a reminder.
         * @param reminderToBeCreated
         * @returns {*}
         */
        this.createReminder = function (reminderToBeCreated) {
            return $http
                .post(URLTo.api(REMINDER_URLS.create), reminderToBeCreated)
                .then(function (response) {
                    return response.data;
                });
        };

        /**
         * Update a reminder.
         * @param reminderToBeUpdated
         * @returns {*}
         */
        this.updateReminder = function (reminderToBeUpdated) {
            return $http
                .put(URLTo.api(REMINDER_URLS.update, {":reminderId": reminderToBeUpdated.reminderId}), reminderToBeUpdated)
                .then(function (response) {
                    return response.data;
                });
        };

        /**
         * Delete a reminder.
         * @param reminderToBeDeleted
         * @returns {*}
         */
        this.deleteReminder = function (reminderToBeDeleted) {
            return $http
                .delete(URLTo.api(REMINDER_URLS.delete, {":reminderId": reminderToBeDeleted.reminderId}), reminderToBeDeleted)
                .then(function (response) {
                    return response.data;
                });
        };

        /**
         * Get all reminders of current user
         * @returns {*}
         */
        this.getAllReminders = function () {
            return $http
                .get(URLTo.api(REMINDER_URLS.allReminders))
                .then(function (response) {
                    return response.data;
                }).catch(function (response) {
                    return $q.reject(response);
                });
        };

        /**
         * Get details of a reminder.
         * @param reminderId
         * @returns {*}
         */
        this.getDetails = function (reminderId) {
            return $http
                .get(URLTo.api(REMINDER_URLS.details, {":reminderId": reminderId}))
                .then(function (response) {
                    return response.data;
                });
        };
    }]);
;/* Feedback modal */

angular
    .module("reminders")
    .service("ReminderUpdateModalService", ["$modal", function ($modal) {

        // Init modal instance
        this.modalInstance = null;

        // Init the feedback modal window
        this.open = function (reminderId) {

            // Create modal instance
            this.modalInstance = $modal.open({
                templateUrl: "app/reminders/partials/reminderModal/reminderModal.html",
                controller: "ReminderModalCtrl",
                windowClass: "modal-feedback",
                resolve: {
                    reminder: ["Reminder", function (Reminder) {
                        return new Reminder.build({}).fetch(reminderId);
                    }]
                }
            });
        };

    }]);
;angular
    .module("reminders")
    .factory("Reminder", ["$q", "$http", "ReminderService", function ($q, $http, ReminderService) {
        return {

            build: function (loadFromModel) {

                var newReminder = {

                    /**
                     * Reminder model (DTO)
                     */
                    model: {
                        reminderId: "",
                        text: "",
                        dueOn: "",
                        timezone: "",
                        additionalAddresses: [],
                        createdBy: "",
                        sent: "",
                        createdAt: "",
                        updatedAt: ""
                    },

                    isNew: function () {
                        return this.model.reminderId === undefined;
                    },

                    save: function (fromData) {
                        var toBeSaved = {};
                        this.copyKeysFromTo(fromData || this.model, toBeSaved);
                        toBeSaved["dueOn"] = toBeSaved["dueOn"].format("{yyyy}-{MM}-{dd} {HH}:{mm}:{ss}");
                        toBeSaved["additionalAddresses"] = toBeSaved["additionalAddresses"].join(",");

                        return this.isNew() ? ReminderService.createReminder(toBeSaved) : ReminderService.updateReminder(toBeSaved);
                    },

                    fetch: function (reminderId) {
                        var that = this;
                        var deferred = $q.defer();

                        ReminderService
                            .getDetails(reminderId || that.model.reminderId)
                            .then(function (response) {
                                that.parseFromTo(response, that);

                                deferred.resolve(that);
                                return response;
                            })
                            .catch(function (response) {
                                return $q.reject(response);
                            });

                        return deferred.promise;
                    },

                    destroy: function () {
                        return ReminderService.deleteReminder(this.model);
                    },

                    copyKeysFromTo: function (sourceObject, targetObject, skipKeys) {
                        _.each(_.keys(this.model), function (key) {
                            if ( !(skipKeys && _.contains(skipKeys, key)) ) {
                                targetObject[key] = sourceObject[key];
                            }
                        });
                    },

                    parseFromTo: function (sourceObject, targetObject) {
                        targetObject.copyKeysFromTo(sourceObject, targetObject.model);
                        targetObject.model["dueOn"] = moment(targetObject.model["dueOn"]).toDate();
                        var additionAddresses = targetObject.model["additionalAddresses"];
                        if ( additionAddresses === "" ) {
                            targetObject.model["additionalAddresses"] = [];
                        }
                        else {
                            targetObject.model["additionalAddresses"] = _.values(additionAddresses.split(","));
                        }
                    },

                    loadFrom: function (loadFromModel) {
                        this.copyKeysFromTo(loadFromModel, this.model);

                        return this;
                    }

                };

                return newReminder.loadFrom(loadFromModel || {});
            }

        }
    }]);;angular
    .module("feedback", [
    ]);;/* Feedback modal controller */

angular
    .module("feedback")
    .controller("FeedbackModalCtrl", ["$scope", "$timeout", "FeedbackModal", "FeedbackMessage", function ($scope, $timeout, FeedbackModal, FeedbackMessage) {

        $scope.isSending = false;
        $scope.isSent = false;
        $scope.feedbackMessage = new FeedbackMessage();

        // Focus the first input when modal is opened
        FeedbackModal.modalInstance.opened.then($.proxy(function () {
            $scope.isOpen = true;
        }, this));

        // Send the feedback message, and close the modal
        $scope.sendAndClose = function (feedbackForm) {
            if ( feedbackForm.$valid && !$scope.isSending ) {

                // Form is valid, send the message
                $scope.isSending = true;
                $scope.feedbackMessage.send().

                    then(function () {
                        $scope.isSent = true;

                        // Wait 2 seconds, and close the modal
                        $timeout(function () {
                            FeedbackModal.modalInstance.close();
                        }, 2500);
                    }).

                    finally(function () {
                        $scope.isSending = false;
                        $scope.isOpen = false;
                    });
            }
            else {
                // Form is invalid
                feedbackForm.submitted = true;
            }
        };

        $scope.cancel = function () {
            FeedbackModal.modalInstance.dismiss("cancel");
            $scope.isOpen = false;
        };
    }]);
;/* Feedback message */

angular
    .module("feedback")
    .factory("FeedbackMessage", ["$http", "$q", "URLTo", function ($http, $q, URLTo) {

        function FeedbackMessage() {

            // The url root to API urls
            this.urlRoot = "feedback";

            // Setup
            this.attributes = {};

            // Send the message
            this.send = function () {

                // Create deferred
                var deferred = $q.defer();

                $http({method: "POST", url: URLTo.api(this.urlRoot), data: this.attributes}).

                    success(function () {

                        // Resolve the deferred
                        deferred.resolve();
                    }).

                    error(function (data) {

                        // Reject the deferred with error data
                        deferred.reject(data);
                    });

                // Return the promise
                return deferred.promise;
            };
        }

        return FeedbackMessage;

    }]);
;/* Feedback modal */

angular
    .module("feedback")
    .service("FeedbackModal", ["$modal", function ($modal) {

        // Init modal instance
        this.modalInstance = null;

        // Init the feedback modal window
        this.open = function () {

            // Create modal instance
            this.modalInstance = $modal.open({
                templateUrl: "app/feedback/partials/feedbackModal/feedbackModal.html",
                controller: "FeedbackModalCtrl",
                windowClass: "modal-feedback"
            });
        };

    }]);
;/**
 * Main app module declaration.
 */
angular
    .module("app", [
        "ngAnimate",
        "ngMessages",
        "ui.router",
        "angular-flash.service",
        "angular-flash.flash-alert-directive",
        "ngCookies",
        "partials",
        "site",
        "common",
        "feedback",
        "reminders",
        "account"
    ])
    .config(["$locationProvider", "flashProvider", function ($locationProvider, flashProvider) {

        // Enable html5 mode
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });

        // Support bootstrap 3.0 "alert-danger" class with error flash types
        flashProvider.successClassnames.push('alert-reme');
        flashProvider.errorClassnames.push('alert-reme');
        flashProvider.infoClassnames.push('alert-reme');
        flashProvider.warnClassnames.push('alert-reme');
    }])
    .run(function () {

        // Set the base API URL
        URLTo.apiBase("http://beta-api.reme.io");
    });;/**
 * Main app controller declaration.
 */
angular
    .module("app")
    .controller("AppCtrl", ["AUTH_EVENTS", "$rootScope", "$scope", "$state", "$log", "AuthService", "User", "StatesHandler", function (AUTH_EVENTS, $rootScope, $scope, $state, $log, AuthService, User, StatesHandler) {

        /**
         * Save the state on root scope
         */
        $rootScope.$state = $state;

        /**
         * On app load, retrieve user profile previously saved (if exists).
         */
        $rootScope.currentUser = User.$new().loadFromSession();
        $log.log("Current user: ", $rootScope.currentUser);

        /**
         * Listen to login success event. If user is properly logged in,
         * then retrieve its profile this from cookie used for persistence.
         */
        $scope.$on(AUTH_EVENTS.loginSuccess, function () {
            $rootScope.currentUser = User.$new().loadFromSession();
            $log.log("Logged in: ", $rootScope.currentUser);
        });

        // Listen to the session timeout event
        $scope.$on(AUTH_EVENTS.sessionTimeout, function () {
            $log.log("Session timed out.");
            AuthService.logout();
        });

        // Listen to the not authenticated event
        $scope.$on(AUTH_EVENTS.notAuthenticated, function () {
            $log.log("Not authenticated.");
            AuthService.logout();
        });

        // Listen to the logout event
        $scope.$on(AUTH_EVENTS.logoutSuccess, function () {
            $rootScope.currentUser = User.$new();
            $log.log("Logged out.");
        });
    }]);
;angular.module('partials', ['app/site/partials/home.html', 'app/reminders/partials/privacy.html', 'app/reminders/partials/reminder/reminder.edit.html', 'app/reminders/partials/reminder/reminders.create.html', 'app/reminders/partials/reminder/reminders.html', 'app/reminders/partials/reminder/reminders.list.html', 'app/reminders/partials/reminderModal/reminderDeleteModal.html', 'app/reminders/partials/reminderModal/reminderModal.html', 'app/feedback/partials/feedbackModal/feedbackModal.html', 'app/account/partials/account.html', 'app/account/partials/logout.html', 'app/account/partials/profile.html', 'app/account/partials/validate_password_reset_token.html', 'app/common/partials/emailList/emailList.html', 'app/common/partials/header.html', 'app/common/partials/timepickerPopup/timepickerPopup.html', 'template/datepicker/datepicker.html', 'template/datepicker/popup.html', 'template/modal/backdrop.html', 'template/modal/window.html', 'template/popover/popover.html', 'template/tooltip/tooltip-html-unsafe-popup.html', 'template/tooltip/tooltip-popup.html']);

angular.module("app/site/partials/home.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/site/partials/home.html",
    "<div header>Welcome!</div>\n" +
    "");
}]);

angular.module("app/reminders/partials/privacy.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/reminders/partials/privacy.html",
    "<div class=\"privacy-container\">\n" +
    "\n" +
    "    <h1>Terms and Privacy Policy</h1>\n" +
    "\n" +
    "    <div>\n" +
    "        <section>\n" +
    "            <h3>General Terms</h3>\n" +
    "            <ul>\n" +
    "                <li>\n" +
    "                    Reme.IO is a tool created in the sole purpose of helping people get organized by creating\n" +
    "                    reminders which will be sent to the provided e-mail address(es) at a specific date and time.\n" +
    "                    Reme.IO is not responsible for the content entered by the user.\n" +
    "                </li>\n" +
    "                <li>\n" +
    "                    Reme.IO uses e-mail as the only notification method. Reme.IO is not responsible for missed\n" +
    "                    dead-lines, appointments or other time-critical events.\n" +
    "                </li>\n" +
    "            </ul>\n" +
    "        </section>\n" +
    "\n" +
    "        <section>\n" +
    "            <h3>Privacy Policy</h3>\n" +
    "            <ul>\n" +
    "                <li>\n" +
    "                    The information Reme.IO stores is the subject of the reminder and the e-mail address(es)\n" +
    "                    the user enters for the reminder recipient.\n" +
    "                </li>\n" +
    "                <li>\n" +
    "                    We use local storage to save reminder related data for better user-experience. We do not\n" +
    "                    collect anonymous data of any kind.\n" +
    "                </li>\n" +
    "                <li>\n" +
    "                    The only e-mail Reme.IO will send to the provided address(es) will be the reminder which\n" +
    "                    the user creates.\n" +
    "                </li>\n" +
    "                <li>\n" +
    "                    We will not use your e-mail address to send any newsletters, advertising or any other kind\n" +
    "                    of spam.\n" +
    "                </li>\n" +
    "                <li>\n" +
    "                    We will not share your e-mail address with 3rd party entities.\n" +
    "                </li>\n" +
    "            </ul>\n" +
    "        </section>\n" +
    "\n" +
    "        <section>\n" +
    "            <div>\n" +
    "                Please feel free to contact us at <a href=\"mailto:hello@reme.io\">hello@reme.io</a> for any\n" +
    "                questions or concerns you may have regarding the privacy policy.\n" +
    "            </div>\n" +
    "        </section>\n" +
    "    </div>\n" +
    "</div>\n" +
    "\n" +
    "");
}]);

angular.module("app/reminders/partials/reminder/reminder.edit.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/reminders/partials/reminder/reminder.edit.html",
    "<div class=\"screen\">\n" +
    "    <div class=\"reminder-saved-container\">\n" +
    "        <span class=\"text-muted\">Here's your reminder:</span>\n" +
    "\n" +
    "        <div class=\"reminder-summary container container-small box\">\n" +
    "            <a ui-sref=\"update.form({secureId: reminder.attributes.secure_id})\">Edit</a>\n" +
    "            <span class=\"bg-sprite icon-saved\"></span>\n" +
    "            <div class=\"text\">{{reminder.attributes.text}}</div>\n" +
    "            <div class=\"date\">{{reminder.attributes.due_on.format(\"{Weekday}, {d} {Month} {yyyy} at {hh}:{mm} {tt}\")}}</div>\n" +
    "            <div class=\"recipient\">{{reminder.attributes.created_by}}</div>\n" +
    "            <div class=\"recipient\" ng-repeat=\"addressee in reminder.attr('additional_addressees') track by $index\">\n" +
    "                {{addressee}}\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("app/reminders/partials/reminder/reminders.create.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/reminders/partials/reminder/reminders.create.html",
    "<div class=\"reminders__header\">\n" +
    "    <a class=\"btn-outline reminders__header__btn\" href=\"#\" ng-click=\"openReminderModalService()\">Create reminder</a>\n" +
    "</div>");
}]);

angular.module("app/reminders/partials/reminder/reminders.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/reminders/partials/reminder/reminders.html",
    "<div header></div>\n" +
    "\n" +
    "<div ui-view=\"create\"></div>\n" +
    "\n" +
    "<div ui-view=\"list\"></div>");
}]);

angular.module("app/reminders/partials/reminder/reminders.list.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/reminders/partials/reminder/reminders.list.html",
    "<div class=\"centered-global-width\">\n" +
    "\n" +
    "    <!-- Subscribe to success flash messages. -->\n" +
    "    <div flash-alert=\"success\" active-class=\"in\" class=\"alert fade\">\n" +
    "        <strong class=\"alert-heading\">Congrats!</strong>\n" +
    "        <span class=\"alert-message\">{{flash.message}}</span>\n" +
    "    </div>\n" +
    "\n" +
    "    <!--Reminder list is empty-->\n" +
    "    <span ng-if=\"reminderList.length === 0\">You don't have any reminders defined.</span>\n" +
    "\n" +
    "    <!--Reminder list-->\n" +
    "    <div class=\"reminder\" ng-repeat=\"reminder in reminderList | orderObjectBy : 'dueOn' : true\">\n" +
    "        <div class=\"reminder__title\">\n" +
    "            {{reminder.text}}\n" +
    "        </div>\n" +
    "        <div class=\"reminder__info\">\n" +
    "            <div class=\"reminder__info__item reminder__info__item--date\">\n" +
    "                <span class=\"icon-calendar\"></span>\n" +
    "                {{reminder.dueOn | friendlyDate}}\n" +
    "            </div>\n" +
    "            <div class=\"reminder__info__item reminder__info__item--recurring\">\n" +
    "                <span class=\"icon-recurring\"></span>\n" +
    "                Every week on Monday\n" +
    "            </div>\n" +
    "            <div class=\"reminder__info__item reminder__info__item--time\">\n" +
    "                <span class=\"icon-clock\"></span>\n" +
    "                {{reminder.dueOn | friendlyHour}}\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"reminder__menu\">\n" +
    "            <a class=\"reminder__menu__option\" href=\"#\" ng-click=\"openUpdateReminderModalService(reminder)\"><span class=\"icon-pencil\"></span></a>\n" +
    "            <a class=\"reminder__menu__option reminder__menu__option--complete\" href=\"#\"><span class=\"icon-checkmark\"></span></a>\n" +
    "            <a class=\"reminder__menu__option\" href=\"#\" ng-click=\"openDeleteReminderModalService(reminder)\"><span class=\"icon-trash\"></span></a>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "</div>");
}]);

angular.module("app/reminders/partials/reminderModal/reminderDeleteModal.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/reminders/partials/reminderModal/reminderDeleteModal.html",
    "<!--Reminder form-->\n" +
    "<div ng-show=\"! isDeleting\" class=\"reminder-form-container\">\n" +
    "\n" +
    "    <div class=\"reminder-form container box\">\n" +
    "        Are you sure you want to delete reminder with text <strong>{{reminder.model.text}}</strong> and with reminder id <strong>{{reminder.model.reminderId}}</strong>?\n" +
    "        <br />\n" +
    "        <a href=\"#\" class=\"btn-outline reminders__header__btn\" ng-click=\"deleteReminderAndClose(reminder)\">Delete reminder</a>\n" +
    "    </div>\n" +
    "\n" +
    "</div>\n" +
    "\n" +
    "<!--While saving-->\n" +
    "<div class=\"reminder-saving\" ng-show=\"isDeleting\">Deleting reminder..</div>");
}]);

angular.module("app/reminders/partials/reminderModal/reminderModal.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/reminders/partials/reminderModal/reminderModal.html",
    "<!--Reminder form-->\n" +
    "<div ng-show=\"! isSaving\" class=\"reminder-form-container\">\n" +
    "    <form class=\"reminder-form container box\" name=\"reminderForm\" ng-submit=\"saveReminder(reminderForm)\" novalidate focus-first-error>\n" +
    "\n" +
    "        <!--Reminder text-->\n" +
    "        <div class=\"form-group text\" ng-class=\"{'has-error': reminderForm.text.$invalid && reminderForm.$submitted}\">\n" +
    "            <label>Remind me to:</label>\n" +
    "            <input class=\"form-control input-lg\" type=\"text\" placeholder=\"e.g. {{randomExample}}\" name=\"text\" maxlength=\"140\" ng-model=\"reminder.model.text\" nlp-date date=\"reminder.model.dueOn\" separator=\"@\" min-date=\"2014-01-01\" max-date=\"2018-01-01\" prefer=\"future\" auto-focus required />\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"date-and-time clearfix\">\n" +
    "            <!--Reminder date picker-->\n" +
    "            <div class=\"date\">\n" +
    "                <button type=\"button\" class=\"btn btn-default bg-sprite\" datepicker-popup ng-model=\"reminder.model.dueOn\" show-weeks=\"false\" datepicker-options=\"{starting_day:1}\" animate animate-on=\"nlpDate:dateChange\" animate-class=\"animated highlight-button\">\n" +
    "                    {{reminder.model.dueOn | friendlyDate}}\n" +
    "                </button>\n" +
    "            </div>\n" +
    "\n" +
    "            <!--Reminder time picker-->\n" +
    "            <div class=\"time\" timepicker-popup dropdown ng-model=\"reminder.model.dueOn\" step=\"30\"></div>\n" +
    "        </div>\n" +
    "\n" +
    "        <!--Reminder addresses-->\n" +
    "        <div class=\"addressees\">\n" +
    "            <div class=\"form-group\">\n" +
    "                <div class=\"form-control bg-sprite\">{{currentUser.model.email}}</div>\n" +
    "            </div>\n" +
    "\n" +
    "            <div email-list ng-model=\"reminder.model.additionalAddresses\" max-emails=\"5\" parent-form=\"reminderForm\"></div>\n" +
    "        </div>\n" +
    "\n" +
    "        <!--Submit form button-->\n" +
    "        <button type=\"submit\" class=\"btn btn-primary btn-lg btn-create\">{{isNew ? \"Create reminder\" : \"Update reminder\"}}</button>\n" +
    "\n" +
    "    </form>\n" +
    "</div>\n" +
    "\n" +
    "<!--While saving-->\n" +
    "<div class=\"reminder-saving\" ng-show=\"isSaving\">{{isNew ? \"Saving reminder\" : \"Updating reminder\"}}</div>");
}]);

angular.module("app/feedback/partials/feedbackModal/feedbackModal.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/feedback/partials/feedbackModal/feedbackModal.html",
    "<form name=\"feedbackForm\" ng-submit=\"sendAndClose(feedbackForm)\" novalidate focus-first-error>\n" +
    "\n" +
    "    <div class=\"modal-header\">\n" +
    "        <h3>Feedback</h3>\n" +
    "    </div>\n" +
    "\n" +
    "\n" +
    "    <div class=\"modal-body\" ng-if=\"! isSending && ! isSent\">\n" +
    "        <div class=\"form-group\" ng-class=\"{'has-error': feedbackForm.name.$invalid && feedbackForm.submitted}\">\n" +
    "            <input class=\"form-control\" type=\"text\" name=\"name\" ng-model=\"feedbackMessage.attributes.name\" placeholder=\"Your name\" required auto-focus=\"isOpen\" />\n" +
    "        </div>\n" +
    "        <div class=\"form-group\" ng-class=\"{'has-error': feedbackForm.email.$invalid && feedbackForm.submitted}\">\n" +
    "            <input class=\"form-control\" type=\"email\" name=\"email\" ng-model=\"feedbackMessage.attributes.email\" placeholder=\"Your email address\" required />\n" +
    "        </div>\n" +
    "        <div class=\"form-group\" ng-class=\"{'has-error': feedbackForm.subject.$invalid && feedbackForm.submitted}\">\n" +
    "            <input class=\"form-control\" type=\"text\" name=\"subject\" ng-model=\"feedbackMessage.attributes.subject\" placeholder=\"Subject\" required />\n" +
    "        </div>\n" +
    "        <div class=\"form-group\" ng-class=\"{'has-error': feedbackForm.message.$invalid && feedbackForm.submitted}\">\n" +
    "            <textarea class=\"form-control\" rows=\"6\" name=\"message\" ng-model=\"feedbackMessage.attributes.message\" placeholder=\"Your message\" required></textarea>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"modal-body\" ng-if=\"isSending\">\n" +
    "        <div class=\"sending-status\">Sending your message..</div>\n" +
    "    </div>\n" +
    "\n" +
    "\n" +
    "    <div class=\"modal-body\" ng-if=\"isSent\">\n" +
    "        <div class=\"sending-status\">Thank you! You are awesome.</div>\n" +
    "    </div>\n" +
    "\n" +
    "\n" +
    "    <div class=\"modal-footer\">\n" +
    "        <button class=\"btn btn-link\" type=\"button\" ng-click=\"cancel()\">Cancel</button>\n" +
    "        <button class=\"btn btn-primary\" type=\"submit\" ng-disabled=\"isSending || isSent\">Send</button>\n" +
    "    </div>\n" +
    "</form>");
}]);

angular.module("app/account/partials/account.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/account/partials/account.html",
    "<!-- Account sections -->\n" +
    "<div class=\"account__sections\" account-form-toggle>\n" +
    "    <!--Sign in-->\n" +
    "    <div class=\"account__section\" ng-if=\"AccountFormToggle.state === ACCOUNT_FORM_STATE.login\" ng-controller=\"LoginCtrl\">\n" +
    "\n" +
    "        <!-- Title -->\n" +
    "        <h1 class=\"account__title\">Welcome!</h1>\n" +
    "\n" +
    "        <!-- Login form -->\n" +
    "        <form name=\"loginForm\" ng-submit=\"login(loginData)\" novalidate>\n" +
    "\n" +
    "            <!-- Account controls -->\n" +
    "            <div class=\"account__controls\">\n" +
    "\n" +
    "                <!-- General error -->\n" +
    "                <div class=\"alert alert-danger\" ng-if=\"isAuthenticationErrorOcurred\">Your email or password are wrong. Please try again.</div>\n" +
    "\n" +
    "                <!-- Form groups -->\n" +
    "                <div class=\"account__controls__form-groups--last\">\n" +
    "\n" +
    "                    <!-- Form group -->\n" +
    "                    <div class=\"form-group\" ng-class=\"{'has-error': isAuthenticationErrorOcurred || ( loginForm.email.$invalid && loginForm.$submitted )}\">\n" +
    "                        <input class=\"form-control\" type=\"email\" placeholder=\"email\" name=\"email\" ng-model=\"loginData.email\" required />\n" +
    "                        <div class=\"help-block\" ng-if=\"loginForm.$submitted\">\n" +
    "                            <div ng-if=\"loginForm.email.$error.required\">Your email address is mandatory.</div>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "\n" +
    "                    <!-- Form group -->\n" +
    "                    <div class=\"form-group\" ng-class=\"{'has-error': isAuthenticationErrorOcurred || ( loginForm.password.$invalid && loginForm.$submitted )}\">\n" +
    "                        <input class=\"form-control\" type=\"password\" placeholder=\"password\" name=\"password\" ng-model=\"loginData.password\" required />\n" +
    "                        <div class=\"help-block\" ng-if=\"loginForm.$submitted\">\n" +
    "                            <div ng-if=\"loginForm.password.$error.required\">Your password is mandatory.</div>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "\n" +
    "                <!-- Reset password -->\n" +
    "                <div class=\"form-group\">\n" +
    "                    <a class=\"link-secondary\" href=\"#\" ng-click=\"AccountFormToggle.setState(ACCOUNT_FORM_STATE.forgotPassword)\">Forgot login details?</a>\n" +
    "                </div>\n" +
    "\n" +
    "                <!-- Button container -->\n" +
    "                <button class=\"btn account__button\" type=\"submit\">Sign in</button>\n" +
    "            </div>\n" +
    "        </form>\n" +
    "\n" +
    "        <a class=\"link-primary\" href=\"#\" ng-click=\"AccountFormToggle.setState(ACCOUNT_FORM_STATE.signUp)\">Don't have an account yet? Sign up!</a>\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "    <!--Sign up-->\n" +
    "    <div class=\"account__section\" ng-if=\"AccountFormToggle.state == ACCOUNT_FORM_STATE.signUp\" ng-controller=\"SignUpCtrl\">\n" +
    "\n" +
    "        <!-- Title -->\n" +
    "        <h1 class=\"account__title\">Get started!</h1>\n" +
    "\n" +
    "        <!-- Sign-up form -->\n" +
    "        <form name=\"signUpForm\" ng-submit=\"signUp(signUpData)\" novalidate focus-first-error-on-submit>\n" +
    "\n" +
    "            <!-- Account controls -->\n" +
    "            <div class=\"account__controls\">\n" +
    "\n" +
    "               <!-- General error -->\n" +
    "                <div class=\"alert alert-danger\" ng-if=\"isSignUpErrorOcurred\">\n" +
    "                     <span ng-repeat=\"errorMessage in errorMessages\">{{errorMessage}}</span>\n" +
    "                </div>\n" +
    "\n" +
    "                <!-- Form groups -->\n" +
    "                <div class=\"form-group\" ng-class=\"{'has-error': signUpForm.firstName.$invalid && signUpForm.$submitted}\">\n" +
    "                    <input class=\"form-control\" type=\"text\" placeholder=\"First Name\" name=\"firstName\" ng-model=\"signUpData.firstName\" required />\n" +
    "                    <span class=\"help-block\" ng-if=\"signUpForm.firstName.$invalid && signUpForm.$submitted\">Please tell us your First Name.</span>\n" +
    "                </div>\n" +
    "\n" +
    "                <!-- Form group -->\n" +
    "                <div class=\"form-group\" ng-class=\"{'has-error': signUpForm.lastName.$invalid && signUpForm.$submitted}\">\n" +
    "                    <input class=\"form-control\" type=\"text\" placeholder=\"Last Name\" name=\"lastName\" ng-model=\"signUpData.lastName\" required />\n" +
    "                    <span class=\"help-block\" ng-if=\"signUpForm.lastName.$invalid && signUpForm.$submitted\">Please tell us your Last Name.</span>\n" +
    "                </div>\n" +
    "\n" +
    "                <!-- Form groups -->\n" +
    "                <div class=\"account__controls__form-groups--last\">\n" +
    "\n" +
    "                    <!-- Form group -->\n" +
    "                    <div class=\"form-group\" ng-class=\"{'has-error': signUpForm.email.$invalid && signUpForm.$submitted}\">\n" +
    "                        <input class=\"form-control\" type=\"email\" placeholder=\"Your email address\" name=\"email\" ng-model=\"signUpData.email\" ng-model-options=\"{ debounce: 800 }\" required valid-email unique-email />\n" +
    "                        <div class=\"help-block\" ng-messages=\"signUpForm.email.$error\" ng-if=\"signUpForm.$submitted\">\n" +
    "                            <div ng-message=\"required\">Your email address is mandatory.</div>\n" +
    "                            <div ng-message=\"validEmail\">This email address is not valid.</div>\n" +
    "                            <div ng-message=\"uniqueEmail\">This email address is already used.</div>\n" +
    "                        </div>\n" +
    "                        <div class=\"help-block\" ng-if=\"signUpForm.email.$pending\">\n" +
    "                            Checking availability...\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "\n" +
    "                    <!-- Form group -->\n" +
    "                    <div class=\"form-group\" ng-class=\"{'has-error': signUpForm.password.$invalid && signUpForm.$submitted}\">\n" +
    "                        <input class=\"form-control\" type=\"password\" placeholder=\"Choose a password\" name=\"password\" ng-model=\"signUpData.password\" required strong-password />\n" +
    "                        <div class=\"help-block\" ng-messages=\"signUpForm.password.$error\" ng-if=\"signUpForm.$submitted\">\n" +
    "                             <div ng-message=\"required\">Please choose a password.</div>\n" +
    "                             <div ng-message=\"strongPassword\">Your password needs to be at least 7 characters long.</div>\n" +
    "                         </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "\n" +
    "                <!-- Button container -->\n" +
    "                <button class=\"btn account__button\" type=\"submit\">Create new account</button>\n" +
    "            </div>\n" +
    "        </form>\n" +
    "\n" +
    "         <a class=\"link-primary\" href=\"#\" ng-click=\"AccountFormToggle.setState(ACCOUNT_FORM_STATE.login)\">Already have an account? Sign in here!</a>\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "    <!-- Recover password section -->\n" +
    "    <div class=\"account__section\" ng-if=\"AccountFormToggle.state == ACCOUNT_FORM_STATE.forgotPassword\" ng-controller=\"ForgotPasswordCtrl\">\n" +
    "\n" +
    "        <!-- Title -->\n" +
    "        <h1 class=\"account__title\">Can't remember your password?</h1>\n" +
    "\n" +
    "        <!-- Explain -->\n" +
    "        <span class=\"account__explain\">\n" +
    "            Enter below the e-mail you use to log in. <br />\n" +
    "            We'll send you instructions on how to reset your password.\n" +
    "        </span>\n" +
    "\n" +
    "        <!-- Forgot password form -->\n" +
    "        <form name=\"forgotPasswordForm\" ng-submit=\"requestPasswordReset(forgotPasswordData.email)\" novalidate focus-first-error-on-submit>\n" +
    "\n" +
    "            <!-- Account controls -->\n" +
    "            <div class=\"account__controls\">\n" +
    "\n" +
    "                  <!-- General error -->\n" +
    "                <div class=\"alert alert-info\" ng-if=\"isRequestPasswordErrorOcurred\">\n" +
    "                     <span ng-repeat=\"errorMessage in errorMessages\">{{errorMessage}}</span>\n" +
    "                </div>\n" +
    "\n" +
    "                <!-- Form groups -->\n" +
    "                <div class=\"account__controls__form-groups--last\">\n" +
    "\n" +
    "                    <!-- Form group -->\n" +
    "                    <div class=\"form-group\" ng-class=\"{'has-error': forgotPasswordForm.email.$invalid && forgotPasswordForm.$submitted }\">\n" +
    "                        <input class=\"form-control\" type=\"email\" placeholder=\"Your email address\" name=\"email\" ng-model=\"forgotPasswordData.email\" required valid-email />\n" +
    "                        <div class=\"help-block\" ng-messages=\"forgotPasswordForm.email.$error\" ng-if=\"forgotPasswordForm.$submitted\">\n" +
    "                            <div ng-message=\"required\">Your email address is mandatory.</div>\n" +
    "                            <div ng-message=\"validEmail\">This email address is not valid.</div>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "\n" +
    "                <!-- Button container -->\n" +
    "                <button class=\"btn btn-primary btn-fixed-width btn-rounded account__button\" type=\"submit\">Reset password</button>\n" +
    "            </div>\n" +
    "        </form>\n" +
    "\n" +
    "        <a href=\"#\" ng-click=\"AccountFormToggle.setState(ACCOUNT_FORM_STATE.login)\">Nevermind, take me back!</a>\n" +
    "    </div>\n" +
    "\n" +
    "    <!-- Password recovery email sent section -->\n" +
    "    <div class=\"account__section\" ng-if=\"AccountFormToggle.state == ACCOUNT_FORM_STATE.forgotPasswordEmailSent\">\n" +
    "\n" +
    "        <!-- Title -->\n" +
    "        <h1 class=\"account__title\">Email has been sent!</h1>\n" +
    "\n" +
    "        <!-- Explain -->\n" +
    "            <span class=\"account__explain\">\n" +
    "                We've sent you an email with the instructions on how to reset your password.\n" +
    "            </span>\n" +
    "\n" +
    "        <!-- Button container -->\n" +
    "        <a href=\"#\" ng-click=\"AccountFormToggle.setState(ACCOUNT_FORM_STATE.login)\">Continue</a>\n" +
    "    </div>\n" +
    "\n" +
    "</div>\n" +
    "\n" +
    "");
}]);

angular.module("app/account/partials/logout.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/account/partials/logout.html",
    "<!-- Account sections -->\n" +
    "<div class=\"account__sections\">\n" +
    "\n" +
    "   <!-- Logout section -->\n" +
    "    <div class=\"account__section\">\n" +
    "\n" +
    "        <!-- Account controls -->\n" +
    "        <div class=\"account__controls\">\n" +
    "\n" +
    "             <!--Message-->\n" +
    "            <div class=\"alert alert-success\">\n" +
    "               We've successfully logged you out.\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "\n" +
    "");
}]);

angular.module("app/account/partials/profile.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/account/partials/profile.html",
    "<!-- Account sections -->\n" +
    "<div class=\"account__sections\" profile-form-toggle>\n" +
    "\n" +
    "    <!-- Profile section -->\n" +
    "    <div class=\"account__section\" ng-if=\"ProfileFormToggle.state === ACCOUNT_FORM_STATE.updateProfile\" ng-controller=\"ProfileCtrl\">\n" +
    "\n" +
    "        <!-- Title -->\n" +
    "        <h1 class=\"account__title\">Modify profile</h1>\n" +
    "\n" +
    "        <!-- Profile form -->\n" +
    "        <form name=\"profileForm\" ng-submit=\"updateProfile(profileData)\" novalidate>\n" +
    "\n" +
    "            <!-- Account controls -->\n" +
    "            <div class=\"account__controls\">\n" +
    "\n" +
    "                 <!--Successfully message-->\n" +
    "                <div class=\"alert alert-success\" ng-if=\"isProfileUpdated\">\n" +
    "                   We've successfully updated your account.\n" +
    "                </div>\n" +
    "\n" +
    "                <!-- General error -->\n" +
    "                <div class=\"alert alert-danger\" ng-if=\"errorMessages && !isProfileUpdated\">\n" +
    "                   <span ng-repeat=\"errorMessage in errorMessages\">{{errorMessage}}</span>\n" +
    "                </div>\n" +
    "\n" +
    "                <!-- Form groups -->\n" +
    "                <div class=\"account__controls__form-groups account__controls__form-groups--last\">\n" +
    "\n" +
    "                    <!-- Form group -->\n" +
    "                    <div class=\"form-group\" ng-class=\"{'has-error': profileForm.firstName.$invalid && profileForm.$submitted}\">\n" +
    "                        <input class=\"form-control form-control-text-center form-control-fixed-width\" type=\"text\" placeholder=\"Prenume\" name=\"firstName\" ng-model=\"profileData.firstName\" required />\n" +
    "                        <span class=\"help-block\" ng-if=\"profileForm.firstName.$invalid && profileForm.$submitted\">Please tell us your First Name.</span>\n" +
    "                    </div>\n" +
    "\n" +
    "                    <!-- Form group -->\n" +
    "                    <div class=\"form-group\" ng-class=\"{'has-error': profileForm.lastName.$invalid && profileForm.$submitted}\">\n" +
    "                        <input class=\"form-control form-control-text-center form-control-fixed-width\" type=\"text\" placeholder=\"Nume\" name=\"lastName\" ng-model=\"profileData.lastName\" required />\n" +
    "                        <span class=\"help-block\" ng-if=\"profileForm.lastName.$invalid && profileForm.$submitted\">Please tell us your Last Name.</span>\n" +
    "                    </div>\n" +
    "\n" +
    "                    <!-- Form group -->\n" +
    "                    <div class=\"form-group\" ng-class=\"{'has-error': profileForm.email.$invalid && profileForm.$submitted}\">\n" +
    "                        <input class=\"form-control form-control-text-center form-control-fixed-width\" type=\"text\" placeholder=\"Email\" name=\"email\" ng-model=\"profileData.email\" required />\n" +
    "                        <span class=\"help-block\" ng-if=\"profileForm.email.$invalid && profileForm.$submitted\">Please tell us your email.</span>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "\n" +
    "                <!-- Button container -->\n" +
    "                <button class=\"btn btn-primary btn-fixed-width btn-rounded account__button\" type=\"submit\">SAVE</button>\n" +
    "            </div>\n" +
    "        </form>\n" +
    "\n" +
    "        <a href=\"#\" ng-click=\"ProfileFormToggle.setState(ACCOUNT_FORM_STATE.updatePassword)\">Change password.</a>\n" +
    "        <br />\n" +
    "        <br />\n" +
    "        <a href=\"#\" ng-click=\"getMeBack()\">{{profileForm.updated ? 'Ok, get me back.' : 'Nevermind.'}}</a>\n" +
    "    </div>\n" +
    "\n" +
    "    <!-- Update password section -->\n" +
    "    <div class=\"account__section\" ng-if=\"ProfileFormToggle.state === ACCOUNT_FORM_STATE.updatePassword\" ng-controller=\"UpdatePasswordCtrl\">\n" +
    "\n" +
    "        <!-- Title -->\n" +
    "        <h1 class=\"account__title\">Welcome!</h1>\n" +
    "\n" +
    "        <!-- Update password form -->\n" +
    "        <form name=\"updatePasswordForm\" ng-submit=\"updatePassword(updatePasswordData)\" novalidate>\n" +
    "\n" +
    "            <!-- Account controls -->\n" +
    "            <div class=\"account__controls\">\n" +
    "\n" +
    "                <!-- General error -->\n" +
    "                <div class=\"alert alert-danger\" ng-if=\"isUpdatePasswordErrorOcurred\">\n" +
    "                     <span ng-repeat=\"errorMessage in errorMessages\">{{errorMessage}}</span>\n" +
    "                </div>\n" +
    "\n" +
    "                <!-- Form groups -->\n" +
    "                <div class=\"account__controls__form-groups--last\">\n" +
    "\n" +
    "                    <!-- Form group -->\n" +
    "                    <div class=\"form-group\" ng-class=\"{'has-error': isUpdatePasswordErrorOcurred || (updatePasswordForm.oldPassword.$invalid && updatePasswordForm.$submitted)}\">\n" +
    "                        <input class=\"form-control\" type=\"password\" placeholder=\"Old password\" name=\"oldPassword\" ng-model=\"updatePasswordData.oldPassword\" required />\n" +
    "                        <span class=\"help-block\" ng-if=\"updatePasswordForm.oldPassword.$invalid && updatePasswordForm.$submitted\">Your old password is mandatory.</span>\n" +
    "                    </div>\n" +
    "\n" +
    "                    <!-- Form group -->\n" +
    "                    <div class=\"form-group\" ng-class=\"{'has-error': isUpdatePasswordErrorOcurred || (updatePasswordForm.newPassword.$invalid && updatePasswordForm.$submitted)}\">\n" +
    "                        <input class=\"form-control\" type=\"password\" placeholder=\"New password\" name=\"newPassword\" ng-model=\"updatePasswordData.newPassword\" required />\n" +
    "                        <span class=\"help-block\" ng-if=\"updatePasswordForm.newPassword.$invalid && updatePasswordForm.$submitted\">Your confirm password is mandatory.</span>\n" +
    "                    </div>\n" +
    "\n" +
    "                    <!-- Form group -->\n" +
    "                    <div class=\"form-group\" ng-class=\"{'has-error': isUpdatePasswordErrorOcurred || (updatePasswordForm.newPasswordConfirmation.$invalid && updatePasswordForm.$submitted)}\">\n" +
    "                        <input class=\"form-control\" type=\"password\" placeholder=\"New password confirmation\" name=\"newPasswordConfirmation\" ng-model=\"updatePasswordData.newPasswordConfirmation\" required />\n" +
    "                        <span class=\"help-block\" ng-if=\"updatePasswordForm.newPasswordConfirmation.$invalid && updatePasswordForm.$submitted\">Your confirm password is mandatory.</span>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "\n" +
    "                <!-- Button container -->\n" +
    "                <button class=\"btn account__button\" type=\"submit\">Update password</button>\n" +
    "            </div>\n" +
    "        </form>\n" +
    "\n" +
    "        <a href=\"#\" ng-click=\"ProfileFormToggle.setState(ACCOUNT_FORM_STATE.updateProfile)\">Nevermind, take me back!</a>\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "    <!-- Change password section successfully-->\n" +
    "    <div class=\"account__section\" ng-if=\"ProfileFormToggle.state == ACCOUNT_FORM_STATE.updatePasswordSuccessfully\">\n" +
    "\n" +
    "        <!-- Title -->\n" +
    "        <h1 class=\"account__title\">Successfully</h1>\n" +
    "\n" +
    "        <!-- Explain -->\n" +
    "            <span class=\"account__explain\">\n" +
    "                We've successfully updated your new password.\n" +
    "            </span>\n" +
    "\n" +
    "        <!-- Button container -->\n" +
    "        <a href=\"#\" ng-click=\"ProfileFormToggle.setState(ACCOUNT_FORM_STATE.updateProfile)\">Continue</a>\n" +
    "    </div>\n" +
    "\n" +
    "</div>");
}]);

angular.module("app/account/partials/validate_password_reset_token.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/account/partials/validate_password_reset_token.html",
    "<!-- Account sections -->\n" +
    "<div class=\"account__sections\">\n" +
    "\n" +
    "      <!-- Validated token result -->\n" +
    "    <div class=\"alert alert-danger\" ng-if=\"errorMessages && !isTokenValid\">\n" +
    "       <span ng-repeat=\"errorMessage in errorMessages\">{{errorMessage}}</span>\n" +
    "\n" +
    "        <br />\n" +
    "        <br />\n" +
    "\n" +
    "        <!-- Button container -->\n" +
    "        <a href=\"#\" ng-click=\"continueToResetPassword()\">Let me try again.</a>\n" +
    "        <br />\n" +
    "        <span ng-if=\"isUserAuthenticated\">\n" +
    "            You are authenticated. You will be logged off if you want to try again.\n" +
    "        </span>\n" +
    "    </div>\n" +
    "\n" +
    "    <!-- Validate password reset token section -->\n" +
    "    <div class=\"account__section\" ng-hide=\"!isTokenValid || successfullyReseted\">\n" +
    "\n" +
    "        <!-- Title -->\n" +
    "         <h1 class=\"account__title\">Reset your password.</h1>\n" +
    "\n" +
    "        <!-- Reset password form -->\n" +
    "        <form name=\"resetPasswordForm\" ng-submit=\"resetPassword(resetPasswordData)\" novalidate>\n" +
    "\n" +
    "            <!-- Account controls -->\n" +
    "            <div class=\"account__controls\">\n" +
    "\n" +
    "                <!-- General error -->\n" +
    "                <div class=\"alert alert-danger\" ng-if=\"isResetPasswordErrorOcurred\">\n" +
    "                     <span ng-repeat=\"errorMessage in errorMessages\">{{errorMessage}}</span>\n" +
    "                </div>\n" +
    "\n" +
    "                <!-- Form groups -->\n" +
    "                <div class=\"account__controls__form-groups--last\">\n" +
    "\n" +
    "                    <!-- Form group -->\n" +
    "                    <div class=\"form-group\" ng-class=\"{'has-error': isResetPasswordErrorOcurred || (resetPasswordForm.password.$invalid && resetPasswordForm.$submitted)}\">\n" +
    "                        <input class=\"form-control\" type=\"password\" placeholder=\"New password\" name=\"password\" ng-model=\"resetPasswordData.password\" required />\n" +
    "                        <span class=\"help-block\" ng-if=\"resetPasswordForm.password.$invalid && resetPasswordForm.$submitted\">Your new password is mandatory.</span>\n" +
    "                    </div>\n" +
    "\n" +
    "                    <!-- Form group -->\n" +
    "                    <div class=\"form-group\" ng-class=\"{'has-error': isResetPasswordErrorOcurred || (resetPasswordForm.passwordConfirmation.$invalid && resetPasswordForm.$submitted)}\">\n" +
    "                        <input class=\"form-control\" type=\"password\" placeholder=\"New password confirmation\" name=\"passwordConfirmation\" ng-model=\"resetPasswordData.passwordConfirmation\" required />\n" +
    "                        <span class=\"help-block\" ng-if=\"resetPasswordForm.passwordConfirmation.$invalid && resetPasswordForm.$submitted\">Your confirm password is mandatory.</span>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "\n" +
    "                <!-- Button container -->\n" +
    "                <button class=\"btn account__button\" type=\"submit\">Reset password</button>\n" +
    "            </div>\n" +
    "        </form>\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "    <!-- Change password section successfully-->\n" +
    "    <div class=\"account__section\" ng-hide=\"!successfullyReseted\">\n" +
    "\n" +
    "        <!-- Title -->\n" +
    "        <h1 class=\"account__title\">Successfully</h1>\n" +
    "\n" +
    "        <!-- Explain -->\n" +
    "        <span class=\"account__explain\">\n" +
    "            We've successfully updated your new password.\n" +
    "        </span>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("app/common/partials/emailList/emailList.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/common/partials/emailList/emailList.html",
    "<div ng-repeat=\"email in emails track by $index\">\n" +
    "    <ng-form name=\"emailForm\">\n" +
    "        <div class=\"form-group\" ng-class=\"{'has-error': emailForm.email.$invalid && parentForm.submitted}\">\n" +
    "            <input class=\"form-control bg-sprite\" type=\"email\" placeholder=\"Your friend's email address\" name=\"email\" ng-model=\"emails[$index]\" required />\n" +
    "            <a href=\"#\" class=\"close\" tabindex=\"-1\" ng-click=\"removeEmail($index)\">×</a>\n" +
    "        </div>\n" +
    "    </ng-form>\n" +
    "</div>\n" +
    "\n" +
    "<a class=\"btn-add-emails\" href=\"#\" ng-click=\"addEmail()\" ng-show=\"canAddEmail\">Add another email recipient</a>");
}]);

angular.module("app/common/partials/header.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/common/partials/header.html",
    "<header class=\"header\">\n" +
    "    <div class=\"header__wrapper\">\n" +
    "\n" +
    "        <div class=\"header__wrapper__logo\">\n" +
    "            Reme\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"header__wrapper__menu dropdown\" dropdown>\n" +
    "            <a ng-show=\"currentUser.model.email\" class=\"link-dark-bg dropdown-toggle\" dropdown-toggle href=\"javascript:void(0)\">{{currentUser.model.email}}<span class=\"caret\"></span></a>\n" +
    "              <ul class=\"dropdown-menu\" role=\"menu\">\n" +
    "                <li><a class=\"nav-link\" href=\"javascript:void(0)\" ui-sref=\"reminders\">My reminders</a></li>\n" +
    "                <li><a class=\"nav-link\" href=\"javascript:void(0)\" ui-sref=\"profile\">Settings</a></li>\n" +
    "                <li><a class=\"nav-link\" href=\"javascript:void(0)\" ui-sref=\"profile\">Help</a></li>\n" +
    "                <li><a class=\"nav-link\" href=\"javascript:void(0)\" ui-sref=\"account:logout\">Logout</a></li>\n" +
    "              </ul>\n" +
    "        </div>\n" +
    "\n" +
    "    </div>\n" +
    "</header>");
}]);

angular.module("app/common/partials/timepickerPopup/timepickerPopup.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/common/partials/timepickerPopup/timepickerPopup.html",
    "<button type=\"button\" class=\"btn btn-default bg-sprite dropdown-toggle\" animate animate-on=\"nlpDate:timeChange\" animate-class=\"animated highlight-button\" dropdown-toggle>\n" +
    "        {{date | date:'hh:mm a'}}\n" +
    "</button>\n" +
    "<ul class=\"dropdown-menu dropdown-menu-time-picker\" perfect-scrollbar suppress-scroll-x=\"true\" wheel-speed=\"52\" update-on=\"perfectScrollbar:update\">\n" +
    "    <li ng-repeat=\"time in times\" ng-class=\"{selected: highlightSelected && time.index == selectedIndex}\">\n" +
    "        <a href ng-click=\"setTime(time.index, time.hour, time.minute)\">{{time.timestamp | date:'hh:mm a'}}</a>\n" +
    "    </li>\n" +
    "</ul>\n" +
    "");
}]);

angular.module("template/datepicker/datepicker.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/datepicker/datepicker.html",
    "<table class=\"datepicker\">\n" +
    "  <thead>\n" +
    "    <tr class=\"datepicker-jump-controls\">\n" +
    "      <th><button type=\"button\" class=\"btn btn-default btn-sm pull-left\" ng-click=\"move(-1)\">‹</button></th>\n" +
    "      <th colspan=\"{{rows[0].length - 2 + showWeekNumbers}}\"><button type=\"button\" class=\"btn btn-default btn-sm btn-block\" ng-click=\"toggleMode()\"><strong>{{title}}</strong></button></th>\n" +
    "      <th><button type=\"button\" class=\"btn btn-default btn-sm btn-block pull-right\" ng-click=\"move(1)\">›</button></th>\n" +
    "    </tr>\n" +
    "    <tr ng-show=\"labels.length > 0\" class=\"datepicker-day-labels\">\n" +
    "      <th ng-show=\"showWeekNumbers\" class=\"text-center\">#</th>\n" +
    "      <th ng-repeat=\"label in labels\" class=\"text-center\">{{label}}</th>\n" +
    "    </tr>\n" +
    "  </thead>\n" +
    "  <tbody>\n" +
    "    <tr ng-repeat=\"row in rows\">\n" +
    "      <td ng-show=\"showWeekNumbers\" class=\"text-center\"><em>{{ getWeekNumber(row) }}</em></td>\n" +
    "      <td ng-repeat=\"dt in row\" class=\"text-center\">\n" +
    "        <button type=\"button\" class=\"btn btn-sm\" ng-class=\"{'btn-primary': dt.selected, 'btn-default': !dt.selected}\" ng-click=\"select(dt.date)\" ng-disabled=\"dt.disabled\"><span ng-class=\"{'text-muted': dt.secondary}\">{{dt.label}}</span></button>\n" +
    "      </td>\n" +
    "    </tr>\n" +
    "  </tbody>\n" +
    "</table>\n" +
    "");
}]);

angular.module("template/datepicker/popup.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/datepicker/popup.html",
    "<ul class=\"dropdown-menu\" ng-style=\"{display: (isOpen && 'block') || 'none', top: position.top+'px', left: position.left+'px'}\">\n" +
    "	<li ng-transclude></li>\n" +
    "	<li ng-show=\"showButtonBar\" class=\"datepicker-button-bar\">\n" +
    "        <button type=\"button\" class=\"btn btn-sm btn-default btn-block\" ng-click=\"today(dt)\">{{currentText}}</button>\n" +
    "	</li>\n" +
    "</ul>\n" +
    "");
}]);

angular.module("template/modal/backdrop.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/modal/backdrop.html",
    "<div class=\"modal-backdrop fade\" ng-class=\"{in: animate}\" ng-style=\"{'z-index': 1040 + index*10}\"></div>");
}]);

angular.module("template/modal/window.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/modal/window.html",
    "<div tabindex=\"-1\" class=\"modal fade {{ windowClass }}\" ng-class=\"{in: animate}\" ng-style=\"{'z-index': 1050 + index*10, display: 'block'}\" ng-click=\"close($event)\">\n" +
    "    <div class=\"modal-dialog\"><div class=\"modal-content\" ng-transclude></div></div>\n" +
    "</div>");
}]);

angular.module("template/popover/popover.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/popover/popover.html",
    "<div class=\"popover {{placement}}\" ng-class=\"{ in: isOpen(), fade: animation() }\">\n" +
    "  <div class=\"arrow\"></div>\n" +
    "\n" +
    "  <div class=\"popover-inner\">\n" +
    "      <h3 class=\"popover-title\" ng-bind=\"title\" ng-show=\"title\"></h3>\n" +
    "      <div class=\"popover-content\" ng-bind=\"content\"></div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("template/tooltip/tooltip-html-unsafe-popup.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/tooltip/tooltip-html-unsafe-popup.html",
    "<div class=\"tooltip {{placement}}\" ng-class=\"{ in: isOpen(), fade: animation() }\">\n" +
    "  <div class=\"tooltip-arrow\"></div>\n" +
    "  <div class=\"tooltip-inner\" bind-html-unsafe=\"content\"></div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("template/tooltip/tooltip-popup.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/tooltip/tooltip-popup.html",
    "<div class=\"tooltip {{placement}}\" ng-class=\"{ in: isOpen(), fade: animation() }\">\n" +
    "  <div class=\"tooltip-arrow\"></div>\n" +
    "  <div class=\"tooltip-inner\" ng-bind=\"content\"></div>\n" +
    "</div>\n" +
    "");
}]);
