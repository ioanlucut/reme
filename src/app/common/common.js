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
    .config(function ($httpProvider) {
        $httpProvider.interceptors.push("HumpsInterceptor");
        $httpProvider.interceptors.push("JWTInterceptor");
    });
