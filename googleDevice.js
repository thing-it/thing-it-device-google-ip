module.exports = {
    metadata: {
        family: 'google-ip',
        plugin: 'googleDevice',
        label: 'Google Home or Chromecast',
        manufacturer: 'Google',
        discoverable: true,
        tangible: true,
        additionalSoftware: [],
        actorTypes: [],
        sensorTypes: [],
        state: [{
            id: "language",
            label: "Language",
            type: {
                id: "string"
            }
        }, {
            id: "lastUtterance",
            label: "Last Utterance",
            type: {
                id: "string"
            }
        }, {
            id: "lastUtteranceTimestamp",
            label: "Last Utterance Timestamp",
            type: {
                id: "timestamp"
            }
        }],
        services: [{
            id: "utter", label: "Utter", parameters: [{
                id: "utterance", label: "Utterance", type: {id: "string"}
            }, {
                id: "language", label: "Language", type: {id: "string"}
            }]
        }],
        configuration: [
            {
                label: "IP Address",
                id: "ipAddress",
                type: {
                    id: "string"
                },
                defaultValue: "192.168.192.1"
            }, {
                label: "Port",
                id: "port",
                type: {
                    id: "integer"
                },
                defaultValue: 55555
            }, {
                label: "Gateway ID",
                id: "gatewayId",
                type: {
                    id: "string"
                }
            }, {
                label: "Default Language",
                id: "defaultLanguage",
                type: {
                    id: "string"
                }
            }
        ]
    },
    create: function () {
        return new GoogleDevice();
    },
    discovery: function () {
        return new GoogleDeviceDiscovery();
    }
};

var q = require('q');
var moment = require('moment');

/**
 *
 * @constructor
 */
function GoogleDeviceDiscovery() {
    /**
     *
     * @param options
     */
    GoogleDeviceDiscovery.prototype.start = function () {
        if (this.isSimulated()) {
            this.timer = setInterval(function () {
            }.bind(this), 20000);
        } else {
            this.discoverIpAddresses('googlecast', function (ipaddresses) {
                // Pick up Devices
            });
        }
    };

    /**
     *
     * @param options
     */
    GoogleDeviceDiscovery.prototype.stop = function () {
        if (this.timer) {
            clearInterval(this.timer);
        }

    };

    GoogleDeviceDiscovery.prototype.discoverIpAddresses = function (serviceType, discoveryCallback) {
        var ipaddresses = [];
        var bonjour = require('bonjour')();

        bonjour.find({
            type: serviceType
        }, function (service) {
            service.addresses.forEach(function (element) {
                if (element.split(".").length == 4) {
                    var label = "" + service.txt.md + " (" + element + ")";
                    ipaddresses.push({
                        label: label,
                        value: element
                    });
                }
            });

            // Add a bit of delay for all services to be discovered

            if (discoveryCallback)
                setTimeout(function () {
                    discoveryCallback(ipaddresses);
                }, 2000);
        });
    }
}

/**
 *
 * @constructor
 */
function GoogleDevice() {
    /**
     *
     */
    GoogleDevice.prototype.start = function () {
        var deferred = q.defer();

        this.state = {};

        if (this.isSimulated()) {
            this.logDebug("Starting Google Device in simulated mode.");

            deferred.resolve();
        } else {
            deferred.resolve();
        }

        return deferred.promise;
    };

    /**
     *
     */
    GoogleDevice.prototype.stop = function () {
        var deferred = q.defer();

        if (this.isSimulated()) {
            this.logDebug("Stopping Google Device in simulated mode.");
        } else {
        }

        deferred.resolve();

        return deferred.promise;
    };

    /**
     *
     */
    GoogleDevice.prototype.getState = function () {
        return {};
    };

    /**
     *
     */
    GoogleDevice.prototype.setState = function (state) {
        this.publishStateChange(state);
    };

    /**
     *
     */
    GoogleDevice.prototype.utter = function (parameters) {
        if (this.isSimulated()) {
            this.state.lastUtterance = parameters.utterance;
            this.state.lastUtteranceTimestamp = moment().toISOString();

            this.publishStateChange(this.state);
        } else {
            console.log('HTTP Call: ', parameters);

            this.state.lastUtterance = parameters.utterance;
            this.state.lastUtteranceTimestamp = moment().toISOString();

            this.publishStateChange(this.state);
        }
    };
}

