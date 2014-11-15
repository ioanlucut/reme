angular.module('partials', ['app/site/partials/home.html']);

angular.module("app/site/partials/home.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/site/partials/home.html",
    "HOME {{helloMessage.message}}");
}]);
