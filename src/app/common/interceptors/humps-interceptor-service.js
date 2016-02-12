angular
    .module('common')
    .factory('HumpsInterceptor', function (CamelCaseTransform) {

      return {

        request: function (config) {
          CamelCaseTransform.transform(config.data, CamelCaseTransform.TRANSFORMATION_TYPE.DECAMELIZE);

          return config;
        },

        response: function (response) {
          CamelCaseTransform.transform(response.data, CamelCaseTransform.TRANSFORMATION_TYPE.CAMELIZE);

          return response;
        },

      };

    });
