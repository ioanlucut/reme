/* Reminder  */

angular
    .module("reminders")
    .factory("Reminder", ["$http", "$q", "$", "URLTo", function ($http, $q, $, URLTo) {

        function Reminder(attrs) {

            // Setup
            this.attributes = {};
            this.idAttribute = "secure_id";

            // Initialize
            this.init = function (attrs) {
                attrs && this.attrs(attrs);
            };

            // Check if the reminder is new
            this.isNew = function () {
                return this.attr(this.idAttribute) === undefined;
            };

            // Get or Set an attribute by name
            this.attr = function (attribute, value) {

                // Setter
                if ( value !== undefined ) {
                    var mutator = "set" + this.underscoreToCamelCase(attribute) + "Attribute";
                    if ( $.isFunction(this[mutator]) ) {

                        // There exists a mutator, use it to set the attribute
                        this[mutator](value);
                    } else {

                        // No mutator exists for this attribute, set it manually
                        this.attributes[attribute] = value;
                    }
                }

                // Getter
                var accessor = "get" + this.underscoreToCamelCase(attribute) + "Attribute";
                if ( $.isFunction(this[accessor]) ) {

                    // There exists an accessor, use it to get the attribute
                    return this[accessor](this.attributes[attribute]);
                } else {

                    // No accessor exists for this attribute, get it manually
                    return this.attributes[attribute];
                }
            };

            // Get or Set multiple attributes at once
            this.attrs = function (attrs) {

                var key;

                // Setter
                if ( attrs !== undefined ) {
                    for ( key in attrs ) {
                        this.attr(key, attrs[key]);
                    }
                }

                // Getter
                attrs = {};

                for ( key in this.attributes ) {
                    attrs[key] = this.attr(key);
                }

                return attrs;
            };

            // Mutator for the due_on attribute
            this.setDueOnAttribute = function (dueOn) {
                this.attributes.due_on = Date.create(dueOn);
            };

            // Accessor for the due_on attribute
            this.getDueOnAttribute = function (dueOn) {
                return dueOn.format("{yyyy}-{MM}-{dd} {HH}:{mm}:{ss}");
            };

            // Accessor for the text attribute
            this.getTextAttribute = function (text) {
                return $.trim(text.split("@")[0]);
            };

            // Save reminder
            this.save = function () {

                var deferred = $q.defer();
                var url = this.isNew()
                    ? URLTo.api(this.constructor.urlRoot)
                    : URLTo.api(this.constructor.urlRoot + "/$1", [this.attr("secure_id")]);

                var method = this.isNew() ? "POST" : "PUT";

                // Send request
                $http({data: this.attrs(), method: method, url: url}).

                    success($.proxy(function (data) {

                        // Update reminder
                        this.attrs(data);
                        deferred.resolve(this);

                    }, this)).

                    error(function (data) {

                        // Reject the deferred with error data
                        deferred.reject(data);
                    });

                // Return the promise
                return deferred.promise;
            };

            // Delete reminder
            this.destroy = function () {

                // Make sure the reminder exists
                if ( this.isNew() ) return false;

                var url = URLTo.api(this.constructor.urlRoot + "/$1", [this.attr("secure_id")]);
                var method = "DELETE";

                return $http({method: method, url: url});
            };

            // Convert a string with underscores to camel case
            this.underscoreToCamelCase = function (str) {
                str = str.replace(/(\_[a-z])/g, function ($1) {
                    return $1.toUpperCase().replace('_', '');
                });

                return str.charAt(0).toUpperCase() + str.slice(1);
            };

            // Initialize
            this.init(attrs);
        }

        // Constructor methods and properties
        Reminder = angular.extend(Reminder, {

            // The url root to API urls
            urlRoot: "reminders",

            // Find a reminder by it's secure id
            find: function (secureId) {

                var deferred = $q.defer();

                // Load the reminder from the server
                var url = URLTo.api(this.urlRoot + "/$1", [secureId]);
                var method = "GET";

                $http({method: method, url: url}).

                    success(function (data) {

                        // Resolve the deferred with the reminder
                        var reminder = new Reminder(data);
                        deferred.resolve(reminder);
                    }).

                    error(function (data) {

                        // Reject the deferred with error data
                        deferred.reject(data);
                    });

                // Return the promise
                return deferred.promise;
            }

        });

        return Reminder;

    }]);
