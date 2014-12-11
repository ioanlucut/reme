angular
    .module("account")
    .factory("User", function (SessionService, $q, $http, AUTH_URLS) {
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

                        return this.updateAccount(toBeSaved);
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
                        _.each(["userId", "firstName", "lastName", "email", "password", "timezone"], function (property) {
                            toBeSaved[property] = originalUser[property];
                        });

                        return this.createAccount(toBeSaved);
                    },

                    $refresh: function () {
                        var originalUser = this;

                        return this.retrieveDetails()
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
                    },

                    /**
                     * Retrieves details about the current account.
                     * @returns {*}
                     */
                    retrieveDetails: function () {
                        return $http.get(URLTo.api(AUTH_URLS.details));
                    },

                    /**
                     * Creates the account.
                     * @param account
                     * @returns {*}
                     */
                    createAccount: function (account) {
                        return $http.post(URLTo.api(AUTH_URLS.create), account);
                    },

                    /**
                     * Updates given account.
                     * @param account
                     * @returns {*}
                     */
                    updateAccount: function (account) {
                        return $http.post(URLTo.api(AUTH_URLS.update), account);
                    }

                }
            }

        }
    });