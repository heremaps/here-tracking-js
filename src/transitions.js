/*
 * Copyright (C) 2017-2019 HERE Europe B.V.
 * Licensed under MIT, see full license in LICENSE
 * SPDX-License-Identifier: MIT
 *
 *
 * Access to device geofence transitions
 *
 * For more information, see:
 * https://developer.here.com/documentation/tracking/topics/traces.html
 */
class Transitions {

  /**
   * @param {Object} utils - general utilities passed from main HERETracking
   * @param {function(varArgs: ...string): string} utils.url - Generate the URL for HERE Tracking
   * @param {function(options: Object, required: Array): Promise} utils.validate - Check the supplied parameters
   * @param {function(url: string, options: Object): Object} utils.fetch - Wrap the standard Fetch API
   * (https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) to provide error handling
   */
  constructor(utils) {
    /**
     * Generate the URL for HERE Tracking
     * @type {function(varArgs: ...string): string}
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
   * Get the specified number of recent transitions.
   *
   * @param {string} trackingId - Tracking ID of the device
   * @param {number} last - retrieve the last N transitions
   * @param {Object} options - Object containing request options
   * @param {string} options.token - Valid user access token
   * @param {string} options.count - Number of results per page (maximum 1000, default 1000).
   * @param {string} options.pageToken - Token to request 'next page' when paging.
   * @returns {Array} History of traces of the device
   * @throws {Error} When an HTTP error has occurred
   */
  getLastN(trackingId, last, options) {
    return this.get(trackingId, { last }, options);
  }

  /**
   * Get the transitions of the specified device before the given timestamp.
   *
   * @param {string} trackingId - Tracking ID of the device
   * @param {number} before - retrieve the transitions before this timestamp
   * @param {Object} options - Object containing request options
   * @param {string} options.token - Valid user access token
   * @param {string} options.count - Number of results per page (maximum 1000, default 1000).
   * @param {string} options.pageToken - Token to request 'next page' when paging.
   * @returns {Array} History of traces of the device
   * @throws {Error} When an HTTP error has occurred
   */
  getBefore(trackingId, before, options) {
    return this.get(trackingId, { before }, options);
  }

  /**
   * Get the transitions of the specified device after the given timestamp.
   *
   * @param {string} trackingId - Tracking ID of the device
   * @param {number} after - retrieve the transitions after this timestamp
   * @param {Object} options - Object containing request options
   * @param {string} options.token - Valid user access token
   * @param {string} options.count - Number of results per page (maximum 1000, default 1000).
   * @param {string} options.pageToken - Token to request 'next page' when paging.
   * @returns {Array} History of traces of the device
   * @throws {Error} When an HTTP error has occurred
   */
  getAfter(trackingId, after, options) {
    return this.get(trackingId, { after }, options);
  }

  /**
   * Get the transitions of the specified device between two timestamps.
   *
   * @param {string} trackingId - Tracking ID of the device
   * @param {number} before - retrieve the transitions before this timestamp
   * @param {number} after - retrieve the transitions after this timestamp
   * @param {Object} options - Object containing request options
   * @param {string} options.token - Valid user access token
   * @param {string} options.count - Number of results per page (maximum 1000, default 1000).
   * @param {string} options.pageToken - Token to request 'next page' when paging.
   * @returns {Array} History of traces of the device
   * @throws {Error} When an HTTP error has occurred
   */
  getBetween(trackingId, before, after, options) {
    return this.get(trackingId, { before, after }, options);
  }

  /**
   * Get the transitions of the specified device
   *
   * @param {string} trackingId - Tracking ID of the device
   * @param {Object} traceOptions - Object containing time range and filter options
   * @param {number} [options.last] - retrieve the last N transitions
   * @param {number} [options.before] - retrieve the transitions before this timestamp
   * @param {number} [options.after] - retrieve the transitions after this timestamp
   * @param {Object} options - Object containing request options
   * @param {string} options.token - Valid user access token
   * @param {string} options.count - Number of results per page. (maximum 1000, default 1000).
   * @param {string} options.pageToken - Token to request 'next page' when paging.
   * @returns {Array} History of transitions of the device
   * @throws {Error} When an HTTP error has occurred
   */
  get(trackingId, { last, before, after }, { token, count, pageToken }) {
    return this.validate({ token, trackingId }, ['token', 'trackingId'])
      .then(() => {
        const queryParameters = {};

        if (last) { queryParameters.last = last; }
        if (before) { queryParameters.before = before; }
        if (after) { queryParameters.after = after; }
        if (count) { queryParameters.count = count; }
        if (pageToken) { queryParameters.pageToken = pageToken; }

        return this.fetch(this.url('transitions', 'v2', 'devices', trackingId, queryParameters), {
          method: 'get',
          credentials: 'include',
          headers: new Headers({
            'Authorization': `Bearer ${token}`
          })
        });
      });
  }
}

module.exports = Transitions;
