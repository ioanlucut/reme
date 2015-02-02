"use strict";

 angular.module('config', [])

.constant('ENV', {name:'development',apiEndpoint:'http://dev-api.reme.io',mixPanelId:'e9ba9ca056ce11433777e3c8f59014b4'})

;;/**
 * Main common module declaration including ui templates.
 */
angular
    .module("common", [
        "a8m.filter-watcher",
        "ui.router",
        "restmod",
        "ui.bootstrap.transition",
        "ui.bootstrap.datepicker",
        "ui.bootstrap.dropdown",
        "ui.bootstrap.modal",
        "localytics.directives"
    ])
    .config(["$httpProvider", function ($httpProvider) {
        $httpProvider.interceptors.push("HumpsInterceptor");
        $httpProvider.interceptors.push("JWTInterceptor");
        $httpProvider.interceptors.push("ActivityInterceptor");
        $httpProvider.interceptors.push("ErrorInterceptor");
    }]).run(function () {

        /**
         * Callback function to check if the date should include year too.
         * @returns {string}
         */
        function callbackCalendarFormatter() {
            var isSameYear = moment(moment().year()).isSame(this.year());

            return isSameYear ? 'dddd, D MMMM' : 'dddd, D MMMM YYYY';
        }

        // Initialize moment configuration
        moment.locale('en', {
            calendar: {
                lastDay: '[Yesterday]',
                sameDay: '[Today]',
                nextDay: '[Tomorrow]',
                lastWeek: callbackCalendarFormatter,
                nextWeek: callbackCalendarFormatter,
                sameElse: callbackCalendarFormatter
            }
        });
    });
;angular
    .module("common")
    .constant("ALERTS_CONSTANTS", {
        login: "login",
        signUp: "signUp",
        signUpConfirm: "signUpConfirm",
        forgotPassword: "forgotPassword",
        requestSignUpRegistration: "requestSignUpRegistration",
        resetPassword: "resetPassword",
        updatePassword: "updatePassword",
        validatePassword: "validatePassword",
        createUpdateReminder: "createUpdateReminder",
        reminderList: "reminderList",
        updateProfile: "updateProfile",
        preferences: "preferences"
    });;/**
 * Common states.
 */
angular
    .module("common")
    .constant("ACTIVITY_INTERCEPTOR", {
        activityStart: "activity-interceptor-start",
        activityEnd: "activity-interceptor-end"
    })
    .constant("STATES", {
        home: "home",
        profile: "profile",
        reminders: "reminders.regular",
        account: "account"
    })
    .constant("ACCESS_LEVEL", {
        forLoggedUser: "forLoggedUser",
        forGuestUser: "forGuestUser"
    })
    .constant("ERROR_INTERCEPTOR", {
        status500: "status500"
    });
;/**
 * Date source constants.
 */
angular
    .module("common")
    .constant("DATE_SOURCE", {
        isFromNlp: "naturalLanguageProcessorSource",
        isFromUpdateAction: "updateReminderSource"
    });;/**
 * Common mixpanel events.
 */
angular
    .module("common")
    .constant("MIXPANEL_EVENTS", {
        landingPageLoaded: "Landing page loaded",
        signUpRequested: "Signup requested",
        signUpCompleted: "Signup completed",
        remindersPage: "Reminders page (site visited)",
        reminderModalOpened: "Reminder modal opened",
        reminderCreated: "Reminder created",
        reminderUpdated: "Reminder updated",
        reminderDeleted: "Reminder deleted",
        reminderUnSubscribed: "Reminder unsubscribed",
        settings: "Settings",
        error404: "error-404",
        error500: "error-500"
    });;angular
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
    .directive("emailList", function () {
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
                        scope.emails.push({ email: email });
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
    });
;/**
 * Header directive responsible for header common template.
 */
angular
    .module("common")
    .directive("flashMessages", function () {
        return {
            scope: {
                flash: "=",
                identifierId: "@"
            },
            restrict: "A",
            templateUrl: "app/common/partials/flash-messages.html",
            link: function (scope, el, attrs) {
            }
        };
    });
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
    .directive("footer", function () {
        return {
            restrict: "A",
            templateUrl: "app/common/partials/footer.html",
            link: function (scope, el) {

            }
        };
    });
;/**
 * Header directive responsible for header common template.
 */
angular
    .module("common")
    .directive("footerHome", function () {
        return {
            restrict: "A",
            templateUrl: "app/common/partials/footer-home.html",
            link: function (scope, el) {

            }
        };
    });
;/**
 * Header directive responsible for header common template.
 */
angular
    .module("common")
    .directive("header", ["$rootScope", function ($rootScope) {
        return {
            restrict: "A",
            templateUrl: "app/common/partials/header.html",
            link: function (scope, el) {

                /**
                 * Reference to the current user.
                 * @type {$rootScope.currentUser|*}
                 */
                scope.currentUser = $rootScope.currentUser;
            }
        };
    }]);
;/**
 * Header directive responsible for header common template.
 */
angular
    .module("common")
    .directive("headerHome", ["$rootScope", function ($rootScope) {
        return {
            restrict: "A",
            templateUrl: "app/common/partials/header-home.html",
            link: function (scope, el) {

                /**
                 * Reference to the current user.
                 * @type {$rootScope.currentUser|*}
                 */
                scope.currentUser = $rootScope.currentUser;
            }
        };
    }]);
;/* Loading bar */

angular.
    module("common").
    directive("loadingBar", ["$rootScope", "ACTIVITY_INTERCEPTOR", function ($rootScope, ACTIVITY_INTERCEPTOR) {
        return {
            restrict: "A",
            template: "<div class='loading-bar-progress'></div>",
            link: function (scope, el) {

                // Loading class
                var LOADING_CLASS = "loading-bar--active";

                // Show the loading bar on activity start
                $rootScope.$on(ACTIVITY_INTERCEPTOR.activityStart, function () {
                    el.addClass(LOADING_CLASS);
                });

                // Hide the loading bar on activity end
                $rootScope.$on(ACTIVITY_INTERCEPTOR.activityEnd, function () {
                    el.removeClass(LOADING_CLASS);
                });
            }
        }
    }]);
;angular
    .module("common")
    .directive("mixpanelInitializer", ["$window", "ENV", function ($window, ENV) {
        return {
            restrict: "A",
            compile: function compile() {
                return {
                    pre: function preLink() {
                        var mixpanel = $window.mixpanel || {};
                        mixpanel.init(ENV.mixPanelId);
                    }
                };
            }
        }
    }]);
;/* Natural Language Date Input */

