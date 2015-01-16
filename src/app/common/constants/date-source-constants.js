/**
 * Date source constants.
 */
angular
    .module("common")
    .constant("DATE_SOURCE", {
        isFromNlp: "naturalLanguageProcessorSource",
        isFromUpdateAction: "updateReminderSource"
    });