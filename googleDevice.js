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
                defaultValue: "192.168.1.76"
            }, {
                label: "Device Name",
                id: "deviceName",
                type: {
                    id: "string"
                },
                defaultValue: "Google Home"
            }, {
                label: "Default Language",
                id: "defaultLanguage",
                type: {
                    id: "string"
                },
                defaultValue: "de"
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
var googlehome = require('google-home-notifier');

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

        // TODO: To be tested/implemented
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
            // Try to connect to device via device name first ...
            if (this.configuration.deviceName) {
                console.log(`Attempting connection to [${this.plugin}] using device name [${this.configuration.deviceName}]`);
                googlehome.device(this.configuration.deviceName, this.configuration.defaultLanguage);
            }
            else {
                // ... else try IP address
                console.log(`Attempting connection to [${this.plugin}] using IP address [${this.configuration.ipAddress}]`);
                googlehome.ip(this.configuration.ipAddress, this.configuration.defaultLanguage);
            }

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
            googlehome.notify(parameters.utterance, function(res) {
                console.log(res);
            });

            this.state.lastUtterance = parameters.utterance;
            this.state.lastUtteranceTimestamp = moment().toISOString();

            this.publishStateChange(this.state);
        }
    };
}