angular
    .module("common")
    .directive("nlpDate", ["$rootScope", "DATE_SOURCE", function ($rootScope, DATE_SOURCE) {
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
    .directive("scrollTo", ["$window", function ($window) {
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
;angular
    .module("common")
    .directive("searchWidget", function () {
        return {
            restrict: "A",
            link: function (scope, el) {
                new UISearch(document.getElementById('sb-search'));
            }
        };
    });
;/* Timepicker popup */

angular.module("common").
    directive("timepickerPopup", ["DatesUtils", "DATE_SOURCE", function (DatesUtils, DATE_SOURCE) {
        return {
            require: "ngModel",
            scope: {
                date: "=ngModel"
            },
            templateUrl: "app/common/partials/timepickerPopup/timepickerPopup.html",
            restrict: "A",
            link: function (scope, el, attrs) {

                /**
                 * Creates the times array based on a referenceDate.
                 * @param referenceDate
                 * @returns {Array}
                 */
                function createTimesArray(referenceDate) {

                    var now = new Date();
                    referenceDate = referenceDate || new Date();
                    referenceDate.setHours(0);
                    referenceDate.setMinutes(0);

                    var timestamp = referenceDate.getTime();
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
                            timestamp: timestamp,
                            inPast: timestamp < now.getTime()
                        });

                        timestamp += step * 60 * 1000;
                    }

                    return times;
                }

                // Generate the times.
                scope.times = createTimesArray();

                // Update selected index when date changes
                scope.$watch("date", function (date) {

                    // if is today and comes from nlp parser, let it be.
                    if ( moment().diff(date, 'day') === 0 && (date[DATE_SOURCE.isFromNlp] || date[DATE_SOURCE.isFromUpdateAction]) ) {
                        // skip
                    }
                    // if is today, set first valid time
                    else if ( moment().diff(date, 'day') === 0 ) {
                        date = DatesUtils.prepareDate(date);
                    }
                    else if ( moment().diff(date, 'day') < 0 && !(date[DATE_SOURCE.isFromNlp] || date[DATE_SOURCE.isFromUpdateAction]) ) {
                        scope.setTime(scope.times[0]);
                    }

                    for ( var i = 0; i < scope.times.length; i++ ) {
                        if ( date.getHours() == scope.times[i].hour && date.getMinutes() == scope.times[i].minute ) {
                            scope.setTime(scope.times[i]);

                            break;
                        }
                    }
                });

                /**
                 * Set date ng-model by selected time
                 * @param time
                 */
                scope.setTime = function (time) {
                    scope.selectedIndex = time.index;
                    scope.date.setHours(time.hour);
                    scope.date.setMinutes(time.minute);
                    reForceCheckValidity();
                };

                /**
                 * Validate if the date is in the past always after setting the time.
                 */
                function reForceCheckValidity() {
                    var isDateInPast = moment().diff(scope.date || scope.$parent.reminderForm.selectedDate) > 0;
                    if ( scope.$parent.reminderForm.selectedDate.$invalid && !isDateInPast ) {
                        scope.$parent.reminderForm.selectedDate.$setValidity('validDate', true);
                    }
                    else if ( scope.$parent.reminderForm.selectedDate.$valid && isDateInPast ) {
                        scope.$parent.reminderForm.selectedDate.$setValidity('validDate', false);
                    }
                }

                // Get the dropdown toggle and dropdown menu
                var dropdownToggle = el.children().eq(0);
                var dropdownMenu = el.children().eq(1);

                /**
                 * On click hook.
                 */
                dropdownToggle.on("click", function () {

                    // Find the selected item
                    var selectedItem = dropdownMenu.children().eq(scope.selectedIndex);

                    // Reset scrollTop
                    dropdownMenu.scrollTop(0);

                    // Calculate and apply scrollTop
                    var visibleItems = Math.round(dropdownMenu.height() / selectedItem.outerHeight());

                    var position = selectedItem.position();
                    if ( position && position.top ) {
                        var scrollTop = position.top - (Math.round(0.5 * visibleItems) - 1) * selectedItem.outerHeight();
                        dropdownMenu.scrollTop(Math.max(scrollTop, 0));

                        // Highlight the selected item
                        scope.highlightSelected = true;
                        scope.$apply();

                        // Update the perfect scrollbar
                        scope.$broadcast("perfectScrollbar:update", null);
                    }
                });

                /**
                 * On mouse enter hook
                 */
                dropdownMenu.on("mouseenter", function () {

                    // Stop highlighting the selected item
                    scope.highlightSelected = false;
                    scope.$apply();
                });
            }
        }
    }]);;angular
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
;/* Friendly date filter */

angular
    .module("common")
    .filter('friendlyDate', function () {
        return function (date) {

            if ( !_.isDate(date) ) {
                date = moment(date).toDate();
            }

            return moment(date).calendar();
        };
    });
;/* Friendly date filter */

angular
    .module("common")
    .filter('friendlyHour', function () {
        return function (date) {

            return moment(date).format("h:mm A");
        };
    });
;/* Friendly date filter */

angular
    .module("common")
    .filter('friendlyHourTimePicker', function () {
        return function (date) {

            return moment(date).format("hh:mm A");
        };
    });
;angular
    .module("common")
    .filter('friendlyRecipients', ["$rootScope", function ($rootScope) {
        return function (recipients) {

            /**
             * Current user email.
             * @type {User.$new.model.email|*|.$new.model.email}
             */
            var currentUserEmail = $rootScope.currentUser.model.email;

            if ( _.isUndefined(recipients) || !_.isArray(recipients) ) {
                return;
            }

            var friendlyRecipients = "";
            _.each(recipients, function (recipient) {
                if ( friendlyRecipients.length > 0 ) {
                    friendlyRecipients = friendlyRecipients + ", "
                }
                var emailToBeAppended = currentUserEmail === recipient.email ? 'Me' : recipient.email;
                friendlyRecipients = friendlyRecipients + emailToBeAppended;
            });

            return friendlyRecipients;
        };
    }]);
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
    .module('common')
    .filter('groupReminders', ["$parse", "filterWatcher", function ($parse, filterWatcher) {
        return function (reminders, reverse) {

            var isObject = angular.isObject,
                forEach = angular.forEach;

            if ( !isObject(reminders) ) {
                return reminders;
            }

            return filterWatcher.isMemoized('groupBy', arguments) ||
                filterWatcher.memoize('groupBy', arguments, this,
                    _groupBy(reminders));

            // ---
            // Group by reminders function.
            // ---

            function _groupBy(reminders) {
                var groupedReminders = [];
                var matchingGroup;
                var matchingGroupName;

                forEach(reminders, function (reminder) {
                    matchingGroup = reminder.matchingGroup;
                    matchingGroupName = matchingGroup.name;

                    if ( !_.some(groupedReminders, function (group) {
                            return group.name === matchingGroupName;
                        }) ) {
                        groupedReminders.push({ name: matchingGroupName, matchingGroup: matchingGroup, values: [] });
                    }

                    _.find(groupedReminders, function (group) {
                        return group.name === matchingGroupName;
                    }).values.push(reminder);
                });

                // ---
                // Comparator to sort reminders.
                // ---

                function remindersSortComparator(a, b) {
                    // A less than B
                    if ( a.matchingGroup.diff.date < b.matchingGroup.diff.date )
                        return -1;
                    // A greater than B
                    if ( a.matchingGroup.diff.date > b.matchingGroup.diff.date )
                        return 1;
                    // A greater than B
                    if ( a.matchingGroup.name === 'Today' && b.matchingGroup.name === 'This month' ) {
                        return -1;
                    }
                    return 0;
                }

                // ---
                // Sort reminders - +-reversed.
                // ---

                groupedReminders.sort(remindersSortComparator);

                if ( reverse ) {
                    groupedReminders.reverse();
                }

                return groupedReminders;
            }
        }
    }]);;/* Activity interceptor */

angular.
    module("common").
    factory("ActivityInterceptor", ["$rootScope", "$q", "ACTIVITY_INTERCEPTOR", function ($rootScope, $q, ACTIVITY_INTERCEPTOR) {
        return {

            /**
             * Request interceptor.
             *
             * @param config
             * @returns {*}
             */
            request: function (config) {
                if ( !config.cache ) {
                    $rootScope.$broadcast(ACTIVITY_INTERCEPTOR.activityStart);
                }
                return config;
            },

            /**
             * Response interceptor.
             *
             * @param response
             * @returns {Promise}
             */

            response: function (response) {
                if ( !response.config.cache ) {
                    $rootScope.$broadcast(ACTIVITY_INTERCEPTOR.activityEnd);
                }
                return response;
            },

            /**
             * Response error interceptor.
             *
             * @param response
             * @returns {Promise}
             */
            responseError: function (response) {
                if ( !response.config.cache ) {
                    $rootScope.$broadcast(ACTIVITY_INTERCEPTOR.activityEnd);
                }
                return $q.reject(response);
            }
        };
    }]);
;/**
 * Error service interceptor used to listen to ajax server responses.
 */
angular
    .module("common")
    .factory("ErrorInterceptor", ["$rootScope", "$q", "ERROR_INTERCEPTOR", function ($rootScope, $q, ERROR_INTERCEPTOR) {

        return {

            /**
             * Response error interceptor.
             *
             * @param response
             * @returns {*}
             */
            responseError: function (response) {

                if ( response.status === 500 && !response.config.cache ) {
                    $rootScope.$broadcast(ERROR_INTERCEPTOR.status500, response);
                }

                return $q.reject(response);
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
    .service("CamelCaseTransform", function () {

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

                        // Do it recursively
                        if ( _.isObject(objectToTransform[key]) && !_.isArray(objectToTransform[key]) ) {
                            thisService.transformObject(objectToTransform[key], transformationType);
                        }
                        if ( key !== newKey ) {
                            objectToTransform[newKey] = objectToTransform[key];
                            delete objectToTransform[key];
                        }
                    }
                });
            }
        };
    });
;/**
 * Dates utils service.
 */
angular
    .module("common")
    .service("DatesUtils", function () {

        this.prepareDate = function (givenDate) {

            // ---
            // Minutes.
            // ---
            var step = 30;

            // ---
            // Current values.
            // ---

            var now = moment();
            var minute = now.minutes();
            var hours = now.hours();

            // ---
            // Compute the date.
            // ---

            if ( minute >= step ) {
                minute = 0;
                hours += 1;
            }
            else {
                minute = step;
            }

            return Date.create(givenDate).set({ hours: hours, minute: minute, second: 0 });
        };

    });
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
;angular
    .module("common")
    .service("ReminderMatchingGroupService", function () {

        this.getRemindersGroups = function () {
            var now = moment();

            return [
                {
                    name: 'Today',
                    diff: { date: moment().set('day', now.day()), unit: 'day' }
                },
                {
                    name: 'Tomorrow',
                    diff: { date: moment().set('day', now.day() + 1), unit: 'day' }
                },
                {
                    name: 'Yesterday',
                    diff: { date: moment().set('day', now.day() - 1), unit: 'day' }
                },
                {
                    name: 'This month',
                    diff: { date: moment().set('month', now.month()), unit: 'month' }
                },
                {
                    name: 'Next month',
                    diff: { date: moment().set('month', now.month() + 1), unit: 'month' }
                },
                {
                    name: 'Last month',
                    diff: { date: moment().set('month', now.month() - 1), unit: 'month' }
                }
            ];
        };

        /**
         * Populate reminders with matching groups
         */
        this.populateRemindersWithMatchingGroups = function (reminders, reverseOrder) {
            var remindersGroup = this.getRemindersGroups();

            _.each(reminders, function (reminder) {
                var matchingGroupFound = _.find(remindersGroup, function (remindersGroup) {
                    return remindersGroup.diff.date.isSame(reminder.model.dueOn, remindersGroup.diff.unit);
                });

                if ( !matchingGroupFound ) {
                    var reminderDueOn = moment(reminder.model.dueOn);
                    var isSameYear = moment(moment().year()).isSame(reminderDueOn.year());

                    // ---
                    // If no matching group is found, create one with reminders month.
                    // ---

                    reminder.matchingGroup = {
                        name: reminderDueOn.format(isSameYear ? 'MMMM' : 'MMMM, YYYY'),
                        diff: {
                            date: moment(reminderDueOn), unit: 'month'
                        }
                    };
                }
                else {
                    reminder.matchingGroup = matchingGroupFound;
                }
            });
        };

        /**
         * Populate reminder with matching group
         */
        this.populateReminderWithMatchingGroup = function (reminder, reverseOrder) {
            return this.populateRemindersWithMatchingGroups([reminder], reverseOrder);
        };

    });
;/**
 * Session service which encapsulates the whole logic account related to the Local storage which contains currently logged in user.
 */
angular
    .module("common")
    .service("SessionService", ["$localStorage", "CamelCaseTransform", function ($localStorage, CamelCaseTransform) {

        /**
         * Local storage key for session data.
         *
         * @type {string}
         */
        var sessionDataKey = "auth_session_data";
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

            $localStorage[sessionDataKey] = angular.toJson(data);
        };

        /**
         * Return the session data.
         */
        this.getData = function () {
            return angular.fromJson($localStorage[sessionDataKey]);
        };

        /**
         * Set the token data.
         *
         * @param data
         */
        this.setJwtToken = function (data) {
            $localStorage[jwtTokenKey] = angular.toJson(data);
        };

        /**
         * Return the session data.
         */
        this.getJwtToken = function () {
            return angular.fromJson($localStorage[jwtTokenKey]);
        };

        this.sessionExists = function () {
            return $localStorage[sessionDataKey] && $localStorage[jwtTokenKey];
        };

        /**
         * Destroy session.
         */
        this.destroy = function () {
            delete $localStorage[sessionDataKey];
            delete $localStorage[jwtTokenKey];
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
    }]);;angular
    .module("common")
    .service("TimezoneProvider", function () {

        /**
         * All timezones
         * @type {{key: string, value: string}[]}
         */
        this.timezones = [
            { key: "Pacific/Midway", value: "(UTC-11:00) Midway Island" },
            { key: "Pacific/Samoa", value: "(UTC-11:00) Samoa" },
            { key: "Pacific/Honolulu", value: "(UTC-10:00) Hawaii" },
            { key: "US/Alaska", value: "(UTC-09:00) Alaska" },
            { key: "America/Los_Angeles", value: "(UTC-08:00) Pacific Time (US &amp; Canada)" },
            { key: "America/Tijuana", value: "(UTC-08:00) Tijuana" },
            { key: "US/Arizona", value: "(UTC-07:00) Arizona" },
            { key: "America/Chihuahua", value: "(UTC-07:00) Chihuahua" },
            { key: "America/Chihuahua", value: "(UTC-07:00) La Paz" },
            { key: "America/Mazatlan", value: "(UTC-07:00) Mazatlan" },
            { key: "US/Mountain", value: "(UTC-07:00) Mountain Time (US &amp; Canada)" },
            { key: "America/Managua", value: "(UTC-06:00) Central America" },
            { key: "US/Central", value: "(UTC-06:00) Central Time (US &amp; Canada)" },
            { key: "America/Mexico_City", value: "(UTC-06:00) Guadalajara" },
            { key: "America/Mexico_City", value: "(UTC-06:00) Mexico City" },
            { key: "America/Monterrey", value: "(UTC-06:00) Monterrey" },
            { key: "Canada/Saskatchewan", value: "(UTC-06:00) Saskatchewan" },
            { key: "America/Bogota", value: "(UTC-05:00) Bogota" },
            { key: "US/Eastern", value: "(UTC-05:00) Eastern Time (US &amp; Canada)" },
            { key: "US/East-Indiana", value: "(UTC-05:00) Indiana (East)" },
            { key: "America/Lima", value: "(UTC-05:00) Lima" },
            { key: "America/Bogota", value: "(UTC-05:00) Quito" },
            { key: "Canada/Atlantic", value: "(UTC-04:00) Atlantic Time (Canada)" },
            { key: "America/Caracas", value: "(UTC-04:30) Caracas" },
            { key: "America/La_Paz", value: "(UTC-04:00) La Paz" },
            { key: "America/Santiago", value: "(UTC-04:00) Santiago" },
            { key: "Canada/Newfoundland", value: "(UTC-03:30) Newfoundland" },
            { key: "America/Sao_Paulo", value: "(UTC-03:00) Brasilia" },
            { key: "America/Argentina/Buenos_Aires", value: "(UTC-03:00) Buenos Aires" },
            { key: "America/Argentina/Buenos_Aires", value: "(UTC-03:00) Georgetown" },
            { key: "America/Godthab", value: "(UTC-03:00) Greenland" },
            { key: "America/Noronha", value: "(UTC-02:00) Mid-Atlantic" },
            { key: "Atlantic/Azores", value: "(UTC-01:00) Azores" },
            { key: "Atlantic/Cape_Verde", value: "(UTC-01:00) Cape Verde Is." },
            { key: "Africa/Casablanca", value: "(UTC+00:00) Casablanca" },
            { key: "Europe/London", value: "(UTC+00:00) Edinburgh" },
            { key: "Etc/Greenwich", value: "(UTC+00:00) Greenwich Mean Time : Dublin" },
            { key: "Europe/Lisbon", value: "(UTC+00:00) Lisbon" },
            { key: "Europe/London", value: "(UTC+00:00) London" },
            { key: "Africa/Monrovia", value: "(UTC+00:00) Monrovia" },
            { key: "UTC", value: "(UTC+00:00) UTC" },
            { key: "Europe/Amsterdam", value: "(UTC+01:00) Amsterdam" },
            { key: "Europe/Belgrade", value: "(UTC+01:00) Belgrade" },
            { key: "Europe/Berlin", value: "(UTC+01:00) Berlin" },
            { key: "Europe/Berlin", value: "(UTC+01:00) Bern" },
            { key: "Europe/Bratislava", value: "(UTC+01:00) Bratislava" },
            { key: "Europe/Brussels", value: "(UTC+01:00) Brussels" },
            { key: "Europe/Budapest", value: "(UTC+01:00) Budapest" },
            { key: "Europe/Copenhagen", value: "(UTC+01:00) Copenhagen" },
            { key: "Europe/Ljubljana", value: "(UTC+01:00) Ljubljana" },
            { key: "Europe/Madrid", value: "(UTC+01:00) Madrid" },
            { key: "Europe/Paris", value: "(UTC+01:00) Paris" },
            { key: "Europe/Prague", value: "(UTC+01:00) Prague" },
            { key: "Europe/Rome", value: "(UTC+01:00) Rome" },
            { key: "Europe/Sarajevo", value: "(UTC+01:00) Sarajevo" },
            { key: "Europe/Skopje", value: "(UTC+01:00) Skopje" },
            { key: "Europe/Stockholm", value: "(UTC+01:00) Stockholm" },
            { key: "Europe/Vienna", value: "(UTC+01:00) Vienna" },
            { key: "Europe/Warsaw", value: "(UTC+01:00) Warsaw" },
            { key: "Africa/Lagos", value: "(UTC+01:00) West Central Africa" },
            { key: "Europe/Zagreb", value: "(UTC+01:00) Zagreb" },
            { key: "Europe/Athens", value: "(UTC+02:00) Athens" },
            { key: "Europe/Bucharest", value: "(UTC+02:00) Bucharest" },
            { key: "Africa/Cairo", value: "(UTC+02:00) Cairo" },
            { key: "Africa/Harare", value: "(UTC+02:00) Harare" },
            { key: "Europe/Helsinki", value: "(UTC+02:00) Helsinki" },
            { key: "Europe/Istanbul", value: "(UTC+02:00) Istanbul" },
            { key: "Asia/Jerusalem", value: "(UTC+02:00) Jerusalem" },
            { key: "Europe/Helsinki", value: "(UTC+02:00) Kyiv" },
            { key: "Africa/Johannesburg", value: "(UTC+02:00) Pretoria" },
            { key: "Europe/Riga", value: "(UTC+02:00) Riga" },
            { key: "Europe/Sofia", value: "(UTC+02:00) Sofia" },
            { key: "Europe/Tallinn", value: "(UTC+02:00) Tallinn" },
            { key: "Europe/Vilnius", value: "(UTC+02:00) Vilnius" },
            { key: "Asia/Baghdad", value: "(UTC+03:00) Baghdad" },
            { key: "Asia/Kuwait", value: "(UTC+03:00) Kuwait" },
            { key: "Europe/Minsk", value: "(UTC+03:00) Minsk" },
            { key: "Africa/Nairobi", value: "(UTC+03:00) Nairobi" },
            { key: "Asia/Riyadh", value: "(UTC+03:00) Riyadh" },
            { key: "Europe/Volgograd", value: "(UTC+03:00) Volgograd" },
            { key: "Asia/Tehran", value: "(UTC+03:30) Tehran" },
            { key: "Asia/Muscat", value: "(UTC+04:00) Abu Dhabi" },
            { key: "Asia/Baku", value: "(UTC+04:00) Baku" },
            { key: "Europe/Moscow", value: "(UTC+04:00) Moscow" },
            { key: "Asia/Muscat", value: "(UTC+04:00) Muscat" },
            { key: "Europe/Moscow", value: "(UTC+04:00) St. Petersburg" },
            { key: "Asia/Tbilisi", value: "(UTC+04:00) Tbilisi" },
            { key: "Asia/Yerevan", value: "(UTC+04:00) Yerevan" },
            { key: "Asia/Kabul", value: "(UTC+04:30) Kabul" },
            { key: "Asia/Karachi", value: "(UTC+05:00) Islamabad" },
            { key: "Asia/Karachi", value: "(UTC+05:00) Karachi" },
            { key: "Asia/Tashkent", value: "(UTC+05:00) Tashkent" },
            { key: "Asia/Calcutta", value: "(UTC+05:30) Chennai" },
            { key: "Asia/Kolkata", value: "(UTC+05:30) Kolkata" },
            { key: "Asia/Calcutta", value: "(UTC+05:30) Mumbai" },
            { key: "Asia/Calcutta", value: "(UTC+05:30) New Delhi" },
            { key: "Asia/Calcutta", value: "(UTC+05:30) Sri Jayawardenepura" },
            { key: "Asia/Katmandu", value: "(UTC+05:45) Kathmandu" },
            { key: "Asia/Almaty", value: "(UTC+06:00) Almaty" },
            { key: "Asia/Dhaka", value: "(UTC+06:00) Astana" },
            { key: "Asia/Dhaka", value: "(UTC+06:00) Dhaka" },
            { key: "Asia/Yekaterinburg", value: "(UTC+06:00) Ekaterinburg" },
            { key: "Asia/Rangoon", value: "(UTC+06:30) Rangoon" },
            { key: "Asia/Bangkok", value: "(UTC+07:00) Bangkok" },
            { key: "Asia/Bangkok", value: "(UTC+07:00) Hanoi" },
            { key: "Asia/Jakarta", value: "(UTC+07:00) Jakarta" },
            { key: "Asia/Novosibirsk", value: "(UTC+07:00) Novosibirsk" },
            { key: "Asia/Hong_Kong", value: "(UTC+08:00) Beijing" },
            { key: "Asia/Chongqing", value: "(UTC+08:00) Chongqing" },
            { key: "Asia/Hong_Kong", value: "(UTC+08:00) Hong Kong" },
            { key: "Asia/Krasnoyarsk", value: "(UTC+08:00) Krasnoyarsk" },
            { key: "Asia/Kuala_Lumpur", value: "(UTC+08:00) Kuala Lumpur" },
            { key: "Australia/Perth", value: "(UTC+08:00) Perth" },
            { key: "Asia/Singapore", value: "(UTC+08:00) Singapore" },
            { key: "Asia/Taipei", value: "(UTC+08:00) Taipei" },
            { key: "Asia/Ulan_Bator", value: "(UTC+08:00) Ulaan Bataar" },
            { key: "Asia/Urumqi", value: "(UTC+08:00) Urumqi" },
            { key: "Asia/Irkutsk", value: "(UTC+09:00) Irkutsk" },
            { key: "Asia/Tokyo", value: "(UTC+09:00) Osaka" },
            { key: "Asia/Tokyo", value: "(UTC+09:00) Sapporo" },
            { key: "Asia/Seoul", value: "(UTC+09:00) Seoul" },
            { key: "Asia/Tokyo", value: "(UTC+09:00) Tokyo" },
            { key: "Australia/Adelaide", value: "(UTC+09:30) Adelaide" },
            { key: "Australia/Darwin", value: "(UTC+09:30) Darwin" },
            { key: "Australia/Brisbane", value: "(UTC+10:00) Brisbane" },
            { key: "Australia/Canberra", value: "(UTC+10:00) Canberra" },
            { key: "Pacific/Guam", value: "(UTC+10:00) Guam" },
            { key: "Australia/Hobart", value: "(UTC+10:00) Hobart" },
            { key: "Australia/Melbourne", value: "(UTC+10:00) Melbourne" },
            { key: "Pacific/Port_Moresby", value: "(UTC+10:00) Port Moresby" },
            { key: "Australia/Sydney", value: "(UTC+10:00) Sydney" },
            { key: "Asia/Yakutsk", value: "(UTC+10:00) Yakutsk" },
            { key: "Asia/Vladivostok", value: "(UTC+11:00) Vladivostok" },
            { key: "Pacific/Auckland", value: "(UTC+12:00) Auckland" },
            { key: "Pacific/Fiji", value: "(UTC+12:00) Fiji" },
            { key: "Pacific/Kwajalein", value: "(UTC+12:00) International Date Line West" },
            { key: "Asia/Kamchatka", value: "(UTC+12:00) Kamchatka" },
            { key: "Asia/Magadan", value: "(UTC+12:00) Magadan" },
            { key: "Pacific/Fiji", value: "(UTC+12:00) Marshall Is." },
            { key: "Asia/Magadan", value: "(UTC+12:00) New Caledonia" },
            { key: "Asia/Magadan", value: "(UTC+12:00) Solomon Is." },
            { key: "Pacific/Auckland", value: "(UTC+12:00) Wellington" },
            { key: "Pacific/Tongatapu", value: "(UTC+13:00) Nuku'alofa" }
        ];

        /**
         * Returns timezones.
         */
        this.getTimezones = function () {
            return this.timezones;
        };

        /**
         * Returns timezone details.
         */
        this.getTimezoneDescription = function (timezone) {
            var that = this;
            var timezoneDetail = _.filter(that.timezones, { 'key': timezone });

            if ( timezoneDetail ) {
                return _.isArray(timezoneDetail) ? timezoneDetail[0] : timezoneDetail;
            }
        };

    });
;/**
 * Transformer utils service.
 */
angular
    .module("common")
    .service("TransformerUtils", function () {

        /**
         * Copies keys from a sourceObject to a targetObject, except given skipKeys.
         * @param sourceObject
         * @param targetObject
         * @param skipKeys
         */
        this.copyKeysFromTo = function (sourceObject, targetObject, skipKeys) {
            _.each(_.keys(sourceObject), function (key) {
                if ( !(skipKeys && _.contains(skipKeys, key)) ) {
                    targetObject[key] = sourceObject[key];
                }
            });
        };

        /**
         * Sanitize recipients (remove duplicates).
         */
        this.sanitizeRecipients = function (recipients) {

            return _.uniq(recipients, 'email');
        };
    });
;angular
    .module("feedback", []);;angular
    .module("feedback")
    .constant("FEEDBACK_URLS", {
        feedback: "feedback/send"
    });
;angular
    .module("feedback")
    .controller("FeedbackModalCtrl", ["$scope", "FeedbackModalService", "Feedback", "$timeout", function ($scope, FeedbackModalService, Feedback, $timeout) {

        /**
         * Feedback.
         */
        $scope.feedback = new Feedback();

        /**
         * Flags during the lifetime of the feedback.
         * @type {boolean}
         */
        $scope.isSending = false;
        $scope.isSent = false;

        $scope.openFeedbackModal = function () {
            FeedbackModalService.open();

            /**
             * If send feedback modal is opened
             */
            FeedbackModalService.modalInstance
                .opened
                .then(function () {
                    $scope.isModalOpened = true;
                }
            );
        };

        /**
         * Dismiss the create/update modal.
         */
        $scope.dismissFeedbackModal = function () {
            FeedbackModalService.modalInstance.dismiss("cancel");

            $scope.isModalOpened = false;
        };

        /**
         * Sends the feedback.
         * @param feedbackForm
         */
        $scope.sendFeedbackAndClose = function (feedbackForm) {
            if ( feedbackForm.$valid && !$scope.isSending ) {

                // Is sending feedback
                $scope.isSending = true;

                $scope.feedback.send()
                    .then(function () {

                        $scope.isSent = true;

                        $timeout(function () {
                            $scope.isSending = false;

                            FeedbackModalService.modalInstance.close();
                        }, 2500);

                    })
                    .catch(function () {

                        // Error
                        $scope.isSending = false;
                        alert("Something went wrong. Please try again.");
                    })
                    .finally(function () {

                        $scope.isModalOpened = false;
                        $scope.isSending = false;
                    });
            }
        };

    }]);
;angular
    .module("feedback")
    .factory("Feedback", ["FeedbackService", function (FeedbackService) {

        /**
         * Feedback class.
         * @constructor
         */
        function Feedback() {

            /**
             * Represents the DTO model of the Feedback.
             */
            this.model = {

                /**
                 * Feedback subject
                 */
                subject: "",

                /**
                 * Feedback message
                 */
                message: ""
            };

            /**
             * Sends a Feedback.
             * @returns {*}
             */
            this.send = function () {
                return FeedbackService.sendFeedback(this);
            };
        }

        /**
         * Builds a Feedback.
         * @returns {Feedback}
         */
        Feedback.build = function () {
            return new Feedback();
        };

        return Feedback;
    }]);;/* Feedback modal */

angular
    .module("feedback")
    .service("FeedbackModalService", ["$modal", function ($modal) {

        /**
         * Feedback modal instance.
         * @type {null}
         */
        this.modalInstance = null;

        /**
         * Define feedback modal object.
         */
        this.open = function () {

            this.modalInstance = $modal.open({
                templateUrl: "app/feedback/partials/feedback-modal.html",
                controller: "FeedbackModalCtrl",
                windowClass: "modal-feedback"
            });
        };

    }]);
;angular
    .module("feedback")
    .service("FeedbackService", ["FEEDBACK_URLS", "$http", function (FEEDBACK_URLS, $http) {

        this.sendFeedback = function (feedback) {
            return $http
                .post(URLTo.api(FEEDBACK_URLS.feedback), {
                    subject: feedback.model.subject,
                    message: feedback.model.message
                });
        };
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
                controller: "LoginCtrl",
                templateUrl: "app/account/partials/account.html",
                title: "Login - Reme.io"
            })

            // Settings page
            .state("settings", {
                url: "/account/settings",
                views: {

                    '': { templateUrl: "app/account/partials/settings/settings.html" },

                    'profile@settings': {
                        templateUrl: "app/account/partials/settings/settings.profile.html"
                    },

                    'preferences@settings': {
                        templateUrl: "app/account/partials/settings/settings.preferences.html"
                    }
                },
                title: "Settings - Reme.io"
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
                },
                title: "Logout - Reme.io"
            })

            ///////////////////////////////////////////////
            /*Validate password reset token related views*/
            ///////////////////////////////////////////////

            // Validate password reset token abstract view
            .state({
                name: "account:validatePasswordResetToken",
                url: "/account/reset-password",
                templateUrl: "app/account/partials/validate_password_reset_token_abstract.html",
                abstract: true
            })
            // Validate password reset token - valid
            .state({
                name: "account:validatePasswordResetToken.valid",
                url: "/{email}/{token}",
                templateUrl: "app/account/partials/validate_password_reset_token_valid.html",
                controller: "ValidatePasswordResetTokenCtrl",
                resolve: {
                    validateTokenResult: ["$stateParams", "$q", "AuthService", "$state", function ($stateParams, $q, AuthService, $state) {
                        var deferred = $q.defer();

                        AuthService.validatePasswordResetToken($stateParams.email, $stateParams.token)
                            .then(function (response) {
                                deferred.resolve({ email: $stateParams.email, token: $stateParams.token });
                                return response;
                            })
                            .catch(function (response) {

                                $state.go("account:validatePasswordResetToken.invalid");
                                return response;
                            });

                        return deferred.promise;
                    }]
                },
                title: "Reset password - Reme.io"
            })
            // Validate password reset token - invalid token
            .state({
                name: "account:validatePasswordResetToken.invalid",
                url: "/invalid-token",
                templateUrl: "app/account/partials/validate_password_reset_token_invalid.html",
                controller: "ValidatePasswordResetTokenInvalidCtrl",
                title: "Reset password - Reme.io"
            })

            /////////////////////////
            /*Sign up related views*/
            /////////////////////////

            // Sign up confirm abstract view
            .state({
                name: "account:confirmRegistration",
                url: "/account/confirm-registration",
                templateUrl: "app/account/partials/signup_confirm_abstract.html",
                abstract: true
            })
            // Sign up confirm - valid
            .state({
                name: "account:confirmRegistration.valid",
                url: "/{email}/{token}",
                templateUrl: "app/account/partials/signup_confirm_valid.html",
                controller: "SignUpConfirmCtrl",
                resolve: {
                    validateRegistrationResult: ["$stateParams", "$q", "AuthService", "$state", function ($stateParams, $q, AuthService, $state) {
                        var deferred = $q.defer();

                        AuthService.validateRegistrationToken($stateParams.email, $stateParams.token)
                            .then(function (response) {
                                deferred.resolve({
                                    email: $stateParams.email,
                                    token: $stateParams.token
                                });
                                return response;
                            })
                            .catch(function (response) {
                                $state.go("account:confirmRegistration.invalid");
                                return response;
                            });

                        return deferred.promise;
                    }]
                },
                title: "Register - Reme.io"
            })
            // Sign up confirm - invalid
            .state({
                name: "account:confirmRegistration.invalid",
                url: "/registration-failed",
                templateUrl: "app/account/partials/signup_confirm_invalid.html",
                controller: "SignUpConfirmInvalidCtrl",
                title: "Register - Reme.io"
            });
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
        create: "accounts/create/:email/:token",
        update: "accounts/update",
        details: "accounts/details",
        requestPasswordReset: "accounts/request_password_reset_token",
        requestSignUpRegistration: "accounts/send_email_verification_token",
        validatePasswordResetToken: "accounts/validate_password_reset_token/:email/:token",
        validateRegistrationToken: "accounts/validate_email_verification_token/:email/:token",
        updatePassword: "accounts/update_password",
        resetPasswordWithToken: "accounts/reset_password_with_token/:email/:token",
        refreshToken: "auth/refresh_token"
    })
    .constant("ACCOUNT_FORM_STATE", {
        login: "login",
        logout: "logout",
        signUp: "signUp",
        signUpSuccessfully: "signUpSuccessfully",
        forgotPassword: "forgotPassword",
        forgotPasswordEmailSent: "forgotPasswordEmailSent",
        requestSignUpRegistration: "requestSignUpRegistration",
        requestSignUpRegistrationEmailSent: "requestSignUpRegistrationEmailSent",
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
    .controller("ForgotPasswordCtrl", ["$state", "$scope", "flash", "ALERTS_CONSTANTS", "AuthService", "AUTH_EVENTS", "ACCOUNT_FORM_STATE", "AccountFormToggle", function ($state, $scope, flash, ALERTS_CONSTANTS, AuthService, AUTH_EVENTS, ACCOUNT_FORM_STATE, AccountFormToggle) {

        /**
         * Alert identifier
         */
        $scope.alertIdentifierId = ALERTS_CONSTANTS.forgotPassword;

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
                        AccountFormToggle.setState(ACCOUNT_FORM_STATE.forgotPasswordEmailSent);
                    })
                    .catch(function (response) {
                        flash.to($scope.alertIdentifierId).error = response.data && response.data.errors && response.data.errors[0];
                    });
            }
        };
    }]);
