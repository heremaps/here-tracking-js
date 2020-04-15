/*
 * Copyright (C) 2017-2019 HERE Europe B.V.
 * Licensed under MIT, see full license in LICENSE
 * SPDX-License-Identifier: MIT
 *
 *
 * Manage associations between devices and other entities
 *
 */

class Associations {

  /**
   * @param {Object} utils - General utilities passed from main HERETracking
   * @param {function(varArgs: ...string): string} utils.url - Generate the URL for HERE Tracking
   * @param {function(options: Object, required: Array): Promise} utils.validate - Check the supplied parameters
   * @param {function(url: string, options: Object): Object} utils.fetch - Wrap the standard Fetch API
   * (https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) to provide error handling
   * @param {function(trackingId: string): Object} utils.normaliseId - Allow methods to be called using trackingId or
   * externalId/appId object
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
   * Associate a rule with a device
   *
   * @param {string} ruleId - ID of rule
   * @param {string} trackingId - ID of device
   * @param {Object} options - Object containing request options
   * @param {string} options.token - Valid user access token
   * @returns {Object} Body of the transition response
   * @throws {Error} When an HTTP error has occurred
   */
  associateRuleWithDevice(ruleId, trackingId, { token }) {
    return this.validate({ ruleId, trackingId, token }, ['ruleId', 'trackingId', 'token'])
      .then(() => this.fetch(this.url('associations', 'v3', trackingId, 'sensors', ruleId), {
        method: 'put',
        headers: new Headers({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        })
      }));
  }

  /**
   * Remove a rule/device association
   *
   * @param {string} ruleId - ID of rule
   * @param {string} trackingId - ID of device
   * @param {Object} options - Object containing request options
   * @param {string} options.token - Valid user access token
   * @returns {Object} Body of the transition response
   * @throws {Error} When an HTTP error has occurred
   */
  removeRuleFromDevice(ruleId, trackingId, { token }) {
    return this.validate({ ruleId, trackingId, token }, ['ruleId', 'trackingId', 'token'])
      .then(() => this.fetch(this.url('associations', 'v3', trackingId, 'sensors', ruleId), {
        method: 'delete',
        headers: new Headers({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        })
      }));
  }

  /**
   * List the rules associated to this device.
   *
   * @param {string} trackingId - ID of tracker
   * @param {Object} options - Object containing request options
   * @param {string} options.token - Valid user access token
   * @param {number} [options.count] - Number of rules returned per page (default 100)
   * @param {string} [options.pageToken] - Page token used for retrieving next page
   * @returns {Object} Body of the rules response
   * @throws {Error} When an HTTP error has occurred
   */
  listDeviceRules(trackingId, { count, pageToken, token }) {
    return this.validate({ trackingId, token }, ['trackingId', 'token'])
      .then(() => {
        const queryParameters = {};

        if (count) {
          queryParameters.count = count;
        }
        if (pageToken) {
          queryParameters.pageToken = pageToken;
        }

        const url = this.url('associations', 'v3', trackingId, 'sensors', queryParameters);

        return this.fetch(url, {
          credentials: 'include',
          headers: new Headers({
            'Authorization': `Bearer ${token}`
          })
        });
      });
  }

  /**
   * List the rules associated to this device.
   *
   * @param {string} ruleId - ID of the rule we want information about
   * @param {Object} options - Object containing request options
   * @param {number} [options.count] - Number of rules returned per page (default 100)
   * @param {string} [options.pageToken] - Page token used for retrieving next page
   * @param {string} options.token - Valid user access token
   * @returns {Object} Body of the rules response
   * @throws {Error} When an HTTP error has occurred
   */
  listRuleDevices(ruleId, { count, pageToken, token }) {
    return this.validate({ ruleId, token }, ['ruleId', 'token'])
      .then(() => {
        const queryParameters = {};

        if (count) {
          queryParameters.count = count;
        }
        if (pageToken) {
          queryParameters.pageToken = pageToken;
        }

        const url = this.url('associations', 'v3', 'sensors', ruleId, queryParameters);

        return this.fetch(url, {
          credentials: 'include',
          headers: new Headers({
            'Authorization': `Bearer ${token}`
          })
        });
      });
  }

}

module.exports = Associations;
