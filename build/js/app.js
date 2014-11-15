/* Account module */

angular.module("account", ["ui.router", "restmod"]);
;/* Site module */

angular.module("site", ["ngAnimate", "ui.router", "ui.bootstrap.bindHtml", "account"])

    .config(function ($stateProvider) {

        // Home
        $stateProvider

            // Home page
            .state("home", {
                url: "/",
                templateUrl: "app/site/partials/home.html",
                controller: "HomeCtrl",
                title: "home",
                resolve: {
                    helloMessage: function () {
                        return {
                            message: 'Hello!'
                        };
                    }
                }
            })
    });
;angular.module("site").controller("HomeCtrl", function ($scope, helloMessage) {
    $scope.helloMessage = helloMessage;
});;/* App module */

angular.module("app", [
        "ngAnimate",
        "ui.router",
        "partials",
        "site"
    ])
    .config(function($locationProvider) {

        // Enable html5 mode
        $locationProvider.html5Mode(true);
    })

    .run(function() {

        // Set the base API URL
        URLTo.apiBase("https://uat.reme.io/api");
    });;/* App controller */

angular.module("app").controller("AppCtrl", function($rootScope, $scope, $state) {

    // Save the state on root scope
    $rootScope.$state = $state;
});
;angular.module('partials', ['app/site/partials/home.html']);

angular.module("app/site/partials/home.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/site/partials/home.html",
    "HOME {{helloMessage.message}}");
}]);