;/**
 * Login controller responsible for user login actions.
 */
angular
    .module("account")
    .controller("LoginCtrl", ["$scope", "flash", "ALERTS_CONSTANTS", "AuthService", "AUTH_EVENTS", "ACCOUNT_FORM_STATE", "AccountFormToggle", "StatesHandler", "$timeout", function ($scope, flash, ALERTS_CONSTANTS, AuthService, AUTH_EVENTS, ACCOUNT_FORM_STATE, AccountFormToggle, StatesHandler, $timeout) {

        /**
         * Alert identifier
         */
        $scope.alertIdentifierId = ALERTS_CONSTANTS.login;

        /**
         * Set default state.
         */
        AccountFormToggle.setState(ACCOUNT_FORM_STATE.login);

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

                // Show the loading bar
                $scope.isRequestPending = true;

                AuthService
                    .login(loginData.email, loginData.password)
                    .then(function () {

                        StatesHandler.goToReminders();
                    })
                    .catch(function () {
                        /* If bad feedback from server */
                        $scope.badPostSubmitResponse = true;

                        flash.to($scope.alertIdentifierId).error = "Your email or password are wrong. Please try again.";
                    }).finally(function () {
                        // Stop the loading bar
                        $timeout(function () {
                            $scope.isRequestPending = false;
                        }, 2000);
                    })
            }
        };
    }]);
;/**
 * Logout controller responsible for user logout actions.
 */
angular
    .module("account")
    .controller("LogoutCtrl", ["$scope", "$timeout", "StatesHandler", "isSuccessfullyLoggedOut", function ($scope, $timeout, StatesHandler, isSuccessfullyLoggedOut) {

        $scope.isSuccessfullyLoggedOut = isSuccessfullyLoggedOut;

        /**
         * Redirect to home after 1,5 sec.
         */
        $timeout(function () {
            StatesHandler.goHome();
        }, 1500);

    }]);
;/**
 * Preferences controller responsible for user update preferences action.
 */
angular
    .module("account")
    .controller("PreferencesCtrl", ["$q", "$scope", "$rootScope", "TimezoneProvider", "flash", "ALERTS_CONSTANTS", function ($q, $scope, $rootScope, TimezoneProvider, flash, ALERTS_CONSTANTS) {

        /**
         * Alert identifier
         */
        $scope.alertIdentifierId = ALERTS_CONSTANTS.preferences;

        /**
         * Current user.
         * @type {$rootScope.currentUser|*}
         */
        $scope.user = $rootScope.currentUser;

        /**
         * Profile user information
         */
        $scope.preferencesData = {
            firstName: $scope.user.model.firstName,
            lastName: $scope.user.model.lastName,
            email: $scope.user.model.email,
            timezone: $scope.user.model.timezone
        };

        /**
         * Available timezones.
         */
        $scope.timezones = TimezoneProvider.getTimezones();

        /**
         * Update preferences functionality.
         */
        $scope.updatePreferences = function (preferencesData) {

            if ( $scope.preferencesForm.$valid ) {

                // Update the user
                $scope.user
                    .$save(preferencesData)
                    .then(function () {
                        $scope.preferencesForm.$setPristine();

                        flash.to($scope.alertIdentifierId).success = 'We\'ve successfully updated your preferences!';
                    })
                    .catch(function () {

                        flash.to($scope.alertIdentifierId).error = 'We\'ve encountered an error while trying to update your preferences.';
                    });
            }
        };

    }]);;/**
 * Profile controller responsible for user update profile action.
 */
angular
    .module("account")
    .controller("ProfileCtrl", ["$q", "$scope", "$rootScope", "StatesHandler", "ProfileFormToggle", "ACCOUNT_FORM_STATE", "flash", "ALERTS_CONSTANTS", "MIXPANEL_EVENTS", function ($q, $scope, $rootScope, StatesHandler, ProfileFormToggle, ACCOUNT_FORM_STATE, flash, ALERTS_CONSTANTS, MIXPANEL_EVENTS) {

        /**
         * Alert identifier
         */
        $scope.alertIdentifierId = ALERTS_CONSTANTS.updateProfile;

        /**
         * Track event.
         */
        mixpanel.track(MIXPANEL_EVENTS.settings);

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
         * Profile user information
         */
        $scope.profileData = {
            firstName: $scope.user.model.firstName,
            lastName: $scope.user.model.lastName,
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
                            $scope.profileForm.$setPristine();

                            flash.to($scope.alertIdentifierId).success = 'We\'ve successfully updated your account!';
                        });
                    })
                    .catch(function () {

                        flash.to($scope.alertIdentifierId).error = 'We\'ve encountered an error while trying to update your account.';
                    });
            }
        };

        $scope.getMeBack = function () {
            StatesHandler.goToReminders();
        };
    }]);;/**
 * Request registration controller responsible for first sign up action on the home page, having only the email.
 */
angular
    .module("account")
    .controller("RequestSignUpRegistrationCtrl", ["$scope", "AuthService", "ACCOUNT_FORM_STATE", "AccountFormToggle", "MIXPANEL_EVENTS", function ($scope, AuthService, ACCOUNT_FORM_STATE, AccountFormToggle, MIXPANEL_EVENTS) {

        /**
         * Request registration up user information.
         */
        $scope.requestSignUpRegistrationData = {
            email: ""
        };

        /**
         * Request registration functionality.
         */
        $scope.requestSignUpRegistration = function () {

            if ( $scope.requestSignUpRegistrationForm.$valid ) {

                // Show the loading bar
                $scope.isRequestPending = true;

                AuthService
                    .requestSignUpRegistration($scope.requestSignUpRegistrationData.email)
                    .then(function () {
                        /**
                         * Track event.
                         */
                        mixpanel.track(MIXPANEL_EVENTS.signUpRequested);

                        AccountFormToggle.setState(ACCOUNT_FORM_STATE.requestSignUpRegistrationEmailSent);
                    }).finally(function () {
                        // Stop the loading bar
                        $scope.isRequestPending = false;
                    })
            }
        };
    }]);
;angular
    .module("account")
    .controller("SignUpConfirmCtrl", ["$scope", "$timeout", "flash", "ALERTS_CONSTANTS", "StatesHandler", "User", "AuthService", "validateRegistrationResult", "TimezoneProvider", "MIXPANEL_EVENTS", function ($scope, $timeout, flash, ALERTS_CONSTANTS, StatesHandler, User, AuthService, validateRegistrationResult, TimezoneProvider, MIXPANEL_EVENTS) {

        /**
         * Alert identifier
         */
        $scope.alertIdentifierId = ALERTS_CONSTANTS.signUpConfirm;

        /**
         * Validate registration result.
         */
        $scope.validateRegistrationResult = validateRegistrationResult;

        /**
         * The given token
         * @type {.twitter.oauth.token|*|.yahoo.oauth.token|.dropbox.oauth.token|.flickr.oauth.token|token}
         */
        var token = $scope.validateRegistrationResult.token;

        /**
         * Sign up user information.
         * @type {{firstName: string, lastName: string, email: string, password: string}}
         */
        $scope.signUpData = {
            firstName: "",
            lastName: "",
            email: $scope.validateRegistrationResult.email,
            password: "",
            timezone: jstz.determine().name()
        };

        /**
         * Timezone details
         */
        $scope.timezoneDetails = TimezoneProvider.getTimezoneDescription($scope.signUpData.timezone);

        /*
         * Sign up functionality.
         * @param signUpData
         */
        $scope.signUp = function (signUpData) {
            if ( $scope.signUpForm.$valid ) {

                // Compute timezone
                $scope.signUpData.timezone = jstz.determine().name();

                // Create a new user
                User.$new()
                    .$create(signUpData, token)
                    .then(function () {
                        /**
                         * Track event.
                         */
                        mixpanel.track(MIXPANEL_EVENTS.signUpCompleted);

                        // Log in the user
                        AuthService
                            .login(signUpData.email, signUpData.password)
                            .then(function () {
                                StatesHandler.goToReminders();
                            });
                    })
                    .catch(function () {
                        /* If bad feedback from server */
                        $scope.badPostSubmitResponse = true;

                        flash.to($scope.alertIdentifierId).error = "Sorry, something went wrong.";
                    });
            }
        };

    }]);
;angular
    .module("account")
    .controller("SignUpConfirmInvalidCtrl", ["$scope", "AuthService", "StatesHandler", function ($scope, AuthService, StatesHandler) {

        /**
         * Flag which tells if user is currently authenticated while coming to this page.
         */
        $scope.isUserAuthenticated = AuthService.isAuthenticated();

        /**
         * Continues to reset password page. (try again functionality)
         */
        $scope.goHome = function () {
            if ( $scope.isUserAuthenticated ) {
                AuthService.logout();
            }
            StatesHandler.goHome();
        };
    }]);
;/**
 * Update password controller.
 */
angular
    .module("account")
    .controller("UpdatePasswordCtrl", ["$scope", "flash", "AuthService", "ACCOUNT_FORM_STATE", "ALERTS_CONSTANTS", "ProfileFormToggle", function ($scope, flash, AuthService, ACCOUNT_FORM_STATE, ALERTS_CONSTANTS, ProfileFormToggle) {

        /**
         * Alert identifier
         */
        $scope.alertIdentifierId = ALERTS_CONSTANTS.updatePassword;

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
                        ProfileFormToggle.setState(ACCOUNT_FORM_STATE.updatePasswordSuccessfully);
                    })
                    .catch(function (response) {
                        /* If bad feedback from server */
                        $scope.badPostSubmitResponse = true;

                        flash.to($scope.alertIdentifierId).error = response.data && response.data.errors && response.data.errors[0];
                    });
            }
        };
    }]);;angular
    .module("account")
    .controller("ValidatePasswordResetTokenCtrl", ["$scope", "$timeout", "flash", "AuthService", "StatesHandler", "ProfileFormToggle", "ACCOUNT_FORM_STATE", "validateTokenResult", "ALERTS_CONSTANTS", function ($scope, $timeout, flash, AuthService, StatesHandler, ProfileFormToggle, ACCOUNT_FORM_STATE, validateTokenResult, ALERTS_CONSTANTS) {

        /**
         * Alert identifier
         */
        $scope.alertIdentifierId = ALERTS_CONSTANTS.validatePassword;

        /**
         * Reset password data (used if
         * @type {{email: string, password: string, passwordConfirmation: string, token: *}}
         */
        $scope.resetPasswordData = {
            email: validateTokenResult.email,
            password: "",
            passwordConfirmation: "",
            token: validateTokenResult.token
        };

        /**
         * Reset password data functionality.
         * @param resetPasswordData
         */
        $scope.resetPassword = function (resetPasswordData) {
            if ( $scope.resetPasswordForm.$valid ) {

                AuthService
                    .resetPasswordWithToken(resetPasswordData.email, resetPasswordData.password, resetPasswordData.passwordConfirmation, resetPasswordData.token)
                    .then(function () {
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
                    .catch(function () {
                        /* If bad feedback from server */
                        $scope.badPostSubmitResponse = true;

                        flash.to($scope.alertIdentifierId).error = "Sorry, something went wrong.";
                    });
            }
        };

    }]);
;angular
    .module("account")
    .controller("ValidatePasswordResetTokenInvalidCtrl", ["$scope", "AuthService", "StatesHandler", "ProfileFormToggle", "ACCOUNT_FORM_STATE", function ($scope, AuthService, StatesHandler, ProfileFormToggle, ACCOUNT_FORM_STATE) {

        /**
         * Flag which tells if user is currently authenticated while coming to this page.
         */
        $scope.isUserAuthenticated = AuthService.isAuthenticated();

        /**
         * Continues to reset password page. (try again functionality)
         */
        $scope.continueToResetPassword = function () {
            if ( $scope.isUserAuthenticated ) {
                AuthService.logout();
            }
            ProfileFormToggle.setState(ACCOUNT_FORM_STATE.forgotPassword);
            StatesHandler.goToLogin();
        };

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
                };
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
                 * Check whether a string is a valid email address.
                 *
                 * @param email
                 * @returns {boolean}
                 */
                function isValidEmail(email) {
                    return /[^\s@]+@[^\s@]+\.[^\s@]+/.test(email);
                }

                /**
                 * Check whether an email address is unique.
                 *
                 * @param email
                 * @returns {promise|defer.promise}
                 */
                function isUniqueEmail(email) {

                    // Create deferred
                    var deferred = $q.defer();

                    if ( !isValidEmail(email) ) {
                        deferred.resolve(false);
                    } else {
                        UserService
                            .isUnique(email)

                            .then(function (isUnique) {
                                deferred.resolve(isUnique);
                            });
                    }

                    return deferred.promise;
                }

                // Re-validate on change
                scope.$watch("ngModel", function (value) {

                    if ( isValidEmail(value) ) {

                        // Set validity
                        isUniqueEmail(value)
                            .then(function (data) {

                                // Make sure we are validating the latest value of the model (asynchronous responses)
                                if ( data.email == ngModel.$viewValue ) {
                                    ngModel.$setValidity('uniqueEmail', data.isUnique);
                                }
                            });
                    }
                });

            }
        };
    }]);;/**
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
                };
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



;angular
    .module("account")
    .value('redirectToUrlAfterLogin', { url: undefined });;/**
 * Authentication service which encapsulates the whole logic account related of a user.
 */
angular
    .module("account")
    .service("AuthService", ["$rootScope", "$q", "$http", "$location", "redirectToUrlAfterLogin", "SessionService", "AUTH_EVENTS", "AUTH_URLS", "AUTH_TOKEN_HEADER", function ($rootScope, $q, $http, $location, redirectToUrlAfterLogin, SessionService, AUTH_EVENTS, AUTH_URLS, AUTH_TOKEN_HEADER) {

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
         * Request registration functionality
         * @param email
         * @returns {*}
         */
        this.requestSignUpRegistration = function (email) {
            return $http.post(URLTo.api(AUTH_URLS.requestSignUpRegistration), {
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
                .post(URLTo.api(AUTH_URLS.resetPasswordWithToken, { ":email": email, ":token": token }),
                {
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
        this.validatePasswordResetToken = function (email, token) {
            return $http
                .get(URLTo.api(AUTH_URLS.validatePasswordResetToken, { ":email": email, ":token": token }),
                {
                    skipAuthorization: true
                }).then(function (response) {
                    return response.data;
                });
        };

        /**
         * Validate registration email token.
         *
         * @param token
         * @param email
         * @returns {*}
         */
        this.validateRegistrationToken = function (email, token) {
            return $http
                .get(URLTo.api(AUTH_URLS.validateRegistrationToken, { ":email": email, ":token": token }),
                {
                    skipAuthorization: true
                })
                .then(function (response) {
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

        this.saveAttemptUrl = function () {
            if ( $location.path().toLowerCase() !== '/account' ) {
                redirectToUrlAfterLogin.url = $location.path();
            }
        };

        this.redirectToAttemptedUrl = function () {
            if ( redirectToUrlAfterLogin.url ) {
                $location.path(redirectToUrlAfterLogin.url);

                redirectToUrlAfterLogin.url = undefined;
            }
        }
    }]);
;/**
 * Authentication service filter used to redirect user to the home page if it is already logged in.
 */
angular
    .module("account")
    .service("AuthFilter", ["AuthService", "StatesHandler", function (AuthService, StatesHandler) {

        return function (event, toState) {
            if ( (toState.url === '/account' || toState.name === "home") && AuthService.isAuthenticated() ) {

                // Prevent transition
                event.preventDefault();
                StatesHandler.goToReminders();
            } else if ( (toState.url.indexOf("/settings") > -1 || toState.url.indexOf("/reminders") > -1) && !AuthService.isAuthenticated() ) {

                // Prevent transition
                event.preventDefault();
                AuthService.saveAttemptUrl();
                StatesHandler.goToLogin();
            }
        };

    }]);;/**
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
             * @returns {*}
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
                            isUnique: _.isEmpty(response.data && response.data.errors),
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
    .factory("User", ["SessionService", "TransformerUtils", "$q", "$http", "AUTH_URLS", function (SessionService, TransformerUtils, $q, $http, AUTH_URLS) {
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
                        timezone: "",
                        helpdeskAuthToken: ""
                    },

                    /**
                     * Is user already authenticated
                     * @returns {*}
                     */
                    isAuthenticated: function () {
                        return SessionService.sessionExists();
                    },

                    /**
                     * Loads a user from cookies.
                     * @returns {*}
                     */
                    loadFromSession: function () {
                        TransformerUtils.copyKeysFromTo(SessionService.getData() || {}, this.model);

                        return this;
                    },

                    /**
                     * Saves a user to cookies.
                     * @returns {*}
                     */
                    saveToSession: function () {
                        var sessionData = {};
                        TransformerUtils.copyKeysFromTo(this, sessionData, ["password"]);
                        SessionService.setData(sessionData);

                        return this;
                    },

                    /**
                     * Updates a user account.
                     * @returns {*}
                     */
                    $save: function (fromData) {
                        var toBeSaved = {};
                        TransformerUtils.copyKeysFromTo(fromData, toBeSaved);

                        return this.updateAccount(toBeSaved);
                    },

                    /**
                     * Creates a user account with given fromData.
                     * @param fromData
                     * @param token
                     * @returns {*}
                     */
                    $create: function (fromData, token) {
                        var toBeCreated = {};
                        TransformerUtils.copyKeysFromTo(fromData, toBeCreated);

                        return this.createAccount(toBeCreated, token);
                    },

                    $refresh: function () {
                        var that = this;

                        return this
                            .retrieveDetails()
                            .then(function (response) {
                                TransformerUtils.copyKeysFromTo(response.data, that);
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
                     * @param token
                     * @returns {*}
                     */
                    createAccount: function (account, token) {
                        return $http
                            .post(URLTo.api(AUTH_URLS.create, {
                                ":email": account.email,
                                ":token": token
                            }), account,
                            { skipAuthorization: true })
                            .then(function (response) {
                                return response.data;
                            });
                    },

                    /**
                     * Updates given account.
                     * @param account
                     * @returns {*}
                     */
                    updateAccount: function (account) {
                        return $http.post(URLTo.api(AUTH_URLS.update), account);
                    }

                };
            }

        };
    }]);;/**
 * Main site module declaration including ui templates.
 */
angular
    .module("site", [
        "common"
    ])
    .config(["$stateProvider", "$urlRouterProvider", function ($stateProvider, $urlRouterProvider) {

        // Otherwise
        $urlRouterProvider.otherwise('/404');

        // Home
        $stateProvider

            // Home page
            .state("home", {
                url: "/",
                templateUrl: "app/site/partials/home.html",
                controller: "LandingPageCtrl",
                title: "Create email reminders in seconds - Reme"
            })
            .state("privacy", {
                url: "/privacy",
                templateUrl: "app/site/partials/privacy.html",
                title: "Privacy - Reme"
            })
            .state("about", {
                url: "/about",
                templateUrl: "app/site/partials/about.html",
                title: "About - Reme"
            })
            .state("404", {
                url: "/404",
                templateUrl: "app/site/partials/404.html",
                controller: "Error404PageCtrl",
                title: "Hmm... looks like a 404"
            })
            .state("500", {
                url: "/500",
                templateUrl: "app/site/partials/500.html",
                controller: "Error500PageCtrl",
                title: "Oops... You found a 500"
            });
    }]);
;/**
 * Abstract error page controller.
 */
angular
    .module("common")
    .controller("AbstractErrorPageCtrl", ["$scope", "StatesHandler", function ($scope, StatesHandler) {

        /**
         * Track event.
         */
        $scope.trackErrorEvent = function (event) {
            mixpanel.track(event);
        };

        /**
         * Continues to home page.
         */
        $scope.goToHomePage = function () {
            StatesHandler.goHome();
        };
    }]);
;/**
 * 404 page controller.
 */
angular
    .module("common")
    .controller("Error404PageCtrl", ["$scope", "$controller", "MIXPANEL_EVENTS", function ($scope, $controller, MIXPANEL_EVENTS) {

        /**
         * Inherit from this controller
         */
        $controller('AbstractErrorPageCtrl', { $scope: $scope });

        /**
         * Track error event
         */
        $scope.trackErrorEvent(MIXPANEL_EVENTS.error404);
    }]);
;/**
 * 500 page controller.
 */
angular
    .module("common")
    .controller("Error500PageCtrl", ["$scope", "$controller", "MIXPANEL_EVENTS", function ($scope, $controller, MIXPANEL_EVENTS) {

        /**
         * Inherit from this controller
         */
        $controller('AbstractErrorPageCtrl', { $scope: $scope });

        /**
         * Track error event
         */
        $scope.trackErrorEvent(MIXPANEL_EVENTS.error500);
    }]);;/**
 * Landing page controller.
 */
angular
    .module("common")
    .controller("LandingPageCtrl", ["$state", "$scope", "AccountFormToggle", "ACCOUNT_FORM_STATE", "MIXPANEL_EVENTS", function ($state, $scope, AccountFormToggle, ACCOUNT_FORM_STATE, MIXPANEL_EVENTS) {

        /**
         * Track event.
         */
        mixpanel.track(MIXPANEL_EVENTS.landingPageLoaded);

        /**
         * Set default state.
         */
        AccountFormToggle.setState(ACCOUNT_FORM_STATE.requestSignUpRegistration);
    }]);
;/**
 * Main site module declaration including ui templates.
 */
angular
    .module("reminders", [
        "ui.router",
        "ui.bootstrap.transition",
        "ui.bootstrap.datepicker",
        "ui.bootstrap.dropdown",
        "ui.bootstrap.modal",
        "ui.bootstrap.tabs",
        "angular-ladda",
        "common"
    ])
    .config(["$stateProvider", function ($stateProvider) {

        $stateProvider

            .state("reminders", {
                url: "/reminders",
                templateUrl: 'app/reminders/partials/reminder/reminders.template.html',
                abstract: true
            })

            // Regular case
            .state("reminders.regular", {
                url: "",
                views: {

                    'action': {
                        templateUrl: "app/reminders/partials/reminder/reminders.action.html",
                        controller: "ReminderCtrl"
                    },

                    'list': {
                        templateUrl: "app/reminders/partials/reminder/reminders.list.html",
                        controller: "ReminderListCtrl",
                        resolve: {
                            pastAndUpcomingReminders: ["ReminderService", function (ReminderService) {
                                return ReminderService
                                    .getAllRemindersGrouped();
                            }]
                        }
                    }
                },
                title: "Reminders - Reme.io"
            })

            // Review case
            .state("reminders.update", {
                url: "/{reminderId}/update",
                views: {

                    'action': {
                        templateUrl: "app/reminders/partials/reminder/reminders.action.html",
                        controller: "ReminderAutoEditCtrl",
                        resolve: {
                            reminderToReview: ["$stateParams", "$q", "$state", "ReminderService", function ($stateParams, $q, $state, ReminderService) {
                                var deferred = $q.defer();

                                ReminderService
                                    .getDetails($stateParams.reminderId)
                                    .then(function (response) {
                                        deferred.resolve(response);

                                        return response;
                                    })
                                    .catch(function (response) {

                                        $state.go("reminders.regular");
                                        return response;
                                    });

                                return deferred.promise;
                            }]
                        }

                    },

                    'list': {
                        templateUrl: "app/reminders/partials/reminder/reminders.list.html",
                        controller: "ReminderListCtrl",
                        resolve: {
                            pastAndUpcomingReminders: ["ReminderService", function (ReminderService) {
                                return ReminderService
                                    .getAllRemindersGrouped();
                            }]
                        }
                    }
                },
                title: "Preview reminder - Reme.io"
            })

            // Opened modal
            .state("reminders.new", {
                url: "/new",
                views: {

                    'action': {
                        templateUrl: "app/reminders/partials/reminder/reminders.action.html",
                        controller: "ReminderAutoOpenCtrl"
                    },

                    'list': {
                        templateUrl: "app/reminders/partials/reminder/reminders.list.html",
                        controller: "ReminderListCtrl",
                        resolve: {
                            pastAndUpcomingReminders: ["ReminderService", function (ReminderService) {
                                return ReminderService
                                    .getAllRemindersGrouped();
                            }]
                        }
                    }
                },
                title: "Preview reminder - Reme.io"
            })

    }]);;/**
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
        upcomingReminders: "reminders/upcoming?:local_time&:local_time_zone",
        unSubscribeReminder: "reminders/:reminderId/unsubscribe"
    })
    .constant("REMINDER_EVENTS", {
        isCreated: "reminder-is-created",
        isUnSubscribed: "reminder-is-unsubscribed",
        isDeleted: "reminder-is-deleted",
        isUpdated: "reminder-is-updated"
    });;angular
    .module("reminders")
    .controller("ReminderAutoEditCtrl", ["$scope", "$timeout", "ReminderModalService", "ReminderUpdateModalService", "reminderToReview", function ($scope, $timeout, ReminderModalService, ReminderUpdateModalService, reminderToReview) {

        /**
         * Auto open the modal.
         */
        $timeout(function () {
            ReminderUpdateModalService.open(reminderToReview, -1);
        });

        $scope.openReminderModalService = function () {
            ReminderModalService.open();
        };
    }]);
;angular
    .module("reminders")
    .controller("ReminderAutoOpenCtrl", ["$scope", "$timeout", "ReminderModalService", function ($scope, $timeout, ReminderModalService) {

        /**
         * Auto open the modal.
         */
        $timeout(function () {
            ReminderModalService.open();
        });

        $scope.openReminderModalService = function () {
            ReminderModalService.open();
        };
    }]);
;angular
    .module("reminders")
    .controller("ReminderModalCtrl", ["$scope", "$rootScope", "$stateParams", "$window", "ReminderModalService", "ReminderUpdateModalService", "reminder", "reminderIndex", "$timeout", "StatesHandler", "REMINDER_EVENTS", "flash", "MIXPANEL_EVENTS", "ALERTS_CONSTANTS", "DATE_SOURCE", function ($scope, $rootScope, $stateParams, $window, ReminderModalService, ReminderUpdateModalService, reminder, reminderIndex, $timeout, StatesHandler, REMINDER_EVENTS, flash, MIXPANEL_EVENTS, ALERTS_CONSTANTS, DATE_SOURCE) {

        /**
         * Alert identifier
         */
        $scope.alertIdentifierId = ALERTS_CONSTANTS.createUpdateReminder;

        /**
         * Keep master reminder.
         * @type {XMLList|XML|*}
         */
        $scope.masterReminder = reminder;

        /**
         * Work with a copy of master reminder
         */
        $scope.reminder = angular.copy($scope.masterReminder);

        /**
         * Flag which says whether reminder is new or not.
         */
        $scope.isNew = $scope.reminder.isNew();

        /**
         * Set the date source - if is update action.
         */
        if ( !$scope.isNew ) {
            $scope.reminder.model.dueOn[DATE_SOURCE.isFromUpdateAction] = true;
        }

        /**
         * Flag which represents whether
         * @type {boolean}
         */
        $scope.isSaving = false;

        /**
         * Minimum date to create reminder.
         * @type {Date}
         */
        $scope.minDate = moment().hours(0).minutes(0).seconds(0);

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

        /**
         * If create reminder modal is opened
         */
        if ( ReminderModalService.modalInstance ) {
            ReminderModalService.modalInstance
                .opened
                .then(function () {
                    $scope.isModalOpened = true;
                }
            );
        }

        /**
         * If update reminder modal is opened
         */
        if ( ReminderUpdateModalService.modalInstance ) {
            ReminderUpdateModalService.modalInstance
                .opened
                .then(function () {
                    $scope.isModalOpened = true;
                }
            );
        }

        /**
         * Dismiss the create/update modal.
         */
        $scope.dismissFeedbackModal = function () {
            var currentModal = $scope.isNew ? ReminderModalService.modalInstance : ReminderUpdateModalService.modalInstance;
            currentModal.dismiss("cancel");

            $scope.isModalOpened = false;
        };

        /**
         * Saves the reminder or updates it.
         * @param reminderForm
         */
        $scope.saveReminder = function (reminderForm) {
            if ( reminderForm.$valid && !$scope.isSaving ) {

                var isDateInPast = moment().diff($scope.reminder.model.dueOn || reminderForm.selectedDate) > 0;
                if ( reminderForm.selectedDate.$invalid && !isDateInPast ) {
                    reminderForm.selectedDate.$setValidity('validDate', false);
                    flash.to($scope.alertIdentifierId).error = "Please make sure that the date and time are in the future.";

                    return;
                }

                // Is saving reminder
                $scope.isSaving = true;

                // Ok, update master reminder.
                angular.copy($scope.reminder, $scope.masterReminder);

                $scope.masterReminder.save()
                    .then(function () {

                        /**
                         * Track event.
                         */
                        mixpanel.track($scope.isNew ? MIXPANEL_EVENTS.reminderCreated : MIXPANEL_EVENTS.reminderUpdated);

                        if ( $scope.isNew ) {
                            $timeout(function () {
                                $scope.isSaving = false;

                                ReminderModalService.modalInstance.close();
                                $rootScope.$broadcast(REMINDER_EVENTS.isCreated, {
                                    reminder: $scope.masterReminder,
                                    message: 'Reminder successfully saved!'
                                });
                            }, 800);
                        }
                        else {
                            $timeout(function () {
                                $scope.isSaving = false;

                                // Close the modal
                                ReminderUpdateModalService.modalInstance.close();
                                $rootScope.$broadcast(REMINDER_EVENTS.isUpdated, {
                                    reminder: $scope.masterReminder,
                                    reminderIndex: reminderIndex,
                                    message: 'Reminder successfully updated!'
                                });
                            }, 800);
                        }
                    })
                    .catch(function () {

                        // Error
                        $scope.isSaving = false;
                        alert("Something went wrong. Please try again.");
                    })
                    .finally(function () {

                        $scope.isModalOpened = false;
                    });
            }
        };

    }]);
;angular
    .module("reminders")
    .controller("ReminderDeleteModalCtrl", ["$scope", "$rootScope", "$stateParams", "$window", "ReminderDeleteModalService", "$timeout", "StatesHandler", "REMINDER_EVENTS", "reminder", "reminderIndex", "MIXPANEL_EVENTS", function ($scope, $rootScope, $stateParams, $window, ReminderDeleteModalService, $timeout, StatesHandler, REMINDER_EVENTS, reminder, reminderIndex, MIXPANEL_EVENTS) {

        /**
         * Reminder to be created (injected with few default values)
         */
        $scope.reminder = reminder;

        /**
         * The current user
         * @type {$rootScope.currentUser|*}
         */
        $scope.user = $rootScope.currentUser;

        /**
         * Flag which represents whether
         * @type {boolean}
         */
        $scope.isDeleting = false;

        /**
         * Dismiss the modal.
         */
        $scope.dismiss = function () {
            ReminderDeleteModalService.modalInstance.dismiss("cancel");

            $scope.isModalOpened = false;
        };

        /**
         * Remove reminder - owner action;
         */
        $scope.deleteReminderAndClose = function () {
            if ( !$scope.isDeleting ) {

                // Is deleting reminder
                $scope.isDeleting = true;

                // Destroy reminder
                $scope.reminder.destroy()
                    .then(function () {

                        /**
                         * Track event.
                         */
                        mixpanel.track(MIXPANEL_EVENTS.reminderDeleted);

                        // Wait 2 seconds, and close the modal
                        $timeout(function () {
                            ReminderDeleteModalService.modalInstance.close();
                            $rootScope.$broadcast(REMINDER_EVENTS.isDeleted, {
                                reminder: $scope.reminder,
                                reminderIndex: reminderIndex,
                                message: 'Reminder successfully deleted!'
                            });
                        }, 400);
                    })
                    .catch(function () {

                        // Error
                        $scope.isDeleting = false;
                        alert("Something went wrong. Please try again.");
                    });
            }
        };

        /**
         * Un subscribe from reminder - recipient action.
         */
        $scope.unSubscribeFromReminderAndClose = function () {
            if ( !$scope.isDeleting ) {

                // Is deleting reminder
                $scope.isDeleting = true;

                $scope.reminder.unSubscribe()
                    .then(function () {

                        /**
                         * Track event.
                         */
                        mixpanel.track(MIXPANEL_EVENTS.reminderUnSubscribed);

                        $timeout(function () {
                            ReminderDeleteModalService.modalInstance.close();
                            $rootScope.$broadcast(REMINDER_EVENTS.isUnSubscribed, {
                                reminder: $scope.reminder,
                                reminderIndex: reminderIndex,
                                message: 'Successfully un-subscribed from this reminder!'
                            });
                        }, 400);
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
    .controller("ReminderListCtrl", ["$scope", "$rootScope", "flash", "ReminderDeleteModalService", "ReminderModalService", "ReminderUpdateModalService", "ReminderGroupService", "ReminderMatchingGroupService", "REMINDER_EVENTS", "$timeout", "pastAndUpcomingReminders", "MIXPANEL_EVENTS", "ALERTS_CONSTANTS", function ($scope, $rootScope, flash, ReminderDeleteModalService, ReminderModalService, ReminderUpdateModalService, ReminderGroupService, ReminderMatchingGroupService, REMINDER_EVENTS, $timeout, pastAndUpcomingReminders, MIXPANEL_EVENTS, ALERTS_CONSTANTS) {

        /**
         * Alert identifier
         */
        $scope.alertIdentifierId = ALERTS_CONSTANTS.reminderList;

        /**
         * Track event.
         */
        mixpanel.track(MIXPANEL_EVENTS.remindersPage);

        /**
         * The current user
         * @type {$rootScope.currentUser|*}
         */
        $scope.user = $rootScope.currentUser;

        /**
         * Search by text
         * @type {string}
         */
        $scope.searchByText = "";

        $scope.openReminderModalService = function () {
            ReminderModalService.open();
        };

        /**
         * Upcoming reminders
         */
        $scope.upcomingReminders = pastAndUpcomingReminders.upcomingReminders;
        ReminderMatchingGroupService.populateRemindersWithMatchingGroups($scope.upcomingReminders, false);

        /**
         * Past reminders
         */
        $scope.pastReminders = pastAndUpcomingReminders.pastReminders;
        ReminderMatchingGroupService.populateRemindersWithMatchingGroups($scope.pastReminders, true);

        /**
         * Reminders tabs.
         */
        $scope.reminderTabs = {
            upcomingRemindersTabActive: true,
            pastRemindersTabActive: false,

            /**
             * Set upcoming tab active.
             */
            setUpcomingRemindersTabActive: function () {
                this.upcomingRemindersTabActive = true;
                this.pastRemindersTabActive = false;
            }
        };

        /**
         * On reminder created, display a success message, and add reminder to the list.
         */
        $scope.$on(REMINDER_EVENTS.isCreated, function (event, args) {
            ReminderMatchingGroupService.populateReminderWithMatchingGroup(args.reminder, false);
            $scope.upcomingReminders.push(args.reminder);
            $scope.reminderTabs.setUpcomingRemindersTabActive();
        });

        /**
         * On reminder updated.
         */
        $scope.$on(REMINDER_EVENTS.isUpdated, function (event, args) {
            ReminderMatchingGroupService.populateReminderWithMatchingGroup(args.reminder, false);

            var result = _.some($scope.pastReminders, function (topic) {
                return topic.model.reminderId === args.reminder.model.reminderId;
            });

            if ( result ) {
                removeReminderFrom($scope.pastReminders, args.reminder);
                $scope.upcomingReminders.push(args.reminder);

                $scope.reminderTabs.setUpcomingRemindersTabActive();
            }

        });

        /**
         * On reminder deleted, display a success message, and remove the reminder from the list.
         */
        $scope.$on(REMINDER_EVENTS.isDeleted, function (event, args) {
            $timeout(function () {
                removeReminderFrom($scope.upcomingReminders, args.reminder);
                removeReminderFrom($scope.pastReminders, args.reminder);
            });
        });

        /**
         * On reminder un subscribed, display a success message, and remove the reminder from the list.
         */
        $scope.$on(REMINDER_EVENTS.isUnSubscribed, function (event, args) {
            $timeout(function () {
                removeReminderFrom($scope.upcomingReminders, args.reminder);
                removeReminderFrom($scope.pastReminders, args.reminder);
            });
        });

        /**
         * Removes given reminder from the list.
         * @param reminderList
         * @param reminderToBeRemoved
         */
        function removeReminderFrom(reminderList, reminderToBeRemoved) {
            return _.remove(reminderList, function (reminderFromArray) {
                var reminderId = _.parseInt(reminderToBeRemoved.model.reminderId, 10);
                var reminderFromArrayId = _.parseInt(reminderFromArray.model.reminderId, 10);
                if ( _.isNaN(reminderFromArrayId) || _.isNaN(reminderId) ) {
                    return false;
                }

                return reminderFromArrayId === reminderId;
            });
        }
    }]);;/* Email list */

angular
    .module("reminders")
    .directive("bnLogDomCreation", function () {

        // I bind the UI to the $scope.
        function link($scope, element, attributes) {

            console.log(
                $scope.$index
            );

        }

        // Return the directive configuration.
        return ({
            link: link
        });
    });
;/* Email list */

angular
    .module("reminders")
    .directive("reminderList", ["$rootScope", "$timeout", "ReminderDeleteModalService", "ReminderUpdateModalService", "ReminderMatchingGroupService", "REMINDER_EVENTS", function ($rootScope, $timeout, ReminderDeleteModalService, ReminderUpdateModalService, ReminderMatchingGroupService, REMINDER_EVENTS) {
        return {
            restrict: "A",
            scope: {
                reminders: "=",
                searchByText: "="
            },
            templateUrl: "app/reminders/partials/reminder/reminder.list.template.html",
            link: function (scope, el, attrs) {

                /**
                 * The way of sort
                 * @type {boolean}
                 */
                scope.reverseOrder = attrs.sort === "desc";

                /**
                 * Current user email.
                 * @type {User.$new.model.email|*|.$new.model.email}
                 */
                scope.currentUserEmail = $rootScope.currentUser.model.email;

                /**
                 * Default number of reminders to be displayed.
                 * @type {number}
                 */
                scope.defaultRemindersLimit = 5;

                /**
                 * Number of the filtered reminders
                 */
                scope.filteredReminders = 0;

                /**
                 * Tells if the search by is activated;
                 */
                scope.isSearchByActivated = function () {
                    return scope.searchByText !== "" && !_.isUndefined(scope.searchByText);
                };

                /**
                 * Is loading more reminders flag.
                 * @type {boolean}
                 */
                scope.isLoadingMore = false;

                /**
                 * Past reminders limit - initially has the default value.
                 * @type {number}
                 */
                scope.remindersLimit = scope.defaultRemindersLimit;

                /**
                 * Show past reminders block content
                 * @type {boolean}
                 */
                scope.showRemindersContent = true;

                /**
                 * If empty reminders content message should be shown
                 * @type {boolean}
                 */
                scope.showEmptyRemindersContent = attrs.showEmptyContent === "true";

                // ---
                // Set up the toggle reminders content functionality.
                // ---

                if ( attrs.toggleContent === "true" ) {

                    /**
                     * Set reminders content settings
                     * @type {boolean}
                     */
                    scope.showRemindersContent = false;

                    /**
                     * Toggle past reminders content.
                     */
                    scope.togglePastRemindersContent = function () {
                        scope.showRemindersContent = !scope.showRemindersContent;
                    };
                }

                /**
                 * Load more upcoming reminders.
                 */
                scope.loadMoreReminders = function () {
                    scope.isLoadingMore = true;
                    $timeout(function () {
                        scope.remindersLimit = scope.remindersLimit + scope.defaultRemindersLimit;
                        scope.isLoadingMore = false;
                    }, 500);
                };

                /**
                 * Past reminders still to be loaded ?
                 * @returns {boolean}
                 */
                scope.isStillRemindersToBeLoaded = function () {
                    return scope.remindersLimit < scope.reminders.length;
                };

                /**
                 * Open DELETE modal
                 * @param reminder
                 * @param reminderIndex
                 */
                scope.openDeleteReminderModalService = function (reminder, reminderIndex) {
                    ReminderDeleteModalService.open(reminder, reminderIndex);
                };

                /**
                 * Open UN SUBSCRIBE modal - which is the same as DELETE modal.
                 * @param reminder
                 * @param reminderIndex
                 */
                scope.openUnSubscribeReminderModalService = function (reminder, reminderIndex) {
                    ReminderDeleteModalService.open(reminder, reminderIndex);
                };

                /**
                 * Open UPDATE modal
                 * @param reminder
                 * @param reminderIndex
                 */
                scope.openUpdateReminderModalService = function (reminder, reminderIndex) {
                    if ( reminder.isCreatedBy(scope.currentUserEmail) ) {
                        ReminderUpdateModalService.open(reminder, reminderIndex);
                    }
                };

                scope.showGroupIfFirst = function (reminder, reminderIndex) {
                    if ( reminder.isCreatedBy(scope.currentUserEmail) ) {
                        ReminderUpdateModalService.open(reminder, reminderIndex);
                    }
                };

                /**
                 * On reminder deleted flag the deleted index.
                 */
                scope.$on(REMINDER_EVENTS.isDeleted, function (event, args) {
                    // Set the current removed reminder index.
                    scope.removedReminderIndex = args.reminderIndex;
                });

                /**
                 * On reminder updated flag the updated index.
                 */
                scope.$on(REMINDER_EVENTS.isUpdated, function (event, args) {
                    // Set the current updated reminder index.
                    scope.updatedReminderIndex = args.reminderIndex;
                });
            }
        }
    }]);
;angular
    .module("reminders")
    .filter('groupLimit', function () {
        return function (inputGrouped, input, limit) {
            if ( limit > input.length )
                limit = input.length;
            else if ( limit < -input.length )
                limit = -input.length;

            // Should not exceed the limit
            var commonSumIndex = 0;
            var inputGroupedReminders;
            var currentGroupIndex;

            // Remove every reminder from grouped reminders which are more than the limit
            for ( var idx = 0; idx < inputGrouped.length; idx++ ) {
                inputGroupedReminders = inputGrouped[idx].values;

                for ( currentGroupIndex = 0; currentGroupIndex < inputGroupedReminders.length; currentGroupIndex++ ) {
                    commonSumIndex += 1;

                    if ( commonSumIndex > limit ) {
                        inputGroupedReminders.splice(currentGroupIndex, 1);
                    }
                }
            }

            return inputGrouped;
        };
    });;angular
    .module("reminders")
    .filter('highlightSearch', ["$sce", function ($sce) {
        return function (text, phrase) {
            if ( phrase ) text = text.replace(new RegExp('(' + phrase + ')', 'gi'),
                '<span class="reminder__title--highlighted">$1</span>');

            return $sce.trustAsHtml(text)
        };
    }]);;angular
    .module("reminders")
    .filter('remindersHeader', ["$sce", function ($sce) {
        return function (text, reverse) {
            var template = reverse ? '<a class="reminder-list-box__header__past" href="#">You have $1 past reminders</a>' : '<span class="reminder-list-box__header__upcoming">Your upcoming reminders</span>';

            return $sce.trustAsHtml(template.replace('$1', text || '0'))
        };
    }]);;/* Feedback modal */

angular
    .module("reminders")
    .service("ReminderDeleteModalService", ["$modal", function ($modal) {

        // Init modal instance
        this.modalInstance = null;

        // Init the feedback modal window
        this.open = function (reminderToBeDeleted, reminderIndex) {

            // Create modal instance
            this.modalInstance = $modal.open({
                templateUrl: "app/reminders/partials/reminderModal/reminder_delete_modal.html",
                controller: "ReminderDeleteModalCtrl",
                windowClass: "modal-feedback",
                resolve: {
                    reminder: function () {
                        return reminderToBeDeleted;
                    },
                    reminderIndex: function () {
                        return reminderIndex;
                    }
                }
            });
        };

    }]);
;/**
 * Reminder group service which computes the upcoming and past reminders from a list.
 */
angular
    .module("reminders")
    .service("ReminderGroupService", function () {

        /**
         * Returns an object with past and upcoming reminders.
         * @param reminders
         * @returns {{}}
         */
        this.getPastAndUpcomingReminders = function (reminders) {

            /**
             * Used to check the past/upcoming reminders.
             * @type {Date}
             */
            var now = new Date();

            /**
             * Reminders grouped by upcoming and past reminders.
             */
            var remindersGrouped = _.chain(reminders)
                .groupBy(function (element) {
                    return element.model.dueOn < now;
                })
                .toArray()
                .value();

            /**
             * To be computed
             * @type {Array}
             */
            var upcomingReminders = [];
            var pastReminders = [];

            /**
             * We group reminders by date, but if they are all in the same category, they will always be on the first category
             */
            if ( remindersGrouped.length === 2 ) {
                upcomingReminders = remindersGrouped[0];
                pastReminders = remindersGrouped[1];
            }
            else if ( remindersGrouped.length === 1 ) {
                var firstGroupedRemindersResult = remindersGrouped[0];
                var groupedRemindersAreInPast = firstGroupedRemindersResult[0].model.dueOn < now;

                if ( groupedRemindersAreInPast ) {
                    pastReminders = firstGroupedRemindersResult;
                }
                else {
                    upcomingReminders = firstGroupedRemindersResult;
                }
            }

            return {
                pastReminders: pastReminders,
                upcomingReminders: upcomingReminders
            }

        };
    });
;/* Feedback modal */

angular
    .module("reminders")
    .service("ReminderModalService", ["$modal", function ($modal) {

        /**
         * Reminder modal instance.
         * @type {null}
         */
        this.modalInstance = null;

        /**
         * Define reminder modal object.
         */
        this.open = function () {

            // Create modal instance
            this.modalInstance = $modal.open({
                templateUrl: "app/reminders/partials/reminderModal/reminder_create_update_modal.html",
                controller: "ReminderModalCtrl",
                windowClass: "modal-feedback",
                resolve: {
                    reminder: ["$window", "$rootScope", "Reminder", "DatesUtils", function ($window, $rootScope, Reminder, DatesUtils) {
                        return Reminder.build({
                            text: "",
                            dueOn: DatesUtils.prepareDate(),
                            timezone: jstz.determine().name(),
                            recipients: [{ email: $rootScope.currentUser.model.email }]
                        });
                    }],
                    reminderIndex: function () {
                        return -1;
                    }
                }
            });
        };

    }]);
;/**
 * Reminders service which encapsulates the whole logic related to reminders.
 */
angular
    .module("reminders")
    .service("ReminderService", ["REMINDER_URLS", "$q", "$http", "$injector", "ReminderGroupService", "ReminderTransformerService", function (REMINDER_URLS, $q, $http, $injector, ReminderGroupService, ReminderTransformerService) {

        /**
         * Update a reminder.
         * @param reminder
         * @returns {*}
         */
        this.createReminder = function (reminder) {
            return $http
                .post(URLTo.api(REMINDER_URLS.create), ReminderTransformerService.toReminderDto(reminder))
                .then(function (response) {
                    ReminderTransformerService.toReminder(response.data, reminder);

                    return response;
                });
        };

        /**
         * Update a reminder.
         * @param reminder
         * @returns {*}
         */
        this.updateReminder = function (reminder) {
            var reminderDto = ReminderTransformerService.toReminderDto(reminder);

            return $http
                .put(URLTo.api(REMINDER_URLS.update, { ":reminderId": reminderDto.reminderId }), reminderDto)
                .then(function (response) {
                    ReminderTransformerService.toReminder(response.data, reminder);

                    return response;
                });
        };

        /**
         * UnSubscribe from a reminder.
         * @param reminder
         * @returns {*}
         */
        this.unSubscribeFromReminder = function (reminder) {
            var reminderDto = ReminderTransformerService.toReminderDto(reminder);

            return $http
                .post(URLTo.api(REMINDER_URLS.unSubscribeReminder, { ":reminderId": reminderDto.reminderId }), reminderDto);
        };

        /**
         * Delete a reminder.
         * @param reminder
         * @returns {*}
         */
        this.deleteReminder = function (reminder) {
            var reminderDto = ReminderTransformerService.toReminderDto(reminder);

            return $http
                .delete(URLTo.api(REMINDER_URLS.delete, { ":reminderId": reminderDto.reminderId }), reminderDto)
                .then(function (response) {
                    ReminderTransformerService.toReminder(response.data, reminder);

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

                    return ReminderTransformerService.toReminders(response.data)
                }).catch(function (response) {
                    return $q.reject(response);
                });
        };

        /**
         * Gets all reminders grouped by upcoming and past reminders.
         * @returns {*}
         */
        this.getAllRemindersGrouped = function () {
            var deferred = $q.defer();

            this
                .getAllReminders()
                .then(function (response) {
                    deferred.resolve(ReminderGroupService.getPastAndUpcomingReminders(response));
                }).catch(function () {
                    deferred.resolve(ReminderGroupService.getPastAndUpcomingReminders([]));
                });

            return deferred.promise;
        };

        /**
         * Get details of a reminder.
         * @param reminderId
         * @returns {*}
         */
        this.getDetails = function (reminderId) {
            return $http
                .get(URLTo.api(REMINDER_URLS.details, { ":reminderId": reminderId }))
                .then(function (response) {
                    return ReminderTransformerService.toReminder(response.data, $injector.get('Reminder').build());
                });
        };
    }]);
;/**
 * Reminder transformer service which transforms a reminder DTO model object to a reminder business object.
 */
angular
    .module("reminders")
    .service("ReminderTransformerService", ["$injector", "TransformerUtils", function ($injector, TransformerUtils) {

        /**
         * Converts a reminder business object model to a reminderDto object.
         * @param reminder
         * @param skipKeys
         * @returns {{}}
         */
        this.toReminderDto = function (reminder, skipKeys) {
            var reminderDto = {};

            TransformerUtils.copyKeysFromTo(reminder.model, reminderDto, skipKeys);
            if ( reminderDto.dueOn ) {
                reminderDto.dueOn = reminderDto.dueOn.format("{yyyy}-{MM}-{dd} {HH}:{mm}:{ss}");
            }
            reminderDto.text = $.trim(reminderDto.text.split("@")[0]);
            reminderDto.recipients = TransformerUtils.sanitizeRecipients(reminderDto.recipients);

            return reminderDto;
        };

        /**
         * Converts a reminderDto object to a reminder business object model.
         * @param reminderDto
         * @param reminder
         * @param skipKeys
         * @returns {*}
         */
        this.toReminder = function (reminderDto, reminder, skipKeys) {
            reminder = reminder || $injector.get('Reminder').build();

            TransformerUtils.copyKeysFromTo(reminderDto, reminder.model, skipKeys);

            // handle date conversion
            if ( reminder.model.dueOn ) {
                reminder.model.dueOn = moment(reminder.model.dueOn).toDate();
            }
            //handle addresses conversion
            var recipient = reminder.model.recipients;
            if ( _.isEmpty(recipient) ) {
                reminder.model.recipients = [];
            }
            else if ( _.isArray(recipient) ) {
                reminder.model.recipients = recipient;
            }

            return reminder;
        };

        /**
         * Transform a list of reminders as JSON to a list of reminders as business object.
         * @param reminderDtos
         * @returns {Array}
         */
        this.toReminders = function (reminderDtos) {
            var reminders = [];

            _.each(reminderDtos, _.bind(function (reminderDto) {
                reminders.push(this.toReminder(reminderDto));
            }, this));

            return reminders;
        };
    }]);
;/* Feedback modal */

angular
    .module("reminders")
    .service("ReminderUpdateModalService", ["$modal", function ($modal) {

        // Init modal instance
        this.modalInstance = null;

        // Init the feedback modal window
        this.open = function (reminderToBeUpdated, reminderIndex) {

            // Create modal instance
            this.modalInstance = $modal.open({
                templateUrl: "app/reminders/partials/reminderModal/reminder_create_update_modal.html",
                controller: "ReminderModalCtrl",
                windowClass: "modal-feedback",
                resolve: {
                    reminder: function () {
                        return reminderToBeUpdated;
                    },
                    reminderIndex: function () {
                        return reminderIndex;
                    }
                }
            });
        };

    }]);
;angular
    .module("reminders")
    .factory("Reminder", ["$q", "$http", "ReminderService", "ReminderTransformerService", function ($q, $http, ReminderService, ReminderTransformerService) {

        /**
         * Reminder class.
         * @constructor
         */
        function Reminder() {

            /**
             * Represents the DTO model of the reminder.
             */
            this.model = {

                /**
                 * The reminder id.
                 */
                reminderId: "",

                /**
                 * The reminder text.
                 */
                text: "",

                /**
                 * The reminder due date
                 */
                dueOn: "",

                /**
                 * The timezone
                 */
                timezone: "",

                /**
                 * The recipients (array of object, with email as key)
                 */
                recipients: [],

                /**
                 * The user which is the owner of this reminder
                 */
                createdByUser: {},

                /**
                 * Reminder id of the user which created this reminder.
                 */
                createdBy: "",

                /**
                 * If reminder is already sent.
                 */
                sent: "",

                /**
                 * Create date of the reminder.
                 */
                createdAt: "",

                /**
                 * Update date of the reminder.
                 */
                updatedAt: ""
            };

            /**
             * Is reminder new.
             * @returns {boolean}
             */
            this.isNew = function () {
                return this.model.reminderId === "" || _.isUndefined(this.model.reminderId);
            };

            /**
             * Is reminder in past.
             * @returns {boolean}
             */
            this.inPast = function () {
                if ( this.model.dueOn === "" || _.isUndefined(this.model.dueOn) ) {
                    return false;
                }
                return moment().diff(this.model.dueOn, 'days') > 0;
            };

            /**
             * The given email is the user of this reminder.
             * @returns {boolean}
             */
            this.isCreatedBy = function (email) {
                if ( _.isUndefined(email) ) {
                    return false;
                }

                return this.model.createdByUser.email === email;
            };

            /**
             * The recipients are more then one.
             * @returns {boolean}
             */
            this.isManyRecipients = function () {
                if ( _.isUndefined(this.model.recipients) ) {
                    return false;
                }

                return this.model.recipients.length > 1;
            };

            /**
             * Saves a reminder and update model with response.
             * @returns {*}
             */
            this.save = function () {
                if ( this.isNew() ) {
                    return ReminderService.createReminder(this);
                }
                else {
                    return ReminderService.updateReminder(this);
                }
            };

            /**
             * UnSubscribe a recipient from this reminder and update model with response.
             * @returns {*}
             */
            this.unSubscribe = function () {
                return ReminderService.unSubscribeFromReminder(this);
            };

            /**
             * Destroys (deletes) a reminder.
             * @returns {*}
             */
            this.destroy = function () {
                return ReminderService.deleteReminder(this);
            };

        }

        /**
         * Builds a reminder with given data.
         * @param data
         * @returns {Reminder}
         */
        Reminder.build = function (data) {
            if ( _.isEmpty(data) ) {
                return new Reminder();
            }

            return ReminderTransformerService.toReminder(data, new Reminder());
        };

        return Reminder;
    }]);;/**
 * Main app module declaration.
 */
angular
    .module("app", [
        "config",
        "ngAnimate",
        "ngMessages",
        "ui.router",
        "angular-flash.service",
        "angular-flash.flash-alert-directive",
        "ngStorage",
        "partials",
        "site",
        "feedback",
        "common",
        "reminders",
        "account",
        "angular.filter"
    ])
    .config(["$locationProvider", function ($locationProvider) {

        // Enable html5 mode
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
    }])
    .run(["ENV", function (ENV) {

        URLTo.apiBase(ENV.apiEndpoint);
    }]);;/**
 * Main app controller declaration.
 */
angular
    .module("app")
    .controller("AppCtrl", ["$rootScope", "$scope", "$state", "$timeout", "$log", "AuthService", "User", "StatesHandler", "AUTH_EVENTS", "ACTIVITY_INTERCEPTOR", "ERROR_INTERCEPTOR", "ENV", function ($rootScope, $scope, $state, $timeout, $log, AuthService, User, StatesHandler, AUTH_EVENTS, ACTIVITY_INTERCEPTOR, ERROR_INTERCEPTOR, ENV) {

        /**
         * Save the state on root scope
         */
        $rootScope.$state = $state;

        /**
         * Environment
         */
        $rootScope.ENV = ENV;

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
            AuthService.redirectToAttemptedUrl();
            $log.log("Logged in: ", $rootScope.currentUser);
        });

        /**
         * Listen to the session timeout event
         */
        $scope.$on(AUTH_EVENTS.sessionTimeout, function () {
            $log.log("Session timed out.");
            AuthService.logout();
        });

        /**
         * Listen to the not authenticated event
         */
        $scope.$on(AUTH_EVENTS.notAuthenticated, function () {
            $log.log("Not authenticated.");

            AuthService.logout();
            AuthService.saveAttemptUrl();
            StatesHandler.goToLogin();
        });

        /**
         * Listen to the logout event
         */
        $scope.$on(AUTH_EVENTS.logoutSuccess, function () {
            $rootScope.currentUser = User.$new();
            $log.log("Logged out.");
        });

        /**
         * Track activity - for animation loading bar
         */
        $rootScope.$on('$stateChangeStart', function () {
            $rootScope.$broadcast(ACTIVITY_INTERCEPTOR.activityStart);
        });

        $rootScope.$on('$viewContentLoaded', function () {
            $rootScope.$broadcast(ACTIVITY_INTERCEPTOR.activityEnd);
        });

        /**
         * Listen to the logout event
         */
        $scope.$on(ERROR_INTERCEPTOR.status500, function () {
            $state.go('500');
        });
    }]);
;angular.module('partials', ['app/site/partials/404.html', 'app/site/partials/500.html', 'app/site/partials/about.html', 'app/site/partials/home.html', 'app/site/partials/privacy.html', 'app/reminders/partials/reminder/reminder.list.template.html', 'app/reminders/partials/reminder/reminders.list.html', 'app/reminders/partials/reminder/reminders.template.html', 'app/reminders/partials/reminderModal/reminder_create_update_modal.html', 'app/reminders/partials/reminderModal/reminder_delete_modal.html', 'app/account/partials/account.html', 'app/account/partials/logout.html', 'app/account/partials/settings/settings.html', 'app/account/partials/settings/settings.preferences.html', 'app/account/partials/settings/settings.profile.html', 'app/account/partials/signup_confirm_abstract.html', 'app/account/partials/signup_confirm_invalid.html', 'app/account/partials/signup_confirm_valid.html', 'app/account/partials/validate_password_reset_token_abstract.html', 'app/account/partials/validate_password_reset_token_invalid.html', 'app/account/partials/validate_password_reset_token_valid.html', 'app/feedback/partials/feedback-modal.html', 'app/common/partials/emailList/emailList.html', 'app/common/partials/flash-messages.html', 'app/common/partials/footer-home.html', 'app/common/partials/footer.html', 'app/common/partials/header-home.html', 'app/common/partials/header.html', 'app/common/partials/timepickerPopup/timepickerPopup.html', 'template/datepicker/datepicker.html', 'template/datepicker/popup.html', 'template/modal/backdrop.html', 'template/modal/window.html', 'template/popover/popover.html', 'template/tabs/tab.html', 'template/tabs/tabset.html', 'template/tooltip/tooltip-html-unsafe-popup.html', 'template/tooltip/tooltip-popup.html']);

angular.module("app/site/partials/404.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/site/partials/404.html",
    "<div class=\"error__sections\">\n" +
    "    <h1 class=\"error__sections__heading\">Hmm... looks like a 404</h1>\n" +
    "\n" +
    "    <div class=\"error__sections__reason\">We can't really impress you since that page doesn't actually exist.</div>\n" +
    "    <div class=\"error__sections__reason error__sections__reason--last\">Probably a typo or the page may have moved.</div>\n" +
    "\n" +
    "    <a class=\"error__sections__link\" href=\"javascript:void(0)\" ng-click=\"goToHomePage()\">Go to homepage</a>\n" +
    "\n" +
    "</div>");
}]);

angular.module("app/site/partials/500.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/site/partials/500.html",
    "<div class=\"error__sections\">\n" +
    "    <h1 class=\"error__sections__heading\">Oops... you found a 500</h1>\n" +
    "\n" +
    "    <div class=\"error__sections__reason\">Nothing you did. It seems like an internal problem on the server.</div>\n" +
    "    <div class=\"error__sections__reason error__sections__reason--last\">If this happens again please let us know at <a class=\"link-primary\" href=\"mailto:hello@reme.io\">hello@reme.io</a></div>\n" +
    "\n" +
    "    <a class=\"error__sections__link\" href=\"javascript:void(0)\" ng-click=\"goToHomePage()\">Go to homepage</a>\n" +
    "\n" +
    "</div>");
}]);

angular.module("app/site/partials/about.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/site/partials/about.html",
    "<div header-home class=\"view-container__header\"></div>\n" +
    "\n" +
    "<div class=\"view-container--about\">\n" +
    "    <div class=\"about__sections\">\n" +
    "        <h1 class=\"about__sections__heading\">About us</h1>\n" +
    "\n" +
    "        <h1 class=\"about__sections__description\">\n" +
    "            We are a small team of 3 and we're really passioned about building Reme. Our main goal is to make our users happy (that's you!)\n" +
    "            and we hope you like using it. If you'd like to say hi, here we are.\n" +
    "        </h1>\n" +
    "\n" +
    "        <div class=\"about__sections__team\">\n" +
    "            <div class=\"about__sections__team__entry\">\n" +
    "                <img class=\"about__sections__team__entry__img\" src=\"/build/assets/img/c4162760-9cf2-11e4-9312-dbead076a43a.png\">\n" +
    "\n" +
    "                <div class=\"about__sections__team__desc\">Sorin Pantiş</div>\n" +
    "                <div class=\"about__sections__team__link\">\n" +
    "                    <a href=\"https://twitter.com/sorinpantis\" target=\"_blank\">@sorinpantis</a>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"about__sections__team__entry\">\n" +
    "                <img class=\"about__sections__team__entry__img\" src=\"/build/assets/img/c418c0b0-9cf2-11e4-80a4-abd6c14b15d2.png\">\n" +
    "\n" +
    "                <div class=\"about__sections__team__desc\">Tamás Pap</div>\n" +
    "                <div class=\"about__sections__team__link\">\n" +
    "                    <a href=\"https://twitter.com/paptamas\" target=\"_blank\">@paptamas</a>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"about__sections__team__entry\">\n" +
    "                <img class=\"about__sections__team__entry__img\" src=\"/build/assets/img/c4105efc-9cf2-11e4-99aa-22889cb05bd0s.jpg\">\n" +
    "\n" +
    "                <div class=\"about__sections__team__desc\">Ioan Lucuţ</div>\n" +
    "                <div class=\"about__sections__team__link\">\n" +
    "                    <a href=\"https://twitter.com/ioanlucut\" target=\"_blank\">@ioanlucut</a>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "    </div>\n" +
    "</div>\n" +
    "\n" +
    "<div footer-home class=\"view-container__footer footer-about\"></div>");
}]);

angular.module("app/site/partials/home.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/site/partials/home.html",
    "<div header-home class=\"view-container__header\"></div>\n" +
    "\n" +
    "<div class=\"home\">\n" +
    "\n" +
    "    <div class=\"home__signup\">\n" +
    "        <div class=\"centered-section-home\">\n" +
    "\n" +
    "            <h1 class=\"home__signup__title\">Create email reminders in seconds!</h1>\n" +
    "\n" +
    "            <h3 class=\"home__signup__description\">The sole purpose of Reme is to remind you the things that matter. Create a reminder and forget about it! Reme will not.</h3>\n" +
    "\n" +
    "            <!-- Register  section -->\n" +
    "            <div class=\"home__signup__sections\" account-form-toggle>\n" +
    "\n" +
    "                <!-- Request registration section -->\n" +
    "                <div class=\"home__signup__sections__section\" ng-if=\"AccountFormToggle.state == ACCOUNT_FORM_STATE.requestSignUpRegistration\" ng-controller=\"RequestSignUpRegistrationCtrl\">\n" +
    "\n" +
    "                    <!-- Request registration form -->\n" +
    "                    <form name=\"requestSignUpRegistrationForm\" ng-submit=\"requestSignUpRegistration()\" novalidate focus-first-error>\n" +
    "\n" +
    "                        <!-- Account controls -->\n" +
    "                        <div class=\"home__signup__sections__section__controls\">\n" +
    "\n" +
    "                            <!-- Email input -->\n" +
    "                            <div class=\"home__signup__sections__section__controls--information\">\n" +
    "                                <input class=\"form-control home__signup__sections__section__controls__email\" ng-class=\"{'has-error': requestSignUpRegistrationForm.email.$invalid && requestSignUpRegistrationForm.$submitted}\" type=\"email\" placeholder=\"Email address\" name=\"email\" ng-model=\"requestSignUpRegistrationData.email\" required valid-email unique-email />\n" +
    "\n" +
    "                                <!-- Error messages -->\n" +
    "                                <div class=\"home__signup__sections__section__validation-messages\" ng-class=\"{'has-error': requestSignUpRegistrationForm.email.$invalid && requestSignUpRegistrationForm.$submitted}\" ng-messages=\"requestSignUpRegistrationForm.email.$error\" ng-if=\"requestSignUpRegistrationForm.$submitted\">\n" +
    "                                    <div ng-message=\"required\">Your email address is mandatory.</div>\n" +
    "                                    <div ng-message=\"validEmail\">This email address is not valid.</div>\n" +
    "                                    <div ng-message=\"uniqueEmail\">This email address is already used.</div>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "\n" +
    "                            <!-- Button container -->\n" +
    "                            <button type=\"submit\" ladda=\"isRequestPending\" data-style=\"expand-left\" data-spinner-size=\"20\" class=\"btn home__signup__sections__section__controls__button\">Get started for FREE!</button>\n" +
    "                        </div>\n" +
    "                    </form>\n" +
    "\n" +
    "                    <div class=\"text-center text-muted home__signup__sections__section--migration\">\n" +
    "                        Rest assured, the reminders created in old Reme will be imported in your account after you sign up.\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "\n" +
    "                <!-- Request registration email sent section -->\n" +
    "                <div class=\"home__signup__sections__section home__signup__sections__section--success alert alert-success\" ng-if=\"AccountFormToggle.state == ACCOUNT_FORM_STATE.requestSignUpRegistrationEmailSent\">\n" +
    "\n" +
    "                    <!-- Title -->\n" +
    "                    <h1 class=\"home__signup__sections__section__submitted-title\">Thanks for signing up!</h1>\n" +
    "\n" +
    "                    <!-- Explain -->\n" +
    "                    <span class=\"home__signup__sections__section__submitted-message\">\n" +
    "                        Please check your email. There's one more step in order to create your account.\n" +
    "                    </span>\n" +
    "                </div>\n" +
    "\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"home__testimonials\">\n" +
    "        <div class=\"centered-section-home\">\n" +
    "            <div class=\"img_sprite press_logo lifehacker\">Lifehacker</div>\n" +
    "            <div class=\"img_sprite press_logo producthunt\">ProductHunt</div>\n" +
    "            <div class=\"img_sprite press_logo makeuseof\">MakeUseOf</div>\n" +
    "            <div class=\"img_sprite press_logo feedmyapp\">FeedMyApp</div>\n" +
    "            <div class=\"img_sprite press_logo newstartups\">NewStartups</div>\n" +
    "            <div class=\"img_sprite press_logo addictivetips\">AddictiveTips</div>\n" +
    "            <a class=\"img_sprite chromewebstore\" target=\"_blank\" href=\"https://chrome.google.com/webstore/detail/remeio/jagdnkmjmgengjocecgcilbpgffmlmep\">\n" +
    "                <span class=\"\">Reme</span> is available on <br> Chrome Web Store\n" +
    "            </a>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "</div>\n" +
    "\n" +
    "<div footer-home class=\"view-container__footer\"></div>\n" +
    "\n" +
    "");
}]);

