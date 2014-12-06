angular
    .module("account")
    .factory("User", function (SessionService, AuthService) {
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
                    $save: function () {
                        return AuthService.updateAccount(this);
                    },

                    /**
                     * Creates a user account with given userData.
                     * @param userData
                     * @returns {*}
                     */
                    $create: function (userData) {
                        _.each(["userId", "firstName", "lastName", "email", "password", "timezone"], _.bind(function (property) {
                            this[property] = userData[property];
                        }, this));
                        return AuthService.createAccount(this);
                    }

                }
            }

        }
    });