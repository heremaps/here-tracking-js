/*
 * Copyright (C) 2017-2019 HERE Europe B.V.
 * Licensed under MIT, see full license in LICENSE
 * SPDX-License-Identifier: MIT
 *
 *
 * Provide a trackingId and retrieve aliases associated with it.
 * Be able to search within aliases for associated trackers.
 *
 * A tracker often has to be associated with an external system in a way that is
 * neither part of the reported state of the device or the desired state – attaching
 * a tracker to a particular engine part or palette; assigning a human-readable name;
 * synchronizing with an external asset management system. This service allows the
 * association of arbitrary type-externalId pairs with a trackingId as well as the ability to
 * search across those type-externalId pairs to find the containing trackingIds. External Id
 * and type pair must be unique within an account.
 *
 */

class Aliases {

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
    /**
     * Allow methods to be called using trackingId or externalId/appId object
     * @type {function(trackingId: string): Object}
     */
    this.normaliseId = utils.normaliseId;
  }

  /**
   * Gets all aliases of this device.
   *
   * The identifier can be a trackingId or an object with externalId and appId
   *
   * Example:
   *
   *.   "HERE-1234-1234-1234"
   *
   * or:
   *
   *.   {
   *.     "externalId": '123-abc',
   *.     "appId": "a1b2c3"
   *.   }
   *
   * @param {string} idOrObject - can be a trackingId or an externalId/appId object
   * @param {Object} options - Object containing request options
   * @param {string} options.token - Valid user access token
   * @param {number} options.count - Number of results per page (maximum 1000, default 1000).
   * @param {string} options.pageToken - Token to request 'next page' when paging.
   * @param {string} options.type - Type of an externalId (alias).
   * @returns {Object} Provides all aliases in a JSON object
   * @throws {Error} When an HTTP error has occurred
   */
  get(idOrObject, { token, count, pageToken, type }) {
    return this.validate({ token, idOrObject }, ['token', 'idOrObject'])
      .then(() => {
        const { trackingId, queryParameters } = this.normaliseId(idOrObject);

        if (count) { queryParameters.count = count; }
        if (pageToken) { queryParameters.pageToken = pageToken; }
        if (type) { queryParameters.type = type; }

        const url = this.url('aliases', 'v2', trackingId, queryParameters);

        return this.fetch(url, {
          credentials: 'include',
          headers: new Headers({
            'Authorization': `Bearer ${token}`
          })
        });
      });
  }

  /**
   * Deletes all aliases of this device.
   *
   * @param {string} idOrObject - can be a trackingId or an externalId/appId object
   * @param {Object} options - Object containing request options
   * @param {string} options.token - Valid user access token
   * @returns {Object} Provides all aliases in a JSON object
   * @throws {Error} When an HTTP error has occurred
   */
  delete(idOrObject, { token }) {
    return this.validate({ token, idOrObject }, ['token', 'idOrObject'])
      .then(() => {
        const { trackingId, queryParameters } = this.normaliseId(idOrObject);
        const url = this.url('aliases', 'v2', trackingId, queryParameters);

        return this.fetch(url, {
          method: 'delete',
          headers: new Headers({
            'x-confirm': 'true',
            'Authorization': `Bearer ${token}`
          })
        });
      });
  }

  /**
   * Gets all aliases of all devices.
   *
   * @param {Object} options - Object containing request options
   * @param {string} options.type - Type of an externalId (alias)
   * @param {string} options.pageToken - Token to request 'next page' when paging
   * @param {string} options.token - Valid user access token
   * @param {number} options.count - The number of items to return per page (maximum 100, default 100)
   * @param {number} options.after - Milliseconds elapsed since 1 January 1970 00:00:00 UTC
   * The accepted range is from 0 to the current time
   * @returns {Object} Provides all aliases in a JSON object
   * @throws {Error} When an HTTP error has occurred
   */
  getAll({ type, pageToken, count, after, token }) {
    return this.validate({ token }, ['token'])
      .then(() => {
        const queryParameters = {};

        if (type) queryParameters.type = type;
        if (pageToken) queryParameters.pageToken = pageToken;
        if (count) queryParameters.count = count;
        if (after) queryParameters.after = after;

        const url = this.url('aliases', 'v2', queryParameters);

        return this.fetch(url, {
          credentials: 'include',
          headers: new Headers({
            'Authorization': `Bearer ${token}`
          })
        });
      });
  }

  /**
   * Gets all aliases of a particular type for this device.
   *
   * @param {string} idOrObject - can be a trackingId or an externalId/appId object
   * @param {string} type - type of alias to retrieve
   * @param {Object} options - Object containing request options
   * @param {string} options.token - Valid user access token
   * @param {number} options.count - Number of results per page (maximum 1000, default 1000).
   * @param {string} options.pageToken - Token to request 'next page' when paging.
   * @returns {Object} Provides all aliases in a JSON object
   * @throws {Error} When an HTTP error has occurred
   */
  getByType(idOrObject, type, { token, count, pageToken }) {
    return this.validate({ token, idOrObject, type }, ['token', 'idOrObject', 'type'])
      .then(() => {
        const { trackingId, queryParameters } = this.normaliseId(idOrObject);

        if (count) { queryParameters.count = count; }
        if (pageToken) { queryParameters.pageToken = pageToken; }

        const url = this.url('aliases', 'v2', trackingId, type, queryParameters);

        return this.fetch(url, {
          credentials: 'include',
          headers: new Headers({
            'Authorization': `Bearer ${token}`
          })
        });
      });
  }

  /**
   * Deletes all aliases of a type
   *
   * @param {string} idOrObject - can be a trackingId or an externalId/appId object
   * @param {string} type - type of aliases to delete
   * @param {Object} options - Object containing request options
   * @param {string} options.token - Valid user access token
   * @returns {Object} Empty response
   * @throws {Error} When an HTTP error has occurred
   */
  deleteByType(idOrObject, type, { token }) {
    return this.validate({ token, idOrObject, type }, ['token', 'idOrObject', 'type'])
      .then(() => {
        const { trackingId } = this.normaliseId(idOrObject);

        const url = this.url('aliases', 'v2', trackingId, type);

        return this.fetch(url, {
          method: 'delete',
          credentials: 'include',
          headers: new Headers({
            'x-confirm': 'true',
            'Authorization': `Bearer ${token}`
          })
        });
      });
  }

  /**
   * Gets the HERE trackingId of a device given its externalId and externalId type
   *
   * @param {string} type - type of alias
   * @param {string} externalId - external ID to look up
   * @param {Object} options - Object containing request options
   * @param {string} options.token - Valid user access token
   * @returns {Object} A JSON object containing the trackingId
   * @throws {Error} When an HTTP error has occurred
   */
  getTrackingId(type, externalId, { token }) {
    return this.validate({ type, externalId }, ['token', 'type', 'externalId'])
      .then(() => {
        const queryParameters = {
          type, externalId
        };

        const url = this.url('aliases', 'v2', 'trackingId', queryParameters);

        return this.fetch(url, {
          credentials: 'include',
          headers: new Headers({
            'Authorization': `Bearer ${token}`
          })
        });
      });
  }

  /**
   * Adds an alias for the trackingId. Must be unique within account.
   *
   * @param {string} idOrObject - can be a trackingId or an externalId/appId object
   * @param {string} type - type of alias
   * @param {string} externalId - external ID to add
   * @param {Object} options - Object containing request options
   * @param {string} options.token - Valid user access token
   * @returns {Object} Empty response
   * @throws {Error} When an HTTP error has occurred
   */
  add(idOrObject, type, externalId, { token }) {
    return this.validate({ idOrObject, type, externalId }, ['idOrObject', 'token', 'type', 'externalId'])
      .then(() => {
        const { trackingId, queryParameters } = this.normaliseId(idOrObject);
        const url = this.url('aliases', 'v2', trackingId, type, externalId, queryParameters);

        return this.fetch(url, {
          method: 'put',
          credentials: 'include',
          headers: new Headers({
            'Authorization': `Bearer ${token}`
          })
        });
      });
  }

  /**
   * Deletes a specific alias for the trackingId.
   *
   * @param {string} idOrObject - can be a trackingId or an externalId/appId object
   * @param {string} type - type of alias
   * @param {string} externalId - external ID to add
   * @param {Object} options - Object containing request options
   * @param {string} options.token - Valid user access token
   * @returns {Object} Empty response
   * @throws {Error} When an HTTP error has occurred
   */
  deleteOne(idOrObject, type, externalId, { token }) {
    return this.validate({ idOrObject, type, externalId }, ['idOrObject', 'token', 'type', 'externalId'])
      .then(() => {
        const { trackingId, queryParameters } = this.normaliseId(idOrObject);
        const url = this.url('aliases', 'v2', trackingId, type, externalId, queryParameters);

        return this.fetch(url, {
          method: 'delete',
          credentials: 'include',
          headers: new Headers({
            'Authorization': `Bearer ${token}`
          })
        });
      });
  }

}

module.exports = Aliases;
