angular
    .module("common")
    .service("CamelCaseTransform", function () {

        /**
         * Transformation type. Can be camelize or decamelize only.
         * @type {{CAMELIZE: string, DECAMELIZE: string}}
         */
        this.TRANSFORMATION_TYPE = {
            CAMELIZE: "CAMELIZE",
            DECAMELIZE: "DECAMELIZE"
        };

        /**
         * Transforms an object camelized or decamelized.
         * @param objectToTransform
         * @param transformationType
         */
        this.transform = function (objectToTransform, transformationType) {
            if ( objectToTransform && _.isArray(objectToTransform) ) {
                _.each(objectToTransform, _.bind(function (arrayElement) {
                    this.transformObject(arrayElement, transformationType);
                }, this));
            } else {
                this.transformObject(objectToTransform, transformationType);
            }
        };

        /**
         * Transforms an object camelized or decamelized (handles only simple objects, non-array).
         * @param objectToTransform
         * @param transformationType
         */
        this.transformObject = function (objectToTransform, transformationType) {
            var thisService = this;

            if ( objectToTransform && _.isObject(objectToTransform) ) {
                _.each(objectToTransform, function (value, key) {
                    if ( objectToTransform.hasOwnProperty(key) ) {
                        var newKey = transformationType === thisService.TRANSFORMATION_TYPE.CAMELIZE ? humps.camelize(key) : humps.decamelize(key);

                        // Do it recursively
                        if ( _.isObject(objectToTransform[key]) && !_.isArray(objectToTransform[key]) ) {
                            thisService.transformObject(objectToTransform[key], transformationType);
                        }
                        if ( key !== newKey ) {
                            objectToTransform[newKey] = objectToTransform[key];
                            delete objectToTransform[key];
                        }
                    }
                });
            }
        };
    });
