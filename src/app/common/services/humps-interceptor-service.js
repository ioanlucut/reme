angular
    .module("common")
    .factory("HumpsInterceptor", function () {

        var TRANSFORMATION_TYPE = {
            CAMELIZE: "CAMELIZE",
            DECAMELIZE: "DECAMELIZE"
        };

        var transform = function (value, transformationType) {
            if ( value && typeof value === 'object' ) {
                _.each(value, function (value, key) {
                    if ( value.hasOwnProperty(key) ) {
                        var newKey = transformationType === TRANSFORMATION_TYPE.CAMELIZE
                            ? humps.camelize(key) : humps.decamelize(key);
                        if ( key !== newKey ) {
                            value[newKey] = value[key];
                            delete value[key];
                        }
                    }
                });
            }
        };

        return {

            request: function (config) {
                transform(config.data, TRANSFORMATION_TYPE.DECAMELIZE);

                return config;
            },

            response: function (response) {
                transform(response.data, TRANSFORMATION_TYPE.CAMELIZE);

                return response;
            }

        };

    });
