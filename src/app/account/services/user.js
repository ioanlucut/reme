angular
    .module("account")
    .factory("User", function (restmod, SessionService) {
        return restmod.model('/users').mix({
            $config: {
                primaryKey: 'userId'
            },
            $extend: {
                Record: {

                    /**
                     * Loads a user from session
                     * @returns {*}
                     */
                    loadFromSession: function () {
                        var sessionData = SessionService.getData() || {};
                        _.each(["userId", "firstName", "lastName", "email"], _.bind(function (property) {
                            this[property] = sessionData[property];
                        }, this));

                        this.$pk = this.userId;

                        return this;
                    },

                    /**
                     * Saves a user to the session
                     * @returns {*}
                     */
                    saveToSession: function () {
                        var sessionData = {};
                        _.each(["userId", "firstName", "lastName", "email"], _.bind(function (property) {
                            sessionData[property] = this[property];
                        }, this));
                        SessionService.setData(sessionData);

                        return this;
                    }
                }
            }
        });
    });