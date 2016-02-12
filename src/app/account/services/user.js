angular
    .module('account')
    .factory('User', function (SessionService, TransformerUtils, $q, $http, AUTH_URLS) {
      return {

        $new: function () {

          return {

            /**
             * User model (DTO)
             */
            model: {
              userId: '',
              firstName: '',
              lastName: '',
              email: '',
              password: '',
              timezone: '',
              helpdeskAuthToken: '',
            },

            /**
             * Is user already authenticated
             * @returns {*}
             */
            isAuthenticated: function () {
              return SessionService.sessionExists();
            },

            /**
             * Loads a user from cookies.
             * @returns {*}
             */
            loadFromSession: function () {
              TransformerUtils.copyKeysFromTo(SessionService.getData() || {}, this.model);

              return this;
            },

            /**
             * Saves a user to cookies.
             * @returns {*}
             */
            saveToSession: function () {
              var sessionData = {};
              TransformerUtils.copyKeysFromTo(this, sessionData, ['password']);
              SessionService.setData(sessionData);

              return this;
            },

            /**
             * Updates a user account.
             * @returns {*}
             */
            $save: function (fromData) {
              var toBeSaved = {};
              TransformerUtils.copyKeysFromTo(fromData, toBeSaved);

              return this.updateAccount(toBeSaved);
            },

            /**
             * Creates a user account with given fromData.
             * @param fromData
             * @param token
             * @returns {*}
             */
            $create: function (fromData, token) {
              var toBeCreated = {};
              TransformerUtils.copyKeysFromTo(fromData, toBeCreated);

              return this.createAccount(toBeCreated, token);
            },

            $refresh: function () {
              var that = this;

              return this
                  .retrieveDetails()
                            .then(function (response) {
                              TransformerUtils.copyKeysFromTo(response.data, that);
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
             * @param token
             * @returns {*}
             */
            createAccount: function (account, token) {
              return $http
                            .post(URLTo.api(AUTH_URLS.create, {
                              ':email': account.email,
                              ':token': token,
                            }), account,
                            { skipAuthorization: true })
                            .then(function (response) {
                              return response.data;
                            });
            },

            /**
             * Updates given account.
             * @param account
             * @returns {*}
             */
            updateAccount: function (account) {
              return $http.post(URLTo.api(AUTH_URLS.update), account);
            },

          };
        },

      };
    });
