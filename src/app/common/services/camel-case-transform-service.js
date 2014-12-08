angular
    .module("common")
    .service("CamelCaseTransform", function (humps) {

        this.TRANSFORMATION_TYPE = {
            CAMELIZE: "CAMELIZE",
            DECAMELIZE: "DECAMELIZE"
        };

        this.transform = function (that, transformationType) {
            var thisService = this;

            if ( that && typeof that === 'object' ) {
                _.each(that, function (value, key) {
                    if ( that.hasOwnProperty(key) ) {
                        var newKey = transformationType === thisService.TRANSFORMATION_TYPE.CAMELIZE ? humps.camelize(key) : humps.decamelize(key);
                        if ( key !== newKey ) {
                            that[newKey] = that[key];
                            delete that[key];
                        }
                    }
                });
            }
        };
    });
