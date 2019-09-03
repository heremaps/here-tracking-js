/*
 * Copyright (C) 2017-2019 HERE Europe B.V.
 * Licensed under MIT, see full license in LICENSE
 * SPDX-License-Identifier: MIT
 *
 *
 * Access to device shadows
 *
 * For more information, see:
 * https://developer.here.com/documentation/tracking/topics/shadows.html
 *
 */
class Shadows {

  /**
   * @param {Object} utils - general utilities passed from main HERETracking
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
    /**
     * Allow methods to be called using trackingId or externalId/appId object
     * @type {function(trackingId: string): Object}
     */
    this.normaliseId = utils.normaliseId;
  }

  /**
   * Get the shadow of the specified device
   *
   * @param {string} idOrObject - Can be a trackingId or an externalId/appId object
   * @param {Object} options - Object containing request options
   * @param {string} options.token - Valid user access token
   * @returns {Object} Newly modified device shadow
   * @throws {Error} When an HTTP error has occurred
   */
  get(idOrObject, { token }) {
    return this.validate({ token, idOrObject }, ['token', 'idOrObject'])
      .then(() => {
        const { trackingId, queryParameters } = this.normaliseId(idOrObject);

        return this.fetch(this.url('shadows', 'v2', trackingId, queryParameters), {
          credentials: 'include',
          headers: new Headers({
            'Authorization': `Bearer ${token}`
          })
        });
      });
  }

  /**
   * Get the shadow of the specified devices.
   *
   * By providing the `after` timestamp parameter the request will return those
   * shadow objects that were modified at or after the timestamp.
   *
   * By providing the `appId` parameter, the `trackingIds` is expected to be an
   * array of application specific external identifiers.
   *
   * @param {string} trackingIds - IDs of the devices
   * @param {Object} options - Object containing request options
   * @param {string} options.token - Valid user access token
   * @param {number} [options.after] - Milliseconds elapsed since 1 January 1970 00:00:00 UTC
   * @param {string} [options.appId] - Application identifier
   * @returns {Array} Array of shadow response objects
   * @throws {Error} When an HTTP error has occurred
   */
  getBatch(trackingIds, { token, after, appId }) {
    return this.validate({ trackingIds, token }, ['trackingIds', 'token'])
      .then(() => {
        if (!(trackingIds instanceof Array)) {
          return Promise.reject('You must supply an array');
        }
        if (trackingIds.length > 100) {
          return Promise.reject('Maximum batch size is 100');
        }

        const queryParameters = {};

        if (after) queryParameters.after = after;
        if (appId) queryParameters.appId = appId;

        let url = this.url('shadows', 'v2', 'batch', queryParameters);

        return this.fetch(url, {
          method: 'post',
          credentials: 'include',
          headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }),
          body: JSON.stringify(trackingIds)
        });
      });
  }

  /**
   * Get desired shadow of the specified device or value of a single property
   * in the shadow if `selector` is provided.
   *
   * To pick a property from the shadow provide property's name as `selector`,
   * a nested property can be selected using slash as delimiter, like this: `payload/time/minutes`
   *
   * @param {string} idOrObject - Can be a trackingId or an externalId/appId object
   * @param {Object} options - Object containing request options
   * @param {string} options.token - Valid user access token
   * @param {string} [options.selector] - JSON selector
   * @returns {Object} Shadow of the queried object
   * @throws {Error} When an HTTP error has occurred
   */
  getDesired(idOrObject, options) {
    return this.getByState(idOrObject, 'desired', options);
  }

  /**
   * @ignore
   */
  getByState(idOrObject, state, { token, selector }) {
    return this.validate({ idOrObject, token }, ['idOrObject', 'token'])
      .then(() => {
        const { trackingId, queryParameters } = this.normaliseId(idOrObject);
        const url = selector ?
          this.url('shadows', 'v2', trackingId, state, selector, queryParameters) :
          this.url('shadows', 'v2', trackingId, state, queryParameters);

        return this.fetch(url, {
          credentials: 'include',
          headers: new Headers({
            'Authorization': `Bearer ${token}`
          })
        });
      });
  }

  /**
   * Get reported shadow of the specified device or value of a single property
   * in the shadow if `selector` is provided.
   *
   * To pick a property from the shadow provide property's name as `selector`,
   * a nested property can be selected using slash as delimiter, like this: `payload/time/minutes`
   *
   * @param {string} idOrObject - Can be a trackingId or an externalId/appId object
   * @param {Object} options - Object containing request options
   * @param {string} options.token - Valid user access token
   * @param {string} [options.selector] - JSON selector
   * @returns {Object} Shadow of the queried object
   * @throws {Error} When an HTTP error has occurred
   */
  getReported(idOrObject, options) {
    return this.getByState(idOrObject, 'reported', options);
  }

  /**
   * Set the desired state of the specified device
   *
   * @param {string} idOrObject - Can be a trackingId or an externalId/appId object
   * @param {Object} desired - Object containing desired object configuration
   * @param {Object} [desired.payload] - payload object
   * @param {Object} [desired.system] - system object
   * @param {Object} options - Object containing request options
   * @param {string} options.token - Valid user access token
   * @returns {Object} Shadow of the queried object
   * @throws {Error} When an HTTP error has occurred
   */
  setDesired(idOrObject, desired, options) {
    const { token } = options;
    const shadow = {
      desired: {
        payload: desired.payload,
        system: desired.system
      }
    };

    return this.validate({ idOrObject, shadow, token }, ['idOrObject', 'shadow', 'token'])
      .then(() => {
        const { trackingId, queryParameters } = this.normaliseId(idOrObject);

        return this.fetch(this.url('shadows', 'v2', trackingId, queryParameters), {
          method: 'put',
          credentials: 'include',
          headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }),
          body: JSON.stringify(shadow)
        });
      });
  }

  /**
   * Remove all data from the shadow of the specified device
   * but don't remove the shadow object itself
   *
   * @param {string} idOrObject - Can be a trackingId or an externalId/appId object
   * @param {Object} options - Object containing request options
   * @param {string} options.token - Valid user access token
   * @returns {Object} Empty response
   * @throws {Error} When an HTTP error has occurred
   */
  clear(idOrObject, { token }) {
    return this.validate({ idOrObject, token }, ['idOrObject', 'token'])
      .then(() => {
        const { trackingId, queryParameters } = this.normaliseId(idOrObject);

        return this.fetch(this.url('shadows', 'v2', trackingId, queryParameters), {
          method: 'delete',
          credentials: 'include',
          headers: new Headers({
            'Authorization': `Bearer ${token}`
          })
        });
      });
  }
}

module.exports = Shadows;
