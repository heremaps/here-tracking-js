/*
 * Copyright (C) 2017-2019 HERE Europe B.V.
 * Licensed under MIT, see full license in LICENSE
 * SPDX-License-Identifier: MIT
 *
 *
 * Access to device traces
 *
 * For more information, see:
 * https://developer.here.com/documentation/tracking/topics/traces.html
 *
 */
class Traces {

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
   * Get the specified number of recent trace samples.
   *
   * Always returns the filtered trace.
   *
   * @example
   * const last5 = hereTracking.traces.getLastN('HERE-123...', 5, { token: 'h1.123...' })
   *
   * @param {string} trackingId - Tracking ID of the device
   * @param {number} last - retrieve the last N samples
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
   * Get the trace of the specified device before the given timestamp.
   *
   * Always returns the filtered trace.
   *
   * @example
   * hereTracking.traces.getBefore('HERE-123...', Date.now() - 300000, { token: 'h1.123...' })
   *
   * @param {string} trackingId - Tracking ID of the device
   * @param {number} before - retrieve the samples before this millisecond timestamp
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
   * Get the trace of the specified device after the given timestamp.
   *
   * Always returns the filtered trace.
   *
   * @example
   * hereTracking.traces.getAfter('HERE-123...', Date.now() - 300000, { token: 'h1.123...' })
   *
   * @param {string} trackingId - Tracking ID of the device
   * @param {number} after - retrieve the samples after this millisecond timestamp
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
   * Get the trace of the specified device between two timestamps.
   *
   * Always returns the filtered trace.
   *
   * @example
   * hereTracking.traces.getBetween('HERE-123...', Date.now() - 300000, Date.now() - 600000, { token: 'h1.123...' })
   *
   * @param {string} trackingId - Tracking ID of the device
   * @param {number} before - retrieve the samples before this timestamp
   * @param {number} after - retrieve the samples after this timestamp
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
   * Get the trace of the specified device
   *
   * @example
   * const trace = hereTracking.traces.get('HERE-123...', {}, { token: 'h1.123...' })
   *
   * @example
   * const traceFirstPage = hereTracking.traces.get('HERE-123...', {}, { token: 'h1.123...' })
   *
   * @example
   * hereTracking.traces.get('HERE-123...', {}, { token: 'h1.123...', pageToken: tokenFromPreviousRequest })
   *
   * @param {string} trackingId - Tracking ID of the device
   * @param {Object} traceOptions - time range and filter options
   * @param {number} [options.last] - Retrieve the last N samples
   * @param {number} [options.before] - Retrieve the samples before this timestamp
   * @param {number} [options.after] - Retrieve the samples after this timestamp
   * @param {Object} options - Object containing request options
   * @param {string} options.token - Valid user access token
   * @param {string} options.count - Number of results per page (maximum 1000, default 1000).
   * @param {string} options.pageToken - Token to request 'next page' when paging.
   * @returns {Array} History of traces of the device
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

        return this.fetch(this.url('traces', 'v2', trackingId, queryParameters), {
          method: 'get',
          credentials: 'include',
          headers: new Headers({
            'Authorization': `Bearer ${token}`
          })
        });
      });
  }

  /**
   * Remove the trace of the specified device
   *
   * @example
   * const deleted = hereTracking.traces.remove('HERE-123...', { token: 'h1.123...' })
   *
   * @param {string} trackingId - Tracking ID of the device
   * @param {Object} options - Object containing request options
   * @param {string} options.token - Valid user access token
   * @throws {Error} When an HTTP error has occurred
   */
  remove(trackingId, { token }) {
    return this.validate({ token, trackingId }, ['token', 'trackingId'])
      .then(() => this.fetch(this.url('traces', 'v2', trackingId), {
        method: 'delete',
        headers: new Headers({
          'Authorization': `Bearer ${token}`
        })
      }));
  }
}

module.exports = Traces;
