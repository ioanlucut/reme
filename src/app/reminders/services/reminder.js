angular
    .module("reminders")
    .factory("Reminder", function ($q, $http, ReminderService) {
        return {

            build: function (modelToLoadFrom) {

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

                    /**
                     * Saves a reminder and update model with response.
                     * @returns {*}
                     */
                    save: function () {
                        var that = this;
                        var modelToBeSaved = {};

                        this.copyKeysFromTo(this.model, modelToBeSaved);
                        modelToBeSaved["dueOn"] = modelToBeSaved["dueOn"].format("{yyyy}-{MM}-{dd} {HH}:{mm}:{ss}");
                        modelToBeSaved["additionalAddresses"] = modelToBeSaved["additionalAddresses"].join(",");

                        var deferred = $q.defer();
                        ReminderService
                            [this.isNew() ? 'createReminder' : 'updateReminder'](modelToBeSaved)
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

                    parseFromTo: function (sourceObject) {
                        if ( !sourceObject ) {
                            return this;
                        }

                        this.copyKeysFromTo(sourceObject, this.model);

                        // handle date conversion
                        if ( this.model["dueOn"] ) {
                            this.model["dueOn"] = moment(this.model["dueOn"]).toDate();
                        }
                        //handle addresses conversion
                        var additionAddresses = this.model["additionalAddresses"];
                        if ( _.isEmpty(additionAddresses) ) {
                            this.model["additionalAddresses"] = [];
                        }
                        else {
                            this.model["additionalAddresses"] = _.values(additionAddresses.split(","));
                        }

                        return this;
                    },

                    copyKeysFromTo: function (sourceObject, targetObject, skipKeys) {
                        _.each(_.keys(this.model), function (key) {
                            if ( !(skipKeys && _.contains(skipKeys, key)) ) {
                                targetObject[key] = sourceObject[key];
                            }
                        });
                    }

                };

                return newReminder.parseFromTo(modelToLoadFrom || {}, newReminder);
            }

        }
    });