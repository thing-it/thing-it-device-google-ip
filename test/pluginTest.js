var assert = require("assert");

describe('[thing-it] Google IP Plugin', function () {
    var testDriver;

    before(function () {
        testDriver = require("thing-it-test").createTestDriver({logLevel: "debug", simulated: false});

        testDriver.registerDevicePlugin('google-ip', __dirname + "/../googleDevice");
    });
    describe('Start Configuration', function () {
        this.timeout(5000);

        it('should complete without error', function () {
            return testDriver.start({
                configuration: require("../examples/configuration.js"),
                heartbeat: 10
            });
        });
    });
    describe('Device Services', function () {
        this.timeout(5000);

        before(function () {
            testDriver.removeAllListeners();
        });
        it('should receive state change messages', function (done) {
            testDriver.addListener({
                publishDeviceStateChange: function (deviceId, actorId, state) {
                    console.log(deviceId, state);

                    done();
                }
            });

            testDriver.devices[0].utter({utterance: 'Oma, bist du in Ordnung?', language: 'de'});
        });
    });
});





