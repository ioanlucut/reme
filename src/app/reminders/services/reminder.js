angular
    .module("reminders")
    .factory("Reminder", function ($q, $http, ReminderService) {
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
                        additionalAddressees: [],
                        createdBy: "",
                        sent: "",
                        createdAt: "",
                        updatedAt: ""
                    },

                    isNew: function () {
                        return this.reminderId !== "";
                    },

                    loadFrom: function (loadFromModel) {
                        this.copyKeysFromTo(loadFromModel, this.model);

                        return this;
                    },

                    update: function (fromData) {
                        var toBeSaved = {};
                        this.copyKeysFromTo(fromData || this.model, toBeSaved);
                        toBeSaved["dueOn"] = toBeSaved["dueOn"].format("{yyyy}-{MM}-{dd} {HH}:{mm}:{ss}");

                        return ReminderService.updateReminder(toBeSaved);
                    },

                    create: function (fromData) {
                        var toBeCreated = {};
                        this.copyKeysFromTo(fromData || this.model, toBeCreated);
                        toBeCreated["dueOn"] = toBeCreated["dueOn"].format("{yyyy}-{MM}-{dd} {HH}:{mm}:{ss}");

                        return ReminderService.createReminder(toBeCreated);
                    },

                    destroy: function () {
                        return ReminderService.deleteReminder(this.model);
                    },

                    fetch: function (reminderId) {
                        var that = this;
                        var deferred = $q.defer();

                        ReminderService
                            .getDetails(reminderId || that.model.reminderId)
                            .then(function (response) {
                                that.copyKeysFromTo(response, that.model);

                                deferred.resolve(that);
                                return response;
                            })
                            .catch(function (response) {
                                return $q.reject(response);
                            });

                        return deferred.promise;
                    },

                    copyKeysFromTo: function (sourceObject, targetObject, skipKeys) {
                        _.each(_.keys(this.model), function (key) {
                            if ( !(skipKeys && _.contains(skipKeys, key)) ) {
                                targetObject[key] = sourceObject[key];
                            }
                        });
                    }

                };

                return newReminder.loadFrom(loadFromModel || {});
            }

        }
    });