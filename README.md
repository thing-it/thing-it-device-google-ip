# thing-it-device-google-ip

[![NPM](https://nodei.co/npm/thing-it-device-google-ip.png)](https://nodei.co/npm/thing-it-device-google-ip/)
[![NPM](https://nodei.co/npm-dl/thing-it-device-google-ip.png)](https://nodei.co/npm/thing-it-device-google-ip/)

Device Plugin for [[thing-it-node]](https://github.com/marcgille/thing-it-node) and [thing-it.com](www.thing-it.com) 
allowing to remotely initiate voice utterances and play mp3 files e.g. to notify 
 
<a href="./documentation/images/home-mini.jpg"><img src="./documentation/images/home-mini.jpg" width="50%" height="50%"></a>

## Installation and Configuration

### Installation of NodeJS and [thing-it-node]

First, install [nodejs](https://nodejs.org/en/download/) on your computer (e.g. your PC or your Raspberry Pi).

Then install **[thing-it-node]** via

```
npm install -g thing-it-node
```
 
### Initialization and Start of [thing-it-node] 

The **[thing-it-device-google-ip]** Plugin is installed with **[thing-it-node]**, hence there is no need to install it separately.

The Plugin supports Autodiscovery, hence you only have to create a directory in which you intend to run the configuration, e.g.
 
```
mkdir ~/google-test
cd ~/google-test
```

and invoke

```
tin init
```

and then start **[thing-it-node]** via

```
tin run
```

### google Device Setup

As Auto-discovery is not in place yet, you will have to configure the connected Devices manually as e.g. in the [sample configuration]("./examples.configuration").

## Mobile UI

The following screenshot shows the Devices in [sample configuration]("./examples.configuration"):

<a href="./documentation/images/mobile-ui.png"><img src="./documentation/images/mobile-ui.png" width="50%" height="50%"></a>

## Where to go from here ...

After completing the above, you may be interested in

* Connecting additional [Devices](https://www.thing-it.com/thing-it/#/documentationPanel/mobileClient/deviceConfiguration) and configuring
[Groups](https://www.thing-it.com/thing-it/#/documentationPanel/mobileClient/groupConfiguration), 
[Services](https://www.thing-it.com/thing-it/#/documentationPanel/mobileClient/serviceConfiguration), 
[Event Processing](https://www.thing-it.com/thing-it/#/documentationPanel/mobileClient/eventConfiguration), 
[Storyboards](https://www.thing-it.com/thing-it/#/documentationPanel/mobileClient/storyboardConfiguration) and 
[Jobs](https://www.thing-it.com/thing-it/#/documentationPanel/mobileClient/jobConfiguration) via your **[thing-it] Mobile App**.
* Use [thing-it.com](https://www.thing-it.com) to safely connect your Gateway Computer from everywhere, manage complex configurations, store and analyze historical data 
* Explore other Device Plugins like [Texas Instruments Sensor Tag](https://www.npmjs.com/package/thing-it-device-ti-sensortag), [Philips Hue Lighting](https://www.npmjs.com/package/thing-it-device-philips-hue) and many more. For a full set of 
Device Plugins search for **thing-it-device** on [npm](https://www.npmjs.com/). Or [write your own Plugins](https://github.com/marcgille/thing-it-node/wiki/Plugin-Development-Concepts).