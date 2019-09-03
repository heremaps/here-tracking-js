/*
 * Copyright (C) 2017-2019 HERE Europe B.V.
 * Licensed under MIT, see full license in LICENSE
 * SPDX-License-Identifier: MIT
 *
 *
 * Device management interfaces.
 *
 * This class handles device claiming and unclaiming as well as mapping deviceId to trackingID and vice versa.
 *
 */
class Devices {

  /**
   * @param {Object} utils - General utilities passed from main HERETracking
   * @param {function(varArgs: ...string): string} utils.url - Generate the URL for HERE Tracking
   * @param {function(options: Object, required: Array): Promise} utils.validate - Check the supplied parameters
   * @param {function(url: string, options: Object): Object} utils.fetch - Wrap the standard Fetch API
   * (https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) to provide error handling
   */
  constructor(utils) {
    /**
     * Generate the URL for HERE Tracking
     * @type {function(varArgs: ...string): string} Generate the URL for HERE Tracking
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
   * Claim a device. Bind a new device to a user.
   * /registry/v2/devices/{deviceId}
   *
   * @example
   * hereTracking.devices.claim('c0ba6127-e3ba-4518-ada1-ef4274836bd1', { token: 'h1.123...' })
   * {
   *   "trackingId": "HERE-3e8b0d78-2fef-4644-a214-49c9c332637c"
   * }
   *
   * @param {string} deviceId - UUID of the device
   * @param {Object} options - Object containing method options
   * @param {string} options.token - Valid user access token
   * @param {string} [options.ownerAppId] - Application identifier which
   * specifies device owner's application to which the device is associated with
   * @returns {Object} Body of the claim response. Contains the new trackingId
   * @throws {Error} When an HTTP error has occurred
   */
  claim(deviceId, { token, ownerAppId }) {
    let body;

    if (ownerAppId) {
      body = JSON.stringify({ ownerAppId });
    }

    return this.validate({ token, deviceId }, ['token', 'deviceId'])
      .then(() => this.fetch(this.url('registry', 'v2', 'devices', deviceId), {
        method: 'put',
        headers: new Headers({
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }),
        body
      }));
  }

  /**
   * Unclaim a device. Unbind a trackingId from a user.
   * /registry/v2/{trackingId}
   *
   * @example
   * hereTracking.devices.unclaim('HERE-3e8b0d78-2fef-4644-a214-49c9c332637c', { token: 'h1.123...' })
   *
   * @param {string} trackingId - Tracking ID of the device
   * @param {Object} options - Object containing method options
   * @param {string} options.token - Valid user access token
   * @returns {Object} Body of the unclaim response.
   * @throws {Error} When an HTTP error has occurred
   */
  unclaim(trackingId, { token }) {
    return this.validate({ token, trackingId }, ['token', 'trackingId'])
      .then(() => this.fetch(
        this.url('registry', 'v2', trackingId), {
          method: 'delete',
          headers: new Headers({
            'Authorization': `Bearer ${token}`
          })
        }));
  }

  /**
   * Get Tracking ID given a Device ID
   * /registry/v2/devices/{deviceId}
   *
   * @example
   * hereTracking.devices.trackingId('c0ba6127-e3ba-4518-ada1-ef4274836bd1', { token: 'h1.123...' })
   * {
   *   "trackingId": "HERE-3e8b0d78-2fef-4644-a214-49c9c332637c"
   * }
   *
   * @param {string} deviceId - Device ID of the device
   * @param {Object} options - Object containing method options
   * @param {string} options.token - Valid user access token
   * @returns {Object} Body containing the Tracking ID
   * @throws {Error} When an HTTP error has occurred
   */
  trackingId(deviceId, { token }) {
    return this.validate({ deviceId, token }, ['deviceId', 'token'])
      .then(() => this.fetch(
        this.url('registry', 'v2', 'devices', deviceId), {
          method: 'get',
          headers: new Headers({
            'Authorization': `Bearer ${token}`
          })
        }));
  }

  /**
   * Get Device ID given a Tracking ID
   * /registry/v2/{trackingId}
   *
   * @example
   * hereTracking.devices.deviceId('HERE-3e8b0d78-2fef-4644-a214-49c9c332637c', { token: 'h1.123...' })
   * {
   *   "deviceId": "c0ba6127-e3ba-4518-ada1-ef4274836bd1"
   * }
   *
   * @param {string} trackingId - Tracking ID of the device
   * @param {Object} options - Object containing method options
   * @param {string} options.token - Valid user access token
   * @returns {Object} Body containing the Tracking ID
   * @throws {Error} When an HTTP error has occurred
   */
  deviceId(trackingId, { token }) {
    return this.validate({ trackingId, token }, ['trackingId', 'token'])
      .then(() => this.fetch(
        this.url('registry', 'v2', trackingId), {
          method: 'get',
          headers: new Headers({
            'Authorization': `Bearer ${token}`
          })
        }));
  }

  /**
   * Get the geofences associated with a device.
   *
   * @param {string} trackingId - Tracking ID of the device
   * @param {Object} options - Object containing request options
   * @param {string} options.token - Valid user access token
   * @param {string} [options.pageToken] - Page token used for retrieving next page
   * @param {number} [options.count] - Number of geofences returned per page
   * @returns {Object} Body of the geofence response
   * @throws {Error} When an HTTP error has occurred
   */
  getGeofences(trackingId, { token, count, pageToken }) {
    return this.validate({ trackingId, token }, ['trackingId', 'token'])
      .then(() => {
        const queryParameters = {};

        if (count) {
          queryParameters.count = count;
        }
        if (pageToken) {
          queryParameters.pageToken = pageToken;
        }

        const url = this.url('device-associations', 'v2', trackingId,
          'geofences', queryParameters);

        return this.fetch(url, {
          credentials: 'include',
          headers: new Headers({
            'Authorization': `Bearer ${token}`
          })
        });
      });
  }
}

module.exports = Devices;