angular.module("app/site/partials/privacy.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/site/partials/privacy.html",
    "<div header-home class=\"view-container__header\"></div>\n" +
    "\n" +
    "<div class=\"view-container--terms\">\n" +
    "\n" +
    "    <div class=\"privacy__sections\">\n" +
    "\n" +
    "        <h1>Terms of use</h1>\n" +
    "        <ul>\n" +
    "            <li>Reme is a tool created in the sole purpose of helping people get organized by creating reminders which will be sent to the provided e-mail address(es) at a specific date and time. Reme is not responsible for the content entered by the user.</li>\n" +
    "            <li>Reme uses e-mail as the only notification method. Reme is not responsible for missed dead-lines, appointments or other time-critical events.</li>\n" +
    "        </ul>\n" +
    "\n" +
    "        <h3>What personal data do we collect?</h3>\n" +
    "        <ul>\n" +
    "            <li>By registering or authenticating, you allow Reme to identify you and give you access to its services.</li>\n" +
    "            <li>We store your name and email address used for registration.</li>\n" +
    "        </ul>\n" +
    "\n" +
    "        <h3>Third party service that use personal data</h3>\n" +
    "        <ul>\n" +
    "            <li>Mandrill (from Mailchimp) - the mail server used to send the reminders</li>\n" +
    "            <li>Mixpanel - used to track actions with the purpose of improving the application&#39;s user experience</li>\n" +
    "            <li>Reamaze - used to manage the conversations with our users</li>\n" +
    "        </ul>\n" +
    "\n" +
    "        <h1>Privacy Policy</h1>\n" +
    "        <ul>\n" +
    "            <li>The information Reme stores is the subject of the reminder and the e-mail address(es) the user enters for the reminder recipient.</li>\n" +
    "            <li>We use local storage to save reminder related data for better user-experience. We do not collect anonymous data of any kind.</li>\n" +
    "            <li>The only e-mail Reme will send to the provided address(es) as recipients will be the reminder which the user creates.</li>\n" +
    "            <li>We will only use your email address(es) to send the reminders you create or for Reme related notifications.</li>\n" +
    "            <li>We will not use your email address to send newsletters or advertising that you didn&#39;t subscribe to.</li>\n" +
    "            <li>We will not share your e-mail address or the e-mail address(es) you used for other recipients with 3rd party entities in the scope of advertising or spam.</li>\n" +
    "        </ul>\n" +
    "\n" +
    "        <p>We may change the Privacy policy and/or the Terms of use without notice.</p>\n" +
    "\n" +
    "        <h3>Contact</h3>\n" +
    "\n" +
    "        <p>Please feel free to contact us at hello@reme.io for any questions or concerns you may have regarding the terms of use or the privacy policy.</p>\n" +
    "    </div>\n" +
    "</div>\n" +
    "\n" +
    "<div footer-home class=\"view-container__footer footer-about\"></div>");
}]);

angular.module("app/reminders/partials/reminder/reminder.list.template.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/reminders/partials/reminder/reminder.list.template.html",
    "<!--// Reminder list box header-->\n" +
    "<div class=\"reminder-list-box__header\" ng-click=\"togglePastRemindersContent()\" ng-bind-html=\"reminders.length | remindersHeader : reverseOrder\" ng-show=\"reminders.length\"></div>\n" +
    "\n" +
    "<!--Reminder list content.-->\n" +
    "<div ng-show=\"showRemindersContent\" class=\"reminder-list-box\" ng-class=\"{ 'reminder-list-box--past-reminders': reverseOrder}\">\n" +
    "\n" +
    "    <!--Reminder list is empty-->\n" +
    "    <div class=\"reminder__empty empty-state--text\" ng-if=\"showEmptyRemindersContent && ! reminders.length\">\n" +
    "        You have no reminders. Don't be shy, go ahead and create one! :)\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"reminder-groups\"\n" +
    "         ng-repeat=\"remindersGrouped in reminders | groupReminders:reverseOrder | groupLimit:reminders:remindersLimit track by remindersGrouped.name\">\n" +
    "\n" +
    "        <!--Reminder group-->\n" +
    "        <div class=\"reminder-group\"> {{remindersGrouped.name}}</div>\n" +
    "\n" +
    "        <!--Reminder list-->\n" +
    "        <div class=\"reminder\"\n" +
    "             ng-click=\"openUpdateReminderModalService(reminder, $index)\"\n" +
    "             ng-repeat=\"reminder in remindersGrouped.values | orderObjectBy : 'model.dueOn' : reverseOrder | filter:{model:{text:searchByText}} as filteredReminders track by reminder.model.reminderId\">\n" +
    "\n" +
    "            <!--Reminder title-->\n" +
    "            <div class=\"reminder__title\" ng-bind-html=\"reminder.model.text | highlightSearch:searchByText\"></div>\n" +
    "\n" +
    "            <!--Reminder edit/delete-->\n" +
    "            <div class=\"reminder__menu\">\n" +
    "                <a class=\"reminder__menu__option reminder__menu__option--delete simptip-position-left simptip-fade simptip-smooth\" data-tooltip=\"Delete reminder\" href=\"javascript:void(0)\" ng-click=\"reminder.isCreatedBy(currentUserEmail) ? openDeleteReminderModalService(reminder, $index) : openUnSubscribeReminderModalService(reminder, $index); $event.stopPropagation();\">\n" +
    "                    <span class=\"icon-trash\"></span>\n" +
    "                </a>\n" +
    "            </div>\n" +
    "\n" +
    "            <!--Reminder info-->\n" +
    "            <div class=\"reminder__info\">\n" +
    "\n" +
    "                <!--Reminder date-->\n" +
    "                <div class=\"reminder__info__item reminder__info__item--date\">\n" +
    "                    <span class=\"icon-calendar\"></span>\n" +
    "                    {{reminder.model.dueOn | friendlyDate}}\n" +
    "                </div>\n" +
    "\n" +
    "                <!--Reminder hour-->\n" +
    "                <div class=\"reminder__info__item reminder__info__item--time\">\n" +
    "                    <span class=\"icon-clock\"></span>\n" +
    "                    {{reminder.model.dueOn | friendlyHour}}\n" +
    "                </div>\n" +
    "\n" +
    "                <!--Reminder icons-->\n" +
    "                <div class=\"reminder__info__item reminder__info__item--additional\">\n" +
    "                    <div class=\"reminder__info__item__icon reminder__info__item__icon--user\">\n" +
    "                        <span ng-if=\"! reminder.isCreatedBy(currentUserEmail)\" class=\"simptip-position-bottom simptip-fade simptip-smooth simptip-multiline\" data-tooltip=\"Created by: {{reminder.model.createdByUser.firstName}} {{reminder.model.createdByUser.lastName}} {{reminder.model.createdByUser.email}}\">\n" +
    "                            <span class=\"icon-user\"></span>\n" +
    "                        </span>\n" +
    "                    </div>\n" +
    "                    <div class=\"reminder__info__item__icon reminder__info__item__icon--email\">\n" +
    "                        <span ng-if=\"reminder.isManyRecipients()\" class=\"simptip-position-bottom simptip-fade simptip-smooth simptip-multiline\" data-tooltip=\"Recipients: {{reminder.model.recipients | friendlyRecipients}}\">\n" +
    "                            <span class=\"icon-email\"></span>\n" +
    "                        </span>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div ng-if=\"isStillRemindersToBeLoaded()\" class=\"load-more-reminders\">\n" +
    "        <button type=\"submit\" ladda=\"isLoadingMore\" data-style=\"expand-left\" data-spinner-size=\"20\" class=\"btn btn--load-more\" ng-click=\"loadMoreReminders()\">LOAD MORE</button>\n" +
    "    </div>\n" +
    "\n" +
    "</div>");
}]);

angular.module("app/reminders/partials/reminder/reminders.list.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/reminders/partials/reminder/reminders.list.html",
    "<!--Search in all reminders-->\n" +
    "<div class=\"form-group form-group--search\">\n" +
    "    <div id=\"sb-search\" class=\"sb-search\" search-widget>\n" +
    "        <input id=\"search\" class=\"form-control sb-search-input\" type=\"search\" placeholder=\"Search...\" name=\"search\" maxlength=\"140\" ng-model=\"searchByText\" />\n" +
    "        <span class=\"sb-icon-search icon-search\"></span>\n" +
    "    </div>\n" +
    "</div>\n" +
    "\n" +
    "<!--Add a new reminder-->\n" +
    "<div class=\"reminders__header\">\n" +
    "    <button class=\"btn btn-complement reminders__header__btn\" ng-click=\"openReminderModalService()\">New reminder</button>\n" +
    "</div>\n" +
    "\n" +
    "<!--Upcoming reminders-->\n" +
    "<div class=\"reminder-list\" reminder-list reminders=\"upcomingReminders\" search-by-text=\"searchByText\" sort=\"asc\" show-empty-content=\"true\"></div>\n" +
    "\n" +
    "<!--Past reminders-->\n" +
    "<div class=\"reminder-list\" reminder-list reminders=\"pastReminders\" search-by-text=\"searchByText\" sort=\"desc\" toggle-content=\"true\"></div>");
}]);

angular.module("app/reminders/partials/reminder/reminders.template.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/reminders/partials/reminder/reminders.template.html",
    "<div class=\"view-container__header\" header></div>\n" +
    "\n" +
    "<div class=\"centered-section-reminders\">\n" +
    "\n" +
    "    <div class=\"list-wrapper\" ui-view=\"list\"></div>\n" +
    "\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"view-container__footer\" footer></div>");
}]);

angular.module("app/reminders/partials/reminderModal/reminder_create_update_modal.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/reminders/partials/reminderModal/reminder_create_update_modal.html",
    "<!--Reminder form-->\n" +
    "<div class=\"reminder-modal\">\n" +
    "\n" +
    "    <div class=\"reminder-modal__header\">Create a new reminder</div>\n" +
    "\n" +
    "    <div class=\"reminder-modal__form__cancel\">\n" +
    "        <button type=\"button\" class=\"close\" ng-click=\"dismissFeedbackModal()\" aria-label=\"Close\">\n" +
    "            <span aria-hidden=\"true\">×</span></button>\n" +
    "    </div>\n" +
    "\n" +
    "    <!-- Flash messages. -->\n" +
    "    <div flash-messages flash=\"flash\" identifier-id=\"{{alertIdentifierId}}\"></div>\n" +
    "\n" +
    "    <!--Reminder form-->\n" +
    "    <form class=\"reminder-modal__form\" name=\"reminderForm\" ng-submit=\"saveReminder(reminderForm)\" novalidate focus-first-error>\n" +
    "\n" +
    "        <!--Reminder text-->\n" +
    "        <div class=\"form-group form-group--reminder-text\" ng-class=\"{'has-error': reminderForm.text.$invalid && reminderForm.$submitted}\">\n" +
    "            <label>Remind me to:</label>\n" +
    "            <input class=\"form-control form-control--reminder\" type=\"text\" placeholder=\"{{randomExample}}\" name=\"text\" maxlength=\"140\" ng-model=\"reminder.model.text\" nlp-date date=\"reminder.model.dueOn\" separator=\"@\" min-date=\"{{minDate}}\" max-date=\"2018-01-01\" auto-focus=\"isModalOpened\" required />\n" +
    "        </div>\n" +
    "\n" +
    "        <!--Reminder info-->\n" +
    "        <div class=\"reminder-modal__form__info\" ng-class=\"{'has-error': reminderForm.selectedDate.$invalid}\">\n" +
    "\n" +
    "            <!--Hidden input of the reminder chosen date-->\n" +
    "            <input type=\"hidden\" name=\"selectedDate\" ng-model=\"reminder.model.dueOn\" valid-date />\n" +
    "\n" +
    "            <!--Reminder date picker-->\n" +
    "            <div class=\"reminder-modal__form__info--date\">\n" +
    "                <button type=\"button\" class=\"btn btn--reminder-popup\" datepicker-popup min=\"minDate\" ng-model=\"reminder.model.dueOn\" show-weeks=\"false\" datepicker-options=\"{starting_day:1}\" animate animate-on=\"nlpDate:dateChange\" animate-class=\"highlight-button\"> {{reminder.model.dueOn | friendlyDate}}</button>\n" +
    "            </div>\n" +
    "\n" +
    "            <!--Reminder time picker-->\n" +
    "            <div class=\"reminder-modal__form__info--time\" timepicker-popup dropdown ng-model=\"reminder.model.dueOn\" step=\"30\"></div>\n" +
    "\n" +
    "            <!--Error messages-->\n" +
    "            <div class=\"has-error-messages\" ng-messages=\"reminderForm.selectedDate.$error\">\n" +
    "                <div ng-message=\"validDate\">Please make sure that the date and time are in the future.</div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <!--Reminder addresses-->\n" +
    "        <div class=\"reminder-modal__form__addressees\">\n" +
    "\n" +
    "            <div email-list ng-model=\"reminder.model.recipients\" max-emails=\"6\" parent-form=\"reminderForm\"></div>\n" +
    "        </div>\n" +
    "\n" +
    "        <!--Submit form button-->\n" +
    "        <button type=\"submit\" ladda=\"isSaving\" data-style=\"expand-left\" data-spinner-size=\"20\" class=\"btn btn--create-reminder\">{{isNew ? \"Create reminder\" : \"Update reminder\"}}</button>\n" +
    "    </form>\n" +
    "</div>");
}]);

angular.module("app/reminders/partials/reminderModal/reminder_delete_modal.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/reminders/partials/reminderModal/reminder_delete_modal.html",
    "<!--Delete reminder form-->\n" +
    "<div class=\"reminder-form-container\">\n" +
    "\n" +
    "    <div class=\"reminder-form-container__form\">\n" +
    "        <div class=\"reminder-form-container__form__question\">\n" +
    "            Don't you need to remember to <strong>{{reminder.model.text}}</strong> on\n" +
    "            <strong>{{reminder.model.dueOn | friendlyDate}}</strong> anymore?\n" +
    "        </div>\n" +
    "        <div class=\"reminder-form-container__form__recommend\">\n" +
    "            <a href=\"javascript:void(0)\" ng-click=\"dismiss()\">Keep calm and don't delete it!</a>\n" +
    "        </div>\n" +
    "        <button type=\"submit\" ladda=\"isDeleting\" data-style=\"expand-left\" data-spinner-size=\"20\" class=\"btn btn--delete-reminder\" ng-click=\"reminder.isCreatedBy(user.model.email) ? deleteReminderAndClose(reminder) : unSubscribeFromReminderAndClose(reminder)\">Don't need it anymore</button>\n" +
    "    </div>\n" +
    "\n" +
    "</div>");
}]);

angular.module("app/account/partials/account.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/account/partials/account.html",
    "<!-- Brand logo -->\n" +
    "<div class=\"brand-logo-block\"><a ui-sref=\"home\"></a></div>\n" +
    "\n" +
    "<!-- Account sections -->\n" +
    "<div class=\"account__sections\" account-form-toggle>\n" +
    "\n" +
    "    <!--Sign in-->\n" +
    "    <div class=\"account__section\" ng-if=\"AccountFormToggle.state === ACCOUNT_FORM_STATE.login\" ng-controller=\"LoginCtrl\">\n" +
    "\n" +
    "        <!-- Title -->\n" +
    "        <h1 class=\"account__title\">Welcome!</h1>\n" +
    "\n" +
    "        <!-- Login form -->\n" +
    "        <form name=\"loginForm\" ng-submit=\"login(loginData)\" novalidate focus-first-error>\n" +
    "\n" +
    "            <!-- Account controls -->\n" +
    "            <div class=\"account__controls\">\n" +
    "\n" +
    "                <!-- Flash messages. -->\n" +
    "                <div flash-messages flash=\"flash\" identifier-id=\"{{alertIdentifierId}}\"></div>\n" +
    "\n" +
    "                <!-- Form groups -->\n" +
    "                <div class=\"account__controls__form-groups--last\">\n" +
    "\n" +
    "                    <!-- Form group -->\n" +
    "                    <div class=\"form-group\" ng-class=\"{'has-error': loginForm.$submitted && (loginForm.email.$invalid || badPostSubmitResponse)}\">\n" +
    "                        <input class=\"form-control form-control--account\" type=\"email\" placeholder=\"email\" name=\"email\" ng-model=\"loginData.email\" auto-focus required />\n" +
    "                        <span class=\"help-message\" ng-if=\"loginForm.email.$invalid && loginForm.$submitted\">Your email address is mandatory.</span>\n" +
    "                    </div>\n" +
    "\n" +
    "                    <!-- Form group -->\n" +
    "                    <div class=\"form-group\" ng-class=\"{'has-error': loginForm.$submitted && (loginForm.password.$invalid || badPostSubmitResponse)}\">\n" +
    "                        <input class=\"form-control form-control--account\" type=\"password\" placeholder=\"password\" name=\"password\" ng-model=\"loginData.password\" required />\n" +
    "                        <span class=\"help-message\" ng-if=\"loginForm.password.$invalid && loginForm.$submitted\">Your password is mandatory.</span>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "\n" +
    "                <!-- Reset password -->\n" +
    "                <div class=\"form-group\">\n" +
    "                    <a class=\"link-secondary link--lg-middle\" href=\"javascript:void(0)\" ng-click=\"AccountFormToggle.setState(ACCOUNT_FORM_STATE.forgotPassword)\">Forgot login details?</a>\n" +
    "                </div>\n" +
    "\n" +
    "                <!-- Button container -->\n" +
    "                <button ladda=\"isRequestPending\" data-style=\"expand-left\" data-spinner-size=\"20\" class=\"btn account__button\" type=\"submit\">Sign in</button>\n" +
    "            </div>\n" +
    "        </form>\n" +
    "\n" +
    "        <a class=\"link-primary link--lg\" href=\"javascript:void(0)\" ng-click=\"AccountFormToggle.setState(ACCOUNT_FORM_STATE.requestSignUpRegistration)\">Don't have an account yet? Sign up!</a>\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "    <!--Sign up-->\n" +
    "    <div class=\"account__section\" ng-if=\"AccountFormToggle.state == ACCOUNT_FORM_STATE.requestSignUpRegistration\" ng-controller=\"RequestSignUpRegistrationCtrl\">\n" +
    "\n" +
    "        <!-- Title -->\n" +
    "        <h1 class=\"account__title\">Let's get you started!</h1>\n" +
    "\n" +
    "        <!-- Sign-up form -->\n" +
    "        <form name=\"requestSignUpRegistrationForm\" ng-submit=\"requestSignUpRegistration()\" novalidate focus-first-error>\n" +
    "\n" +
    "            <!-- Account controls -->\n" +
    "            <div class=\"account__controls\">\n" +
    "\n" +
    "                <!-- Flash messages. -->\n" +
    "                <div flash-messages flash=\"flash\" identifier-id=\"{{alertIdentifierId}}\"></div>\n" +
    "\n" +
    "                <!-- Form groups -->\n" +
    "                <div class=\"account__controls__form-groups--last\">\n" +
    "\n" +
    "                    <!-- Form group -->\n" +
    "                    <div class=\"form-group\" ng-class=\"{'has-error': requestSignUpRegistrationForm.email.$invalid && requestSignUpRegistrationForm.$submitted}\">\n" +
    "                        <input class=\"form-control form-control--account\" type=\"email\" placeholder=\"Your email address\" name=\"email\" ng-model=\"requestSignUpRegistrationData.email\" auto-focus required valid-email unique-email />\n" +
    "\n" +
    "                        <!-- Error messages -->\n" +
    "                        <div class=\"home__signup__sections__section__validation-messages\" ng-class=\"{'has-error': requestSignUpRegistrationForm.email.$invalid && requestSignUpRegistrationForm.$submitted}\" ng-messages=\"requestSignUpRegistrationForm.email.$error\" ng-if=\"requestSignUpRegistrationForm.$submitted\">\n" +
    "                            <div ng-message=\"required\">Your email address is mandatory.</div>\n" +
    "                            <div ng-message=\"validEmail\">This email address is not valid.</div>\n" +
    "                            <div ng-message=\"uniqueEmail\">This email address is already used.</div>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "\n" +
    "                <!-- Button container -->\n" +
    "                <button class=\"btn account__button\" ladda=\"isRequestPending\" data-style=\"expand-left\" data-spinner-size=\"20\" type=\"submit\">Create new account</button>\n" +
    "            </div>\n" +
    "        </form>\n" +
    "\n" +
    "        <a class=\"link-primary link--lg\" href=\"javascript:void(0)\" ng-click=\"AccountFormToggle.setState(ACCOUNT_FORM_STATE.login)\">Already have an account? Sign in here!</a>\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "    <!-- Sign up email sent section -->\n" +
    "    <div class=\"account__section\" ng-if=\"AccountFormToggle.state == ACCOUNT_FORM_STATE.requestSignUpRegistrationEmailSent\">\n" +
    "\n" +
    "        <!-- Title -->\n" +
    "        <h1 class=\"account__title\">Yey! Email has been sent!</h1>\n" +
    "\n" +
    "        <!-- Explain -->\n" +
    "        <span class=\"account__explain\">Please check your email to finish your account creation.</span>\n" +
    "\n" +
    "        <!-- Button container -->\n" +
    "        <a href=\"javascript:void(0)\" class=\"link-secondary link--lg\" ng-click=\"AccountFormToggle.setState(ACCOUNT_FORM_STATE.requestSignUpRegistration)\">I think I've misspelled my email</a>\n" +
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
    "        <form name=\"forgotPasswordForm\" ng-submit=\"requestPasswordReset(forgotPasswordData.email)\" novalidate focus-first-error>\n" +
    "\n" +
    "            <!-- Account controls -->\n" +
    "            <div class=\"account__controls\">\n" +
    "\n" +
    "                <!-- Flash messages. -->\n" +
    "                <div flash-messages flash=\"flash\" identifier-id=\"{{alertIdentifierId}}\"></div>\n" +
    "\n" +
    "                <!-- Form groups -->\n" +
    "                <div class=\"account__controls__form-groups--last\">\n" +
    "\n" +
    "                    <!-- Form group -->\n" +
    "                    <div class=\"form-group\" ng-class=\"{'has-error': forgotPasswordForm.email.$invalid && forgotPasswordForm.$submitted }\">\n" +
    "                        <input class=\"form-control form-control--account\" type=\"email\" placeholder=\"Your email address\" name=\"email\" ng-model=\"forgotPasswordData.email\" auto-focus required valid-email />\n" +
    "\n" +
    "                        <div class=\"help-message\" ng-messages=\"forgotPasswordForm.email.$error\" ng-if=\"forgotPasswordForm.$submitted\">\n" +
    "                            <div ng-message=\"required\">Your email address is mandatory.</div>\n" +
    "                            <div ng-message=\"validEmail\">This email address is not valid.</div>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "\n" +
    "                <!-- Button container -->\n" +
    "                <button class=\"btn account__button\" type=\"submit\">Reset password</button>\n" +
    "            </div>\n" +
    "        </form>\n" +
    "\n" +
    "        <a href=\"javascript:void(0)\" class=\"link-secondary link--lg\" ng-click=\"AccountFormToggle.setState(ACCOUNT_FORM_STATE.login)\">Nevermind, take me back!</a>\n" +
    "    </div>\n" +
    "\n" +
    "    <!-- Password recovery email sent section -->\n" +
    "    <div class=\"account__section\" ng-if=\"AccountFormToggle.state == ACCOUNT_FORM_STATE.forgotPasswordEmailSent\">\n" +
    "\n" +
    "        <!-- Title -->\n" +
    "        <h1 class=\"account__title\">Email has been sent!</h1>\n" +
    "\n" +
    "        <!-- Explain -->\n" +
    "        <span class=\"account__explain\">Please check your email. We've sent you a link to reset your password.</span>\n" +
    "\n" +
    "        <!-- Button container -->\n" +
    "        <a href=\"javascript:void(0)\" class=\"link-secondary link--lg\" ng-click=\"AccountFormToggle.setState(ACCOUNT_FORM_STATE.login)\">Actually I remember the password</a>\n" +
    "    </div>\n" +
    "\n" +
    "</div>");
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
    "               Logged out successfully.\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "\n" +
    "");
}]);

angular.module("app/account/partials/settings/settings.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/account/partials/settings/settings.html",
    "<div header class=\"view-container__header\"></div>\n" +
    "\n" +
    "<div class=\"centered-section-account\">\n" +
    "    <tabset vertical=\"true\">\n" +
    "        <tab heading=\"Profile\">\n" +
    "            <div class=\"account__sections\" ui-view=\"profile\" profile-form-toggle></div>\n" +
    "        </tab>\n" +
    "        <tab heading=\"Preferences\">\n" +
    "            <div class=\"account__sections\" ui-view=\"preferences\"></div>\n" +
    "        </tab>\n" +
    "    </tabset>\n" +
    "</div>\n" +
    "\n" +
    "<div footer class=\"view-container__footer\"></div>");
}]);

angular.module("app/account/partials/settings/settings.preferences.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/account/partials/settings/settings.preferences.html",
    "<!-- Profile section -->\n" +
    "<div class=\"account__section\" ng-controller=\"PreferencesCtrl\">\n" +
    "\n" +
    "    <!-- Title -->\n" +
    "    <h1 class=\"account__title\">Modify timezone</h1>\n" +
    "\n" +
    "    <!-- Profile form -->\n" +
    "    <form name=\"preferencesForm\" ng-submit=\"updatePreferences(preferencesData)\" novalidate>\n" +
    "\n" +
    "        <!-- Account controls -->\n" +
    "        <div class=\"account__controls\">\n" +
    "\n" +
    "            <!-- Flash messages. -->\n" +
    "            <div flash-messages flash=\"flash\" identifier-id=\"{{alertIdentifierId}}\"></div>\n" +
    "\n" +
    "            <!-- Form groups -->\n" +
    "            <div class=\"account__controls__form-groups account__controls__form-groups--last\">\n" +
    "\n" +
    "                <!-- Form group -->\n" +
    "                <div class=\"form-group form-group--timezone\" ng-class=\"{'has-error': preferencesForm.timezone.$invalid && preferencesForm.$submitted}\">\n" +
    "                    <select class=\"form-control\" chosen=\"{inherit_select_classes:true}\" ng-options=\"timezone.key as timezone.value for timezone in timezones\" ng-model=\"preferencesData.timezone\" required> </select>\n" +
    "                    <span class=\"help-message\" ng-if=\"preferencesForm.timezone.$invalid && preferencesForm.$submitted\">Please tell us your email.</span>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <!-- Button container -->\n" +
    "            <button class=\"btn account__button\" type=\"submit\">Save changes</button>\n" +
    "        </div>\n" +
    "    </form>\n" +
    "</div>");
}]);

angular.module("app/account/partials/settings/settings.profile.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/account/partials/settings/settings.profile.html",
    "<!-- Profile section -->\n" +
    "<div class=\"account__section\" ng-if=\"ProfileFormToggle.state === ACCOUNT_FORM_STATE.updateProfile\" ng-controller=\"ProfileCtrl\">\n" +
    "\n" +
    "    <!-- Title -->\n" +
    "    <h1 class=\"account__title\">Modify profile</h1>\n" +
    "\n" +
    "    <!-- Profile form -->\n" +
    "    <form name=\"profileForm\" ng-submit=\"updateProfile(profileData)\" novalidate>\n" +
    "\n" +
    "        <!-- Account controls -->\n" +
    "        <div class=\"account__controls\">\n" +
    "\n" +
    "            <!-- Flash messages. -->\n" +
    "            <div flash-messages flash=\"flash\" identifier-id=\"{{alertIdentifierId}}\"></div>\n" +
    "\n" +
    "            <!-- Form groups -->\n" +
    "            <div class=\"account__controls__form-groups account__controls__form-groups--last\">\n" +
    "\n" +
    "                <!-- Form group -->\n" +
    "                <div class=\"form-group\" ng-class=\"{'has-error': profileForm.firstName.$invalid && profileForm.$submitted}\">\n" +
    "                    <input class=\"form-control form-control--account\" type=\"text\" placeholder=\"Prenume\" name=\"firstName\" ng-model=\"profileData.firstName\" required />\n" +
    "                    <span class=\"help-message\" ng-if=\"profileForm.firstName.$invalid && profileForm.$submitted\">Please tell us your First Name.</span>\n" +
    "                </div>\n" +
    "\n" +
    "                <!-- Form group -->\n" +
    "                <div class=\"form-group\" ng-class=\"{'has-error': profileForm.lastName.$invalid && profileForm.$submitted}\">\n" +
    "                    <input class=\"form-control form-control--account\" type=\"text\" placeholder=\"Nume\" name=\"lastName\" ng-model=\"profileData.lastName\" required />\n" +
    "                    <span class=\"help-message\" ng-if=\"profileForm.lastName.$invalid && profileForm.$submitted\">Please tell us your Last Name.</span>\n" +
    "                </div>\n" +
    "\n" +
    "                <!-- Form group -->\n" +
    "                <div class=\"form-group\">\n" +
    "                    <input class=\"form-control form-control--account\" type=\"text\" placeholder=\"Email\" name=\"email\" ng-value=\"user.model.email\" disabled />\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <!-- Button container -->\n" +
    "            <button class=\"btn account__button\" type=\"submit\">Save changes</button>\n" +
    "        </div>\n" +
    "    </form>\n" +
    "\n" +
    "    <a href=\"javascript:void(0)\" class=\"link-secondary link--lg\" ng-click=\"ProfileFormToggle.setState(ACCOUNT_FORM_STATE.updatePassword)\">Change password</a>\n" +
    "</div>\n" +
    "\n" +
    "<!-- Update password section -->\n" +
    "<div class=\"account__section\" ng-if=\"ProfileFormToggle.state === ACCOUNT_FORM_STATE.updatePassword\" ng-controller=\"UpdatePasswordCtrl\">\n" +
    "\n" +
    "    <!-- Title -->\n" +
    "    <h1 class=\"account__title\">Welcome!</h1>\n" +
    "\n" +
    "    <!-- Update password form -->\n" +
    "    <form name=\"updatePasswordForm\" ng-submit=\"updatePassword(updatePasswordData)\" novalidate>\n" +
    "\n" +
    "        <!-- Account controls -->\n" +
    "        <div class=\"account__controls\">\n" +
    "\n" +
    "            <!-- Flash messages. -->\n" +
    "            <div flash-messages flash=\"flash\" identifier-id=\"{{alertIdentifierId}}\"></div>\n" +
    "\n" +
    "            <!-- Form groups -->\n" +
    "            <div class=\"account__controls__form-groups--last\">\n" +
    "\n" +
    "                <!-- Form group -->\n" +
    "                <div class=\"form-group\" ng-class=\"{'has-error': updatePasswordForm.$submitted && (updatePasswordForm.oldPassword.$invalid || badPostSubmitResponse)}\">\n" +
    "                    <input class=\"form-control form-control--account\" type=\"password\" placeholder=\"Old password\" name=\"oldPassword\" ng-model=\"updatePasswordData.oldPassword\" auto-focus required />\n" +
    "                    <span class=\"help-message\" ng-if=\"updatePasswordForm.oldPassword.$invalid && updatePasswordForm.$submitted\">Please enter your old password.</span>\n" +
    "                </div>\n" +
    "\n" +
    "                <!-- Form group -->\n" +
    "                <div class=\"form-group\" ng-class=\"{'has-error': updatePasswordForm.$submitted && (updatePasswordForm.newPassword.$invalid || badPostSubmitResponse)}\">\n" +
    "                    <input class=\"form-control form-control--account\" type=\"password\" placeholder=\"New password\" name=\"newPassword\" ng-model=\"updatePasswordData.newPassword\" required />\n" +
    "                    <span class=\"help-message\" ng-if=\"updatePasswordForm.newPassword.$invalid && updatePasswordForm.$submitted\">Please enter a new password.</span>\n" +
    "                </div>\n" +
    "\n" +
    "                <!-- Form group -->\n" +
    "                <div class=\"form-group\" ng-class=\"{'has-error': updatePasswordForm.$submitted && (updatePasswordForm.newPasswordConfirmation.$invalid || badPostSubmitResponse)}\">\n" +
    "                    <input class=\"form-control form-control--account\" type=\"password\" placeholder=\"New password confirmation\" name=\"newPasswordConfirmation\" ng-model=\"updatePasswordData.newPasswordConfirmation\" required />\n" +
    "                    <span class=\"help-message\" ng-if=\"updatePasswordForm.newPasswordConfirmation.$invalid && updatePasswordForm.$submitted\">Please confirm your new password.</span>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <!-- Button container -->\n" +
    "            <button class=\"btn account__button\" type=\"submit\">Update password</button>\n" +
    "        </div>\n" +
    "    </form>\n" +
    "\n" +
    "    <a href=\"javascript:void(0)\" class=\"link-secondary link--lg\" ng-click=\"ProfileFormToggle.setState(ACCOUNT_FORM_STATE.updateProfile)\">Nevermind, take me back!</a>\n" +
    "\n" +
    "</div>\n" +
    "\n" +
    "<!-- Change password section successfully-->\n" +
    "<div class=\"account__section\" ng-if=\"ProfileFormToggle.state == ACCOUNT_FORM_STATE.updatePasswordSuccessfully\">\n" +
    "\n" +
    "    <!-- Title -->\n" +
    "    <h1 class=\"account__title\">Successfully</h1>\n" +
    "\n" +
    "    <!-- Explain -->\n" +
    "    <span class=\"account__explain\">We've successfully updated your new password.</span>\n" +
    "\n" +
    "    <!-- Button container -->\n" +
    "    <a href=\"javascript:void(0)\" ng-click=\"ProfileFormToggle.setState(ACCOUNT_FORM_STATE.updateProfile)\">Continue</a>\n" +
    "</div>");
}]);

angular.module("app/account/partials/signup_confirm_abstract.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/account/partials/signup_confirm_abstract.html",
    "<div ui-view></div>");
}]);

angular.module("app/account/partials/signup_confirm_invalid.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/account/partials/signup_confirm_invalid.html",
    "<!-- Registration confirmation invalid -->\n" +
    "<div class=\"account__sections\">\n" +
    "\n" +
    "    <div class=\"account__section\">\n" +
    "\n" +
    "        <!-- Explain -->\n" +
    "        <span class=\"account__explain\">\n" +
    "            Sorry, we couldn't validate your email. Maybe the link in the email is too old..\n" +
    "        </span>\n" +
    "        <a href=\"javascript:void(0)\" class=\"link-secondary link--lg\" ng-click=\"goHome()\">Request the email again</a>\n" +
    "    </div>\n" +
    "\n" +
    "</div>\n" +
    "");
}]);

angular.module("app/account/partials/signup_confirm_valid.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/account/partials/signup_confirm_valid.html",
    "<!-- Registration confirmation valid -->\n" +
    "\n" +
    "<!-- Account sections -->\n" +
    "<div class=\"account__sections\">\n" +
    "\n" +
    "    <!--Sign up-->\n" +
    "    <div class=\"account__section\">\n" +
    "\n" +
    "        <!-- Title -->\n" +
    "        <h1 class=\"account__title\">Let's finalize your account!</h1>\n" +
    "\n" +
    "        <!-- Sign-up form -->\n" +
    "        <form name=\"signUpForm\" ng-submit=\"signUp(signUpData)\" novalidate focus-first-error>\n" +
    "\n" +
    "            <!-- Account controls -->\n" +
    "            <div class=\"account__controls\">\n" +
    "\n" +
    "                <!-- Flash messages. -->\n" +
    "                <div flash-messages flash=\"flash\" identifier-id=\"{{alertIdentifierId}}\"></div>\n" +
    "\n" +
    "                <!-- Form groups -->\n" +
    "                <div class=\"form-group\" ng-class=\"{'has-error': signUpForm.$submitted && (signUpForm.firstName.$invalid || badPostSubmitResponse)}\">\n" +
    "                    <input class=\"form-control form-control--account\" type=\"text\" placeholder=\"First Name\" name=\"firstName\" ng-model=\"signUpData.firstName\" auto-focus required />\n" +
    "                    <span class=\"help-message\" ng-if=\"signUpForm.firstName.$invalid && signUpForm.$submitted\">Please tell us your First Name.</span>\n" +
    "                </div>\n" +
    "\n" +
    "                <!-- Form group -->\n" +
    "                <div class=\"form-group\" ng-class=\"{'has-error': signUpForm.$submitted && (signUpForm.lastName.$invalid || badPostSubmitResponse)}\">\n" +
    "                    <input class=\"form-control form-control--account\" type=\"text\" placeholder=\"Last Name\" name=\"lastName\" ng-model=\"signUpData.lastName\" required />\n" +
    "                    <span class=\"help-message\" ng-if=\"signUpForm.lastName.$invalid && signUpForm.$submitted\">Please tell us your Last Name.</span>\n" +
    "                </div>\n" +
    "\n" +
    "                <!-- Form groups -->\n" +
    "                <div class=\"account__controls__form-groups--medium-offset\">\n" +
    "\n" +
    "                    <!-- Form group -->\n" +
    "                    <div class=\"form-group form-group--small-offset\" ng-class=\"{'has-error': signUpForm.$submitted && (signUpForm.password.$invalid || badPostSubmitResponse)}\">\n" +
    "                        <input class=\"form-control form-control--account\" type=\"password\" placeholder=\"Choose a password\" name=\"password\" ng-model=\"signUpData.password\" required strong-password />\n" +
    "\n" +
    "                        <div class=\"help-message\" ng-messages=\"signUpForm.password.$error\" ng-if=\"signUpForm.$submitted\">\n" +
    "                            <div ng-message=\"required\">Please choose a password.</div>\n" +
    "                            <div ng-message=\"strongPassword\">Your password needs to be at least 7 characters long.</div>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "\n" +
    "                <div class=\"account__controls__form__info\">\n" +
    "                    <div class=\"account__controls__form__info__left\">Timezone</div>\n" +
    "                    <div class=\"account__controls__form__info__right simptip-position-bottom simptip-fade simptip-smooth simptip-multiline\" data-tooltip=\"We automatically detected your timezone. You can change this later in the Settings page.\">{{timezoneDetails.value}}</div>\n" +
    "                </div>\n" +
    "\n" +
    "                <!-- Button container -->\n" +
    "                <button class=\"btn account__button\" type=\"submit\">Create new account</button>\n" +
    "            </div>\n" +
    "        </form>\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"account__section__terms\">\n" +
    "        * By singing up you agree to our\n" +
    "        <a href=\"javascript:void(0)\" ui-sref=\"privacy\" class=\"account__section__terms__link\">Terms and Privacy policy</a>\n" +
    "    </div>\n" +
    "\n" +
    "</div>");
}]);

angular.module("app/account/partials/validate_password_reset_token_abstract.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/account/partials/validate_password_reset_token_abstract.html",
    "<!--Validate password reset token section - abstract view-->\n" +
    "<div class=\"account__sections\">\n" +
    "\n" +
    "    <div ui-view></div>\n" +
    "\n" +
    "</div>");
}]);

angular.module("app/account/partials/validate_password_reset_token_invalid.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/account/partials/validate_password_reset_token_invalid.html",
    "<!-- Invalid token result view -->\n" +
    "<div class=\"alert alert-danger\">\n" +
    "    The token is invalid or expired.\n" +
    "    <br />\n" +
    "    <br />\n" +
    "\n" +
    "    <!-- Button container -->\n" +
    "    <a href=\"javascript:void(0)\" ng-click=\"continueToResetPassword()\">Let me try again.</a>\n" +
    "    <br />\n" +
    "    <span ng-if=\"isUserAuthenticated\">\n" +
    "        You are authenticated. You will be logged off if you want to try again.\n" +
    "    </span>\n" +
    "</div>");
}]);

angular.module("app/account/partials/validate_password_reset_token_valid.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/account/partials/validate_password_reset_token_valid.html",
    "<!-- Validate password reset token section -->\n" +
    "<div class=\"account__section\" ng-hide=\"successfullyReseted\">\n" +
    "\n" +
    "    <!-- Title -->\n" +
    "    <h1 class=\"account__title\">Reset your password.</h1>\n" +
    "\n" +
    "    <!-- Reset password form -->\n" +
    "    <form name=\"resetPasswordForm\" ng-submit=\"resetPassword(resetPasswordData)\" novalidate>\n" +
    "\n" +
    "        <!-- Account controls -->\n" +
    "        <div class=\"account__controls\">\n" +
    "\n" +
    "            <!-- Flash messages. -->\n" +
    "            <div flash-messages flash=\"flash\" identifier-id=\"{{alertIdentifierId}}\"></div>\n" +
    "\n" +
    "            <!-- Form groups -->\n" +
    "            <div class=\"account__controls__form-groups--last\">\n" +
    "\n" +
    "                <!-- Form group -->\n" +
    "                <div class=\"form-group\" ng-class=\"{'has-error': resetPasswordForm.$submitted && (resetPasswordForm.password.$invalid || badPostSubmitResponse)}\">\n" +
    "                    <input class=\"form-control form-control--account\" type=\"password\" placeholder=\"New password\" name=\"password\" ng-model=\"resetPasswordData.password\" auto-focus required />\n" +
    "                    <span class=\"help-message\" ng-if=\"resetPasswordForm.password.$invalid && resetPasswordForm.$submitted\">Your new password is mandatory.</span>\n" +
    "                </div>\n" +
    "\n" +
    "                <!-- Form group -->\n" +
    "                <div class=\"form-group\" ng-class=\"{'has-error': resetPasswordForm.$submitted && (resetPasswordForm.passwordConfirmation.$invalid || badPostSubmitResponse)}\">\n" +
    "                    <input class=\"form-control form-control--account\" type=\"password\" placeholder=\"New password confirmation\" name=\"passwordConfirmation\" ng-model=\"resetPasswordData.passwordConfirmation\" required />\n" +
    "                    <span class=\"help-message\" ng-if=\"resetPasswordForm.passwordConfirmation.$invalid && resetPasswordForm.$submitted\">Your confirm password is mandatory.</span>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <!-- Button container -->\n" +
    "            <button class=\"btn account__button\" type=\"submit\">Reset password</button>\n" +
    "        </div>\n" +
    "    </form>\n" +
    "\n" +
    "</div>\n" +
    "\n" +
    "<!-- Change password section successfully-->\n" +
    "<div class=\"account__section\" ng-hide=\"!successfullyReseted\">\n" +
    "\n" +
    "    <!-- Title -->\n" +
    "    <h1 class=\"account__title\">Successfully</h1>\n" +
    "\n" +
    "    <!-- Explain -->\n" +
    "    <span class=\"account__explain\">\n" +
    "        We've successfully updated your password.\n" +
    "    </span>\n" +
    "</div>");
}]);

angular.module("app/feedback/partials/feedback-modal.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/feedback/partials/feedback-modal.html",
    "<form name=\"feedbackForm\" ng-submit=\"sendFeedbackAndClose(feedbackForm)\" novalidate focus-first-error>\n" +
    "\n" +
    "    <div class=\"feedback-modal__header\">Feedback</div>\n" +
    "\n" +
    "    <div class=\"reminder-modal__form__cancel\">\n" +
    "        <button type=\"button\" class=\"close\" ng-click=\"dismissFeedbackModal()\" aria-label=\"Close\">\n" +
    "            <span aria-hidden=\"true\">×</span>\n" +
    "        </button>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"modal-body\" ng-if=\"! isSending && ! isSent\">\n" +
    "        <div class=\"form-group\" ng-class=\"{'has-error': feedbackForm.subject.$invalid && feedbackForm.$submitted}\">\n" +
    "            <input class=\"form-control\" type=\"text\" name=\"subject\" ng-model=\"feedback.model.subject\" placeholder=\"Subject\" required />\n" +
    "        </div>\n" +
    "        <div class=\"form-group\" ng-class=\"{'has-error': feedbackForm.message.$invalid && feedbackForm.$submitted}\">\n" +
    "            <textarea class=\"form-control\" rows=\"6\" name=\"message\" ng-model=\"feedback.model.message\" placeholder=\"Your message\" required></textarea>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"modal-body\" ng-if=\"isSending\">\n" +
    "        <div class=\"sending-status\">Sending your message...</div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"modal-body\" ng-if=\"isSent\">\n" +
    "        <div class=\"sending-status\">Thanks! We'll get back to you.</div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"modal-footer\">\n" +
    "        <button class=\"btn btn-link\" type=\"button\" ng-click=\"dismissFeedbackModal()\">Cancel</button>\n" +
    "        <button class=\"btn btn-primary\" type=\"submit\" ng-disabled=\"isSending || isSent\">Send</button>\n" +
    "    </div>\n" +
    "\n" +
    "</form>");
}]);

angular.module("app/common/partials/emailList/emailList.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/common/partials/emailList/emailList.html",
    "<div ng-repeat=\"email in emails track by $index\">\n" +
    "    <ng-form name=\"emailForm\">\n" +
    "        <div class=\"form-group form-group--email-icon\" ng-class=\"{'has-error': emailForm.email.$invalid && parentForm.$submitted}\">\n" +
    "\n" +
    "            <!--Inputs : first is your email-->\n" +
    "            <input class=\"form-control form-control--friend-email\" type=\"email\" placeholder=\"{{$index === 0 ? 'Your email' : 'Your friend\\'s email address'}}\" name=\"email\" ng-model=\"emails[$index].email\" required ng-disabled=\"$index === 0\" />\n" +
    "\n" +
    "            <!--Remove emails buttons-->\n" +
    "            <a href=\"javascript:void(0)\" ng-if=\"$index > 0\" class=\"close\" tabindex=\"-1\" ng-click=\"removeEmail($index)\">×</a>\n" +
    "        </div>\n" +
    "    </ng-form>\n" +
    "</div>\n" +
    "\n" +
    "<a class=\"btn-add-emails\" href=\"javascript:void(0)\" ng-click=\"addEmail()\" ng-show=\"canAddEmail\">Add another email recipient</a>");
}]);

angular.module("app/common/partials/flash-messages.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/common/partials/flash-messages.html",
    "<!-- Flash messages. -->\n" +
    "<div ng-attr-id=\"{{ identifierId }}\" flash-alert active-class=\"in alert\" class=\"alert--center fade\" duration=\"0\">\n" +
    "    <button type=\"button\" class=\"close\" ng-click=\"hide()\">&times;</button>\n" +
    "    <span class=\"alert-message\">{{flash.message}}</span>\n" +
    "</div>");
}]);

angular.module("app/common/partials/footer-home.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/common/partials/footer-home.html",
    "<div class=\"footer-home\">\n" +
    "    <div class=\"centered-section-home\">\n" +
    "\n" +
    "        <div class=\"footer__navbar\">\n" +
    "            <div class=\"footer__navbar__section-left\">\n" +
    "                <div class=\"footer__navbar__section-left__copyright\">\n" +
    "                    Made with <span class=\"icon-heart-2\"></span> in Cluj-Napoca.\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"footer__navbar__section-right\">\n" +
    "                <div class=\"footer__navbar__section-right__list footer__navbar__section-right__list--first\">\n" +
    "                    <ul>\n" +
    "                        <li><a href=\"javascript:void(0)\" ui-sref=\"about\">About</a></li>\n" +
    "                        <li><a href=\"build/assets/press/press_kit.zip\">Press kit</a></li>\n" +
    "                        <li><a href=\"javascript:void(0)\" ui-sref=\"privacy\">Privacy and Terms</a></li>\n" +
    "                    </ul>\n" +
    "                </div>\n" +
    "                <div class=\"footer__navbar__section-right__list\">\n" +
    "                    <ul>\n" +
    "                        <li><a href=\"https://twitter.com/reme_io\">Twitter</a></li>\n" +
    "                        <li><a href=\"https://www.facebook.com/reme.io\">Facebook</a></li>\n" +
    "                        <li><a href=\"https://plus.google.com/+RemeIo\">Google+</a></li>\n" +
    "                    </ul>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("app/common/partials/footer.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/common/partials/footer.html",
    "<div class=\"footer\">\n" +
    "    <div class=\"centered-section-logged\">\n" +
    "\n" +
    "        <div class=\"footer__navbar\">\n" +
    "            <div class=\"footer__navbar__section-left\">\n" +
    "                <div class=\"footer__navbar__section-left__copyright\">\n" +
    "                    Made with <span class=\"icon-heart-2\"></span> in Cluj-Napoca.\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"footer__navbar__section-right\">\n" +
    "                <div class=\"footer__navbar__section-right__list\">\n" +
    "                    <ul>\n" +
    "                        <li><a href=\"javascript:void(0)\" ui-sref=\"about\">About</a></li>\n" +
    "                        <li><a href=\"build/assets/press/press_kit.zip\">Press kit</a></li>\n" +
    "                        <li><a href=\"javascript:void(0)\" ui-sref=\"privacy\">Privacy and Terms</a></li>\n" +
    "                    </ul>\n" +
    "                </div>\n" +
    "                <div class=\"footer__navbar__section-right__list\">\n" +
    "                    <ul>\n" +
    "                        <li><a href=\"https://twitter.com/reme_io\">Twitter</a></li>\n" +
    "                        <li><a href=\"https://www.facebook.com/reme.io\">Facebook</a></li>\n" +
    "                        <li><a href=\"https://plus.google.com/+RemeIo\">Google+</a></li>\n" +
    "                    </ul>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("app/common/partials/header-home.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/common/partials/header-home.html",
    "<nav class=\"navbar navbar-default navbar--white navbar--home navbar-fixed-top\">\n" +
    "\n" +
    "    <div class=\"navbar__wrapper navbar__wrapper--home\">\n" +
    "\n" +
    "        <!-- Brand and toggle get grouped for better mobile display -->\n" +
    "        <div class=\"navbar-header\">\n" +
    "            <button type=\"button\" class=\"navbar-toggle collapsed\" data-toggle=\"collapse\" data-target=\"#navbar-collapse-target\">\n" +
    "                <span class=\"sr-only\">Toggle navigation</span>\n" +
    "                <span class=\"icon-bar\"></span>\n" +
    "                <span class=\"icon-bar\"></span>\n" +
    "                <span class=\"icon-bar\"></span>\n" +
    "            </button>\n" +
    "            <a class=\"navbar-brand navbar__wrapper__brand\" ui-sref=\"home\">\n" +
    "                <span class=\"navbar__wrapper__brand__logo\"></span>\n" +
    "                <span class=\"navbar__wrapper__brand__text\">Reme</span>\n" +
    "            </a>\n" +
    "        </div>\n" +
    "\n" +
    "        <!-- Collect the nav links, forms, and other content for toggling -->\n" +
    "        <div class=\"collapse navbar-collapse\" id=\"navbar-collapse-target\">\n" +
    "            <ul class=\"nav navbar-nav navbar-right\">\n" +
    "                <li>\n" +
    "                    <a href=\"javascript:void(0)\" ui-sref=\"about\">About</a>\n" +
    "                </li>\n" +
    "                <li ng-if=\"! currentUser.isAuthenticated()\" class=\"btn__wrapper\">\n" +
    "                    <a class=\"btn btn--login\" href=\"javascript:void(0)\" ui-sref=\"account\">Login</a></li>\n" +
    "                <li class=\"narrow btn__wrapper\" ng-if=\"currentUser.isAuthenticated()\">\n" +
    "                    <a class=\"btn btn--to-reminders\" href=\"javascript:void(0)\" ui-sref=\"reminders.regular\">Go to my reminders</a>\n" +
    "                </li>\n" +
    "                <li class=\"btn__wrapper\" ng-if=\"currentUser.isAuthenticated()\">\n" +
    "                    <a class=\"btn btn--logout\" href=\"javascript:void(0)\" ui-sref=\"account:logout\">Logout</a>\n" +
    "                </li>\n" +
    "            </ul>\n" +
    "        </div>\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "</nav>");
}]);

angular.module("app/common/partials/header.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/common/partials/header.html",
    "<nav class=\"navbar navbar-default navbar--white\">\n" +
    "\n" +
    "    <div class=\"navbar__wrapper\">\n" +
    "\n" +
    "        <!-- Brand and toggle get grouped for better mobile display -->\n" +
    "        <div class=\"navbar-header\">\n" +
    "            <button type=\"button\" class=\"navbar-toggle collapsed\" data-toggle=\"collapse\" data-target=\"#navbar-collapse-target\">\n" +
    "                <span class=\"sr-only\">Toggle navigation</span>\n" +
    "                <span class=\"icon-bar\"></span>\n" +
    "                <span class=\"icon-bar\"></span>\n" +
    "                <span class=\"icon-bar\"></span>\n" +
    "            </button>\n" +
    "            <a class=\"navbar-brand navbar__wrapper__brand\" href=\"javascript:void(0)\" ui-sref=\"reminders.regular\">\n" +
    "                <span class=\"navbar__wrapper__brand__logo\"></span>\n" +
    "                <span class=\"navbar__wrapper__brand__text\"></span>\n" +
    "            </a>\n" +
    "        </div>\n" +
    "\n" +
    "        <!-- Collect the nav links, forms, and other content for toggling -->\n" +
    "        <div class=\"collapse navbar-collapse\" id=\"navbar-collapse-target\">\n" +
    "            <ul class=\"nav navbar-nav navbar-right\">\n" +
    "                <li>\n" +
    "                    <a ng-controller=\"FeedbackModalCtrl\" id=\"feedback-trigger\" class=\"navbar__wrapper__feedback navbar__link\" href=\"javascript:void(0)\" ng-click=\"openFeedbackModal()\">\n" +
    "                        <span class=\"icon-comment-2\"></span> Send feedback\n" +
    "                    </a>\n" +
    "                </li>\n" +
    "                <li class=\"dropdown\">\n" +
    "                    <a ng-show=\"currentUser.model.email\" href=\"javascript:void(0)\" class=\"dropdown-toggle navbar__link\" data-toggle=\"dropdown\" role=\"button\" aria-expanded=\"false\">{{currentUser.model.email}}\n" +
    "                        <span class=\"caret\"></span>\n" +
    "                    </a>\n" +
    "                    <ul class=\"dropdown-menu\" role=\"menu\">\n" +
    "                        <li><a class=\"nav-link\" href=\"javascript:void(0)\" ui-sref=\"settings\">Settings</a></li>\n" +
    "                        <li><a class=\"nav-link\" href=\"javascript:void(0)\" ui-sref=\"account:logout\">Logout</a></li>\n" +
    "                    </ul>\n" +
    "                </li>\n" +
    "            </ul>\n" +
    "        </div>\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "</nav>");
}]);

angular.module("app/common/partials/timepickerPopup/timepickerPopup.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/common/partials/timepickerPopup/timepickerPopup.html",
    "<button type=\"button\" class=\"btn btn--reminder-popup bg-sprite dropdown-toggle\" animate animate-on=\"nlpDate:timeChange\" animate-class=\"highlight-button\" dropdown-toggle> {{date | friendlyHourTimePicker}}</button>\n" +
    "\n" +
    "<ul class=\"dropdown-menu dropdown-menu-time-picker\" perfect-scrollbar suppress-scroll-x=\"true\" wheel-speed=\"52\" update-on=\"perfectScrollbar:update\">\n" +
    "    <li ng-repeat=\"time in times\" ng-class=\"{selected: highlightSelected && time.index == selectedIndex}\">\n" +
    "        <a href ng-click=\"setTime(time)\">{{time.timestamp | friendlyHourTimePicker}}</a>\n" +
    "    </li>\n" +
    "</ul>\n" +
    "");
}]);

angular.module("template/datepicker/datepicker.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/datepicker/datepicker.html",
    "<table class=\"datepicker\">\n" +
    "  <thead>\n" +
    "    <tr class=\"datepicker-jump-controls\">\n" +
    "      <th><button type=\"button\" class=\"btn btn-default pull-left\" ng-click=\"move(-1)\">‹</button></th>\n" +
    "      <th colspan=\"{{rows[0].length - 2 + showWeekNumbers}}\"><button type=\"button\" class=\"btn btn-default btn-block\" ng-click=\"toggleMode()\"><strong>{{title}}</strong></button></th>\n" +
    "      <th><button type=\"button\" class=\"btn btn-default btn-block pull-right\" ng-click=\"move(1)\">›</button></th>\n" +
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
    "        <button type=\"button\" class=\"btn\" ng-class=\"{'btn-primary': dt.selected, 'btn-default': !dt.selected}\" ng-click=\"select(dt.date)\" ng-disabled=\"dt.disabled\"><span ng-class=\"{'text-muted': dt.secondary}\">{{dt.label}}</span></button>\n" +
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
    "		<button type=\"button\" class=\"btn btn-default btn-block\" ng-click=\"today(dt)\">Today</button>\n" +
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
    "<div tabindex=\"-1\" class=\"modal reminder-modal--animate {{ windowClass }}\" ng-class=\"{in: animate}\" ng-style=\"{'z-index': 1050 + index*10, display: 'block'}\" ng-click=\"close($event)\">\n" +
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

angular.module("template/tabs/tab.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/tabs/tab.html",
    "<li ng-class=\"{active: active, disabled: disabled}\">\n" +
    "    <a href ng-click=\"select()\" tab-heading-transclude>{{heading}}</a>\n" +
    "</li>\n" +
    "");
}]);

angular.module("template/tabs/tabset.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/tabs/tabset.html",
    "<div>\n" +
    "    <ul class=\"nav nav-{{type || 'tabs'}} nav-tabs--horizontal nav-tabs--underlined\"\n" +
    "        ng-class=\"{'nav-stacked nav-tabs--vertical': vertical, 'nav-justified': justified}\"\n" +
    "        ng-transclude></ul>\n" +
    "    <div class=\"tab-content\">\n" +
    "        <div class=\"tab-pane\"\n" +
    "             ng-repeat=\"tab in tabs\"\n" +
    "             ng-class=\"{active: tab.active}\"\n" +
    "             tab-content-transclude=\"tab\">\n" +
    "        </div>\n" +
    "    </div>\n" +
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
