/* Animate */

angular
    .module("common")
    .directive("reamazeInitializer", function ($rootScope, $window) {
        return {
            restrict: "A",
            link: function (scope, el, attrs) {

                /**
                 * Current user email.
                 * @type {User.$new.model.email|*|.$new.model.email}
                 */
                scope.currentUser = $rootScope.currentUser;

                // Add a custom trigger to replace the default bottom-right widget
                var _support = $window._support || {};
                _support['account'] = 'remeio';
                _support['ui'] = {
                    widget: false,
                    trigger: '#feedback-trigger',
                    mailbox: 'Reme Hello'
                };

                // Authenticate User on Reamaze
                _support['id'] = scope.currentUser.model.userId;
                _support['authkey'] = scope.currentUser.model.helpdeskAuthToken;
                _support['name'] = scope.currentUser.model.firstName + ' ' + scope.currentUser.model.lastName;
                _support['email'] = scope.currentUser.model.email;

                $window._support = _support;
            }
        }
    });
