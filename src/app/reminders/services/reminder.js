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
    });