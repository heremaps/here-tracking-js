/*
 * Copyright (C) 2017-2019 HERE Europe B.V.
 * Licensed under MIT, see full license in LICENSE
 * SPDX-License-Identifier: MIT
 */

const OAuth = require('oauth-1.0a');
const CryptoJS = require('crypto-js');

/**
 * Device sender interface
 *
 * This class handles authenticating device credentials and sending telemetry to
 * HERE Tracking. It can be used to create a virtual device.
 *
 * For more information, see:
 * https://developer.here.com/documentation/tracking/topics/devices.html
 *
 */
class Device {

  /**
   * Create a virtual device
   *
   * @param {Object} utils - General utilities passed from main HERETracking
   * @param {function(varArgs: ...string): string} utils.url - Generate the URL for HERE Tracking
   * @param {function(options: Object, required: Array): Promise} utils.validate - Check the supplied parameters
   * @param {function(url: string, options: Object): Object} utils.fetch - Wrap the standard Fetch API
   * (https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) to provide error handling
   */
  constructor(utils) {
    /**
     * Generate the URL for HERE Tracking
     * @type {function(varArgs: ...string): string} generate URL for HERE Tracking
     */
    this.url = utils.url;
    /**
     * Check the supplied parameters
     * @type {function(options: Object, required: Array): Promise}
     */
    this.validate = utils.validate;
    /**
     * Wrap the standard Fetch API (https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
     * to provide error handling
     * @type {function(url: string, options: Object): Object}
     */
    this.fetch = utils.fetch;
  }

  /**
   * Generate a one-time string for the OAuth 1.0 login
   *
   * *NOTE: The generated nonce will be different every time this method is called
   *
   * @example
   * hereTracking.device.generateNonce(6)
   * > a9fWF4
   *
   * @param {number} length - Desired length of the nonce
   * @returns {string} Generated nonce
   */
  static generateNonce(length) {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  /**
   * Log in the device
   *
   * Request a device token from HERE Tracking
   *
   * @example
   * hereTracking.device.login('878be51a-6e27-4484-811e-example', '39d-f44e8c56f515/example3is-F')
   * > { token: 'h1.1234...'}
   *
   * @param {string} deviceId - Valid device ID
   * @param {string} deviceSecret - Valid device secret
   * @returns {Object} Valid accessToken for this device
   * @throws {Error} When an HTTP error has occurred
   */
  login(deviceId, deviceSecret) {
    return this.validate({ deviceId, deviceSecret }, ['deviceId', 'deviceSecret'])
      .then(() => {

        /* eslint-disable camelcase */
        const oauth = OAuth({
          consumer: { key: deviceId, secret: deviceSecret },
          parameter_seperator: ',',
          hash_function(baseString, key) {
            return CryptoJS.enc.Base64.stringify(CryptoJS.HmacSHA256(baseString, key));
          }
        });

        // request token from device-http
        const oauthParameters = {
          oauth_consumer_key: deviceId,
          oauth_nonce: Device.generateNonce(6),
          oauth_timestamp: Math.floor(+new Date() / 1E3),
          oauth_signature_method: 'HMAC-SHA256',
          oauth_version: '1.0'
        };

        const oauthSignature = oauth.authorize({
          url: this.url('v2', 'token'),
          method: 'POST',
          data: oauthParameters
        });

        return this.fetch(this.url('v2', 'token'), {
          method: 'post',
          headers: new Headers(oauth.toHeader(oauthSignature))
        });
        /* eslint-enable camelcase */
      });
  }

  /**
   * Send telemetry
   *
   * Position Object example (see documentation for more detail)
   *
   *```
   *    {
   *      "lat": 55.9535,
   *      "lng": -3.1939,
   *      "alt": 81
   *    }
   *```
   *
   * @example
   * hereTracking.device.send({lat: 55.9535,lng: -3.1939,alt: 81}, { token: 'h1.1234...'})
   *
   * @param {Object} telemetry - Device telemetry
   * @param {Object} [telemetry.position] - Standard position object
   * @param {Object} [telemetry.payload] - Telemetry payload (arbitrary JSON)
   * @param {Object} [telemetry.scan] - WiFi Scan payload
   * @param {Object} [telemetry.timestamp] - Time of sample
   * @param {Object} requestOptions - Object containing method options
   * @param {string} requestoptions.token - Valid device token
   * @param {string} [requestOptions.deviceId] - Valid device ID. If not provided,
   * the deviceId from the last `.login()` call is used
   *
   * @returns {Object} Successful telemetry response object
   * @throws {Error} When an HTTP error has occurred
   */
  send(telemetry, { token, deviceId }) {
    return this.validate({ token }, ['token'])
      .then(() => {

        const body = Array.isArray(telemetry) ? telemetry : [telemetry];

        return this.fetch(this.url('device-http', 'v2'), {
          method: 'post',
          credentials: 'include',
          headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }),
          body: JSON.stringify(body)
        });
      });
  }
}

module.exports = Device;
