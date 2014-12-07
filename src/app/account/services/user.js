angular
    .module("account")
    .factory("User", function (SessionService, AuthService, $q) {
        return {

            $new: function () {
                return {
                    /**
                     * Loads a user from cookies.
                     * @returns {*}
                     */
                    loadFromSession: function () {
                        var sessionData = SessionService.getData() || {};
                        _.each(["userId", "firstName", "lastName", "email", "timezone"], _.bind(function (property) {
                            this[property] = sessionData[property];
                        }, this));

                        return this;
                    },

                    /**
                     * Saves a user to cookies.
                     * @returns {*}
                     */
                    saveToSession: function () {
                        var sessionData = {};
                        _.each(["userId", "firstName", "lastName", "email", "timezone"], _.bind(function (property) {
                            sessionData[property] = this[property];
                        }, this));
                        SessionService.setData(sessionData);

                        return this;
                    },

                    /**
                     * Updates a user account.
                     * @returns {*}
                     */
                    $save: function (fromData) {
                        var toBeSaved = {};
                        _.each(["firstName", "lastName", "email", "timezone"], _.bind(function (property) {
                            this[property] = fromData[property];
                        }, toBeSaved));

                        return AuthService.updateAccount(toBeSaved);
                    },

                    /**
                     * Creates a user account with given fromData.
                     * @param fromData
                     * @returns {*}
                     */
                    $create: function (fromData) {
                        _.each(["userId", "firstName", "lastName", "email", "password", "timezone"], _.bind(function (property) {
                            this[property] = fromData[property];
                        }, this));

                        var toBeSaved = {};
                        var originalUser = this;
                        _.each(["userId", "firstName", "lastName", "email", "password", "timezone"], _.bind(function (property) {
                            this[property] = originalUser[property];
                        }, toBeSaved));

                        return AuthService.createAccount(toBeSaved);
                    },

                    $refresh: function () {
                        var originalUser = this;

                        return AuthService.retrieveDetails()
                            .then(function (response) {
                                _.each(["userId", "firstName", "lastName", "email", "timezone"], function (property) {
                                    originalUser[property] = response.data[property];
                                });
                                originalUser.saveToSession();

                                return response;
                            })
                            .catch(function (response) {
                                return $q.reject(response);
                            });
                    }

                }
            }

        }
    });