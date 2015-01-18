"use strict";

angular.module('config', [])

    .constant('ENV', {
        name: 'development',
        apiEndpoint: 'http://api-dev.reme.io',
        mixPanelId: '216177bcdddef0cf2edd1650e63a3449'
    })

;