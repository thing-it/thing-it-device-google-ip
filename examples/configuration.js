module.exports = {
    label: "Google Home/Chromecast",
    id: "googleHomeChromecast",
    autoDiscoveryDeviceTypes: [],
    devices: [{
        label: "Google Home Mini",
        id: "googleHomeMini",
        plugin: "google-ip/googleDevice",
        configuration: {
            ipAddress: "192.168.1.76",
            deviceName: "Google Home",
            defaultLanguage: "en"
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
