angular
    .module("account")
    .factory("User", function (SessionService, $q, $http, AUTH_URLS) {
        return {

            $new: function () {

                return {

                    /**
                     * User model (DTO)
                     */
                    model: {
                        userId: "",
                        firstName: "",
                        lastName: "",
                        email: "",
                        password: "",
                        timezone: ""
                    },

                    /**
                     * Loads a user from cookies.
                     * @returns {*}
                     */
                    loadFromSession: function () {
                        this.setSelectiveKey(this.model, SessionService.getData() || {});

                        return this;
                    },

                    /**
                     * Saves a user to cookies.
                     * @returns {*}
                     */
                    saveToSession: function () {
                        var sessionData = {};
                        this.setSelectiveKey(sessionData, this, ["password"]);
                        SessionService.setData(sessionData);

                        return this;
                    },

                    /**
                     * Updates a user account.
                     * @returns {*}
                     */
                    $save: function (fromData) {
                        var toBeSaved = {};
                        this.setSelectiveKey(toBeSaved, fromData);

                        return this.updateAccount(toBeSaved);
                    },

                    /**
                     * Creates a user account with given fromData.
                     * @param fromData
                     * @returns {*}
                     */
                    $create: function (fromData) {
                        var toBeCreated = {};
                        this.setSelectiveKey(toBeCreated, fromData);

                        return this.createAccount(toBeCreated);
                    },

                    $refresh: function () {
                        var that = this;

                        return this
                            .retrieveDetails()
                            .then(function (response) {
                                that.setSelectiveKey(that, response.data);
                                that.saveToSession();

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
                    },

                    /**
                     * Sets selective keys on a target object from a source object.
                     * @param targetObject
                     * @param sourceObject
                     * @param skipKeys
                     */
                    setSelectiveKey: function (targetObject, sourceObject, skipKeys) {
                        _.each(_.keys(this.model), function (key) {
                            if ( !(skipKeys && _.contains(skipKeys, key)) ) {
                                targetObject[key] = sourceObject[key];
                            }
                        });
                    }

                }
            }

        }
    });