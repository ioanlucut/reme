/* Timezone detect */

angular
    .module("common")
    .factory("jstz", [function () {

        return window.jstz;

    }]);
