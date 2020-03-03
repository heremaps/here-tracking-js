/*
 * Copyright (C) 2017-2019 HERE Europe B.V.
 * Licensed under MIT, see full license in LICENSE
 * SPDX-License-Identifier: MIT
 *
 *
 */

const atLeastOneOf = ['definition', 'name', 'description'];

/**
 * Create, modify and delete geofences.
 *
 * This class also handles creating associations between geofences and devices.
 *
 * For more information, see:
 * https://developer.here.com/documentation/tracking/topics/geofences.html
 *
 */
class Geofences {

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
   * List the geofences available to the user.
   *
   * @param {Object} options - Object containing request options
   * @param {string} options.token - Valid user access token
   * @param {number} [options.count] - Number of geofences returned per page (default 100)
   * @param {string} [options.pageToken] - Page token used for retrieving next page
   * @returns {Object} Body of the geofence response
   * @throws {Error} When an HTTP error has occurred
   */
  list({ count, pageToken, token }) {
    return this.validate({ token }, ['token'])
      .then(() => {
        const queryParameters = {};

        if (count) {
          queryParameters.count = count;
        }
        if (pageToken) {
          queryParameters.pageToken = pageToken;
        }

        const url = this.url('geofences', 'v2', queryParameters);

        return this.fetch(url, {
          credentials: 'include',
          headers: new Headers({
            'Authorization': `Bearer ${token}`
          })
        });
      });
  }

  /**
   * Retrieve details about a geofence.
   *
   * @param {string} geofenceId - ID of geofence to retrieve
   * @param {Object} options - Object containing request options
   * @param {string} options.token - Valid user access token
   * @returns {Object} Body of the geofence response
   * @throws {Error} When an HTTP error has occurred
   */
  get(geofenceId, { token }) {
    return this.validate({ token, geofenceId }, ['token', 'geofenceId'])
      .then(() => {
        const url = this.url('geofences', 'v2', geofenceId);

        return this.fetch(url, {
          credentials: 'include',
          headers: new Headers({
            'Authorization': `Bearer ${token}`
          })
        });
      });
  }

  /**
   * Create a new geofence associated with a user
   *
   * @param {Object} geofence - definition of the geofence
   * @param {Object} options - Object containing request options
   * @param {string} options.token - Valid user access token
   * @returns {Object} Body of the geofence response
   * @throws {Error} When an HTTP error has occurred
   */
  create(geofence, { token }) {
    return this.validate({ token }, ['token'])
      .then(() => {
        const url = this.url('geofences', 'v2');

        const fields = Object.keys(geofence);

        if (fields.indexOf('type') < 0) {
          return Promise.reject(new Error('No geofence type specified'));
        }

        if (fields.indexOf('definition') < 0) {
          return Promise.reject(new Error('No geofence shape definition specified'));
        }

        return this.fetch(url, {
          method: 'post',
          headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }),
          body: JSON.stringify(geofence)
        });
      });
  }

  /**
   * Update a geofence
   *
   * @param {Object} geofence - Definition of the geofence
   * @param {Object} geofence.id - ID of the geofence
   * @param {Object} options - Object containing request options
   * @param {string} options.token - Valid user access token
   * @returns {Object} Body of the geofence response
   * @throws {Error} When an HTTP error has occurred
   */
  update(geofence, { token }) {
    return this.validate({ token }, ['token'])
      .then(() => this.validate(geofence, ['id']))
      .then(() => {
        const url = this.url('geofences', 'v2', geofence.id);

        delete geofence.id;

        const fields = Object.keys(geofence);

        const missing = atLeastOneOf.filter(x => fields.indexOf(x) < 0);

        if (missing.length === atLeastOneOf.length) {
          return Promise.reject(new Error(`Geofence update requires at least one of:  ${missing.join(', ')}`));
        }

        return this.fetch(url, {
          method: 'put',
          headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }),
          body: JSON.stringify(geofence)
        });
      });
  }

  /**
   * Remove geofence
   *
   * @param {Object} geofenceId - ID of the geofence
   * @param {Object} options - Object containing request options
   * @param {string} options.token - Valid user access token
   * @returns {Object}
   * @throws {Error} When an HTTP error has occurred
   */
  remove(geofenceId, { token }) {
    return this.validate({ geofenceId, token }, ['token', 'geofenceId'])
      .then(() => this.fetch(this.url('geofences', 'v2', geofenceId), {
        method: 'delete',
        headers: new Headers({
          'Authorization': `Bearer ${token}`
        })
      }));
  }

  /**
   * Remove all geofences.
   * This is a separate method so that it can't be called by accidentally
   * forgetting to pass geofenceId
   *
   * @param {boolean} really - Confirmation to delete all
   * @param {Object} options - Object containing request options
   * @param {string} options.token - Valid user access token
   * @returns {Object}
   * @throws {Error} When an HTTP error has occurred
   */
  removeAll(really, { token }) {
    return this.validate({ token }, ['token'])
      .then(() => {
        if (really !== true) {
          return Promise.reject(new Error('Confirmation required to delete all geofences.'));
        }

        const url = this.url('geofences', 'v2');

        return this.fetch(url, {
          method: 'delete',
          headers: new Headers({
            'Authorization': `Bearer ${token}`,
            'x-confirm': really
          })
        });
      });
  }

  /**
   * Get the devices associated with a geofence.
   *
   * @param {string} geofenceId - ID of the geofence
   * @param {Object} options - Object containing request options
   * @param {string} options.token - Valid user access token
   * @param {string} [options.pageToken] - Page token used for retrieving next page
   * @param {number} [options.count] - Number of devices returned per page
   * @returns {Object} Body of the device response
   * @throws {Error} When an HTTP error has occurred
   */
  getDevices(geofenceId, { token, count, pageToken }) {
    return this.validate({ geofenceId, token }, ['geofenceId', 'token'])
      .then(() => {
        const queryParameters = {};

        if (count) {
          queryParameters.count = count;
        }

        if (pageToken) {
          queryParameters.pageToken = pageToken;
        }

        const url = this.url('geofence-associations', 'v2', geofenceId, 'devices', queryParameters);

        return this.fetch(url, {
          credentials: 'include',
          headers: new Headers({
            'Authorization': `Bearer ${token}`
          })
        });
      });
  }

  /**
   * Add a device to a geofence
   *
   * @param {string} geofenceId - ID of geofence
   * @param {string} trackingId - ID of device to add
   * @param {Object} options - Object containing request options
   * @param {string} options.token - Valid user access token
   * @returns {Object} Body of the transition response
   * @throws {Error} When an HTTP error has occurred
   */
  addDevice(geofenceId, trackingId, { token }) {
    return this.validate({ geofenceId, trackingId, token }, ['geofenceId', 'trackingId', 'token'])
      .then(() => this.fetch(this.url('geofence-associations', 'v2', geofenceId, trackingId), {
        method: 'put',
        headers: new Headers({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        })
      }));
  }

  /**
   * Remove a device from a geofence
   *
   * @param {string} geofenceId - ID of geofence
   * @param {string} trackingId - ID of device to remove
   * @param {Object} options - Object containing request options
   * @param {string} options.token - Valid user access token
   * @returns {Object} Body of the transition response
   * @throws {Error} When an HTTP error has occurred
   */
  removeDevice(geofenceId, trackingId, { token }) {
    return this.validate({ geofenceId, trackingId, token }, ['geofenceId', 'trackingId', 'token'])
      .then(() => this.fetch(this.url('geofence-associations', 'v2', geofenceId, trackingId), {
        method: 'delete',
        headers: new Headers({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        })
      }));
  }

}

module.exports = Geofences;
