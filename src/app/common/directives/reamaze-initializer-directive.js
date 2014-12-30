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
                _support['authkey'] = scope.currentUser.authKeyReamaze || '5b0e26989c5660ef4b5b9af89effd8f8394b0ee0e04a578d446740a86239e3d0';
                _support['name'] = scope.currentUser.model.firstName + ' ' + scope.currentUser.model.lastName;
                _support['email'] = scope.currentUser.model.email;

                $window._support = _support;
            }
        }
    });
