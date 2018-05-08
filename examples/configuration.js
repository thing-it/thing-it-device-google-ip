module.exports = {
    label: "Google Home/Chromecast",
    id: "googleHomeChromecast",
    autoDiscoveryDeviceTypes: [],
    devices: [{
        label: "Gateway",
        id: "gateway",
        plugin: "enocean-ip/gateway",
        configuration: {
            host: "192.168.5.100"/*"127.0.0.1"*/,
            port: 8080/*3335*/,
            defaultLanguage: 'en'
        },
        actors: [],
        sensors: [],
        logLevel: "debug"
    }],
    groups: [],
    services: [],
    eventProcessors: [],
    data: []
};
