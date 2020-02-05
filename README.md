# HERE Tracking JS Library

This library simplifies access to [HERE Tracking](https://tracking.here.com). It can be used to create management consoles, monitoring interfaces and general device interfaces.

It can also be used to act as a virtual device and post telemetry to HERE Tracking.

You can find more information on the tracking platform here: [HERE Tracking Developer Guide](https://developer.here.com/documentation/tracking/index.html).

The compiled library is built for the last 2 versions of each major browser and IE 11.

## Prerequisites

This is a Node.js and browser module available through the [npm registry](https://npmjs.com).

To build and develop this library, [download and install Node.js](https://nodejs.org/en/download/).

Installation is done using the [`npm install` command](https://docs.npmjs.com/getting-started/installing-npm-packages-locally).

## Install

    npm install @here/tracking-js

## Directory Layout

Here is an overview of the top-level files contained in the repository:

    |
    +- demo   # Examples of how to use this library to create a management interface or a virtual device
    |
    +- docs   # (generated using 'npm run docs') Description of each class and method in the library
    |
    +- lib    # (generated using 'npm run build') Compiled and minified files
    |
    +- src    # Original source for each module
    |   |
    |   +- aliases.js           # Create and retrieve retrieve aliases associated with a trackingId
    |   |
    |   +- associations.js      # Manage associations between devices and other entities
    |   |
    |   +- device.js            # Use to create a virtual device
    |   |
    |   +- devices.js           # Access device management endpoints
    |   |
    |   +- events.js            # View details about events created by devices and rules
    |   |
    |   +- geofences.js         # Create and manage geofences
    |   |
    |   +- index.js             # Main HERETracking class
    |   |
    |   +- journeys.js          # Create and manage journey templates.
    |   |
    |   +- messages.js          # Error messages
    |   |
    |   +- metadata.js          # Create and retrieve retrieve metadata associated with a trackingId
    |   |
    |   +- notifications.js     # Subscribe to/unsubscribe from notification channels
    |   |
    |   +- rules.js             # Defining and manage sensor rules
    |   |
    |   +- shadows.js           # Manage device data
    |   |
    |   +- traces.js            # Access device trace history
    |   |
    |   +- transitions.js       # Access device transition history
    |   |
    |   +- users.js             # Manage user details
    |   |
    |   +- vendors.js           # Create and manage device licences
    |
    +- test   # Test cases

## Usage

### HTML

Include the minified file in your HTML:

    <script src="https://unpkg.com/@here/tracking-js@2.0.40/lib/HERETracking.min.js"></script>

### Node.JS

    const HERETracking = require('@here/tracking-js');

### HTML and Node.JS

Create a new HERETracking object:

    const tracking = new HERETracking();

Then set the environment you want to run against. The options are 'cit' (Customer Integration Testing) or 'production'.

    tracking.environment = 'production';

## Tests

    npm run test

## Example Methods

Log in a user:

    tracking.users.login('email@example.com', 'password123')
        .then(loginData => {
            console.log(loginData);
        });

    > {"accessToken": "h1.userTokenHere...", ...}

List a user's registered devices:

    tracking.users.listDevices({ token: 'h1.userTokenHere' })
        .then(devices => {
            console.log(devices);
        });

Retrieve a device's shadow (see [HERE Tracking Developer Guide - Shadows](https://developer.here.com/documentation/tracking/topics/shadows.html)):

    tracking.shadow.get('trackingIdHere', { token: 'h1.userTokenHere' })
        .then(deviceShadow => {
            console.log(deviceShadow);
        })

Log in a virtual device:

    tracking.device.login('deviceId', 'deviceSecret'})
        .then(deviceLoginData => {
            console.log(deviceLoginData);
        });

## HERE Account

A valid HERE Account user `accessToken` is required to perform any user-related actions. This token is returned following a successful login using a HERE Account email and password. See 'Log in a user' above. Visit [account.here.com](https://account.here.com/) to register a new user account.

## API Reference

Full auto-generated documentation will be available in the `docs` folder after running

    npm run docs

## Example Application

There is an example web interface project available in the `demo` folder.

> #### Note

> You will need to register on [developer.here.com](http://developer.here.com) to get an `app_id` and `app_code` in order to be able to see map tiles.

Rename the file `credentials.default.js` to `credentials.js` and enter your `app_id` and `app_code`.

To start the demo just open `demo/index.html` in Chrome or Firefox. You'll need to run a local server to use the demo files in other browsers due to local file security restrictions.

### demo/index.html

This will ask you to log into your HERE account then list any devices you have claimed to you account. Clicking on a trackingId will show you the last reported location of the device.

### demo/embed.html

A single-device view that can be embedded into another page. In addition to the map tile credentials, you must also enter a `username`, `password` and `trackingId` to see the device's position.

### demo/device.html

A virtual device that acts as a tracker, using the browser's Geolocation API as the location to send to HERE Tracking. You must enter a [device license](https://developer.here.com/documentation/tracking/topics/device-license.html.) generated on [https://app.tracking.here.com](app.tracking.here.com) into the form fields.

#### Generating a Device License

 1. Visit [https://app.tracking.here.com](app.tracking.here.com)
 2. Log in or register a HERE Account via [developer.here.com](http://developer.here.com)
 3. Select 'Add device'
 4. Select 'Register a new device ID'
 5. Copy the deviceId and deviceSecret into `device.html`

## Building this Library

This is not necessary if you just want to use the SDK. If you want to build from source, though:

    npm install
    npm run dev
    npm run test

Build the final (minified) version using

    npm run build

Build the [ESDoc](https://esdoc.org/) docs using:

    npm run docs

## How can I contribute?

You want to contribute to this library? Welcome! Please read the [CONTRIBUTING.md](CONTRIBUTING.md).

## License

Copyright (C) 2017-2019 HERE Europe B.V.

MIT license, see the [LICENSE](LICENSE) file in the root of this project for license details.