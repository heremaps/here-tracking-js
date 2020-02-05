/*
 * Copyright (C) 2017-2019 HERE Europe B.V.
 * Licensed under MIT, see full license in LICENSE
 * SPDX-License-Identifier: MIT
 *
 *
 * Provide a trackingId or geofenceId and retrieve associated metadata.
 * Update meta information for your resource.
 *
 * A tracker or geofence often has to be associated with metadata;
 * adding descriptive information about it. This service allows the
 * association of arbitrary JSON object with a trackingId or geofenceId.
 *
 */

class Metadata {

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
    /**
     * Allow methods to be called using trackingId or externalId/appId object
     * @type {function(url: string): Object}
     */
    this.normaliseId = utils.normaliseId;
  }

  /**
   * Gets metadata associated with the trackingId
   *
   * @param {string} idOrObject - can be a trackingId or an externalId/appId object
   * @param {Object} options - Object containing request options
   * @param {string} options.token - Valid user access token
   * @param {string} options.count - Number of results per page (maximum 1000, default 1000).
   * @param {string} options.pageToken - Token to request 'next page' when paging.
   * @returns {Object} Provides all metadata in a JSON object
   * @throws {Error} When an HTTP error has occurred
   */
  get(idOrObject, { token, count, pageToken }) {

    return this.validate({ token, idOrObject }, ['token', 'idOrObject'])
      .then(() => {
        const { trackingId, queryParameters } = this.normaliseId(idOrObject);
        const url = this.url('metadata', 'v2', 'devices', trackingId, queryParameters);

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
   * Updates the metadata object associated with a tracker
   *
   * The provided metadata is merged with the existing metadata object.
   *
   *  * new keys are added
   *. * the value of existing keys will be updated with the provided value
   *. * Adding value 'null' for a key deletes it from the metadata object
   *
   * Returns the updated metadata object.
   *
   * @param {string} idOrObject - can be a trackingId or an externalId/appId object
   * @param {Object} metadata - metadata to add to the tracker
   * @param {Object} options - Object containing request options
   * @param {string} options.token - Valid user access token
   * @returns {Object} The updated metadata object
   * @throws {Error} When an HTTP error has occurred
   */
  update(idOrObject, metadata = {}, { token }) {

    return this.validate({ token, idOrObject }, ['token', 'idOrObject'])
      .then(() => {
        const { trackingId, queryParameters } = this.normaliseId(idOrObject);
        const url = this.url('metadata', 'v2', 'devices', trackingId, queryParameters);

        return this.fetch(url, {
          method: 'put',
          headers: new Headers({
            'Authorization': `Bearer ${token}`
          }),
          body: JSON.stringify(metadata)
        });
      });
  }

  /**
   * Updates a single metadata value
   *
   * Returns the updated metadata object.
   *
   * @param {string} idOrObject - can be a trackingId or an externalId/appId object
   * @param {string} key - The key where this value should be stored
   * @param {string} value - The value to store against the key
   * @param {Object} options - Object containing request options
   * @param {string} options.token - Valid user access token
   * @returns {Object} The updated metadata object
   * @throws {Error} When an HTTP error has occurred
   */
  setValue(idOrObject, key, value, { token }) {

    return this.validate({ token, idOrObject }, ['token', 'idOrObject'])
      .then(() => {
        const { trackingId, queryParameters } = this.normaliseId(idOrObject);
        const url = this.url('metadata', 'v2', 'devices', trackingId, queryParameters);

        return this.fetch(url, {
          method: 'put',
          headers: new Headers({
            'Authorization': `Bearer ${token}`
          }),
          body: JSON.stringify({
            [key]: value
          })
        });
      });
  }

  /**
   * Deletes a single metadata key
   *
   * Returns the updated metadata object.
   *
   * @param {string} idOrObject - can be a trackingId or an externalId/appId object
   * @param {string} key - The key to delete
   * @param {Object} options - Object containing request options
   * @param {string} options.token - Valid user access token
   * @returns {Object} The updated metadata object
   * @throws {Error} When an HTTP error has occurred
   */
  deleteKey(idOrObject, key, { token }) {

    return this.validate({ token, idOrObject }, ['token', 'idOrObject'])
      .then(() => {
        const { trackingId, queryParameters } = this.normaliseId(idOrObject);
        const url = this.url('metadata', 'v2', 'devices', trackingId, queryParameters);

        return this.fetch(url, {
          method: 'put',
          headers: new Headers({
            'Authorization': `Bearer ${token}`
          }),
          body: JSON.stringify({
            [key]: null
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
  deleteAll(idOrObject, { token }) {
    return this.validate({ token, idOrObject }, ['token', 'idOrObject'])
      .then(() => {
        const { trackingId, queryParameters } = this.normaliseId(idOrObject);
        const url = this.url('metadata', 'v2', 'devices', trackingId, queryParameters);

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
   * Gets metadata associated with the geofence
   *
   * @param {string} geofenceId - geofence ID
   * @param {Object} options - Object containing request options
   * @param {string} options.token - Valid user access token
   * @returns {Object} Provides all metadata in a JSON object
   * @throws {Error} When an HTTP error has occurred
   */
  geofenceGet(geofenceId, { token }) {

    return this.validate({ token, geofenceId }, ['token', 'geofenceId'])
      .then(() => {
        const url = this.url('metadata', 'v2', 'geofences', geofenceId);

        return this.fetch(url, {
          method: 'get',
          credentials: 'include',
          headers: new Headers({
            'Authorization': `Bearer ${token}`
          })
        });
      });
  }

  /**
   * Updates the metadata object associated with a geofence
   *
   * The provided metadata is merged with the existing metadata object.
   *
   *  * new keys are added
   *. * the value of existing keys will be updated with the provided value
   *. * Adding value 'null' for a key deletes it from the metadata object
   *
   * Returns the updated metadata object.
   *
   * @param {string} geofenceId - geofence ID
   * @param {Object} metadata - metadata to add to the tracker
   * @param {Object} options - Object containing request options
   * @param {string} options.token - Valid user access token
   * @returns {Object} The updated metadata object
   * @throws {Error} When an HTTP error has occurred
   */
  geofenceUpdate(geofenceId, metadata = {}, { token }) {

    return this.validate({ token, geofenceId }, ['token', 'geofenceId'])
      .then(() => {
        const url = this.url('metadata', 'v2', 'geofences', geofenceId);

        return this.fetch(url, {
          method: 'put',
          headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }),
          body: JSON.stringify(metadata)
        });
      });
  }

  /**
   * Updates a single metadata value
   *
   * Returns the updated metadata object.
   *
   * @param {string} geofenceId - geofence ID
   * @param {string} key - The key where this value should be stored
   * @param {string} value - The value to store against the key
   * @param {Object} options - Object containing request options
   * @param {string} options.token - Valid user access token
   * @returns {Object} The updated metadata object
   * @throws {Error} When an HTTP error has occurred
   */
  geofenceSetValue(geofenceId, key, value, { token }) {

    return this.validate({ token, geofenceId }, ['token', 'geofenceId'])
      .then(() => {
        const url = this.url('metadata', 'v2', 'geofences', geofenceId);

        return this.fetch(url, {
          method: 'put',
          headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }),
          body: JSON.stringify({
            [key]: value
          })
        });
      });
  }

  /**
   * Deletes a single metadata key
   *
   * Returns the updated metadata object.
   *
   * @param {string} geofenceId - geofence ID
   * @param {string} key - The key to delete
   * @param {Object} options - Object containing request options
   * @param {string} options.token - Valid user access token
   * @returns {Object} The updated metadata object
   * @throws {Error} When an HTTP error has occurred
   */
  geofenceDeleteKey(geofenceId, key, { token }) {

    return this.validate({ token, geofenceId }, ['token', 'geofenceId'])
      .then(() => {
        const url = this.url('metadata', 'v2', 'geofences', geofenceId);

        return this.fetch(url, {
          method: 'put',
          headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }),
          body: JSON.stringify({
            [key]: null
          })
        });
      });
  }

  /**
   * Deletes all aliases of this device.
   *
   * @param {string} geofenceId - geofence ID
   * @param {Object} options - Object containing request options
   * @param {string} options.token - Valid user access token
   * @returns {Object} Provides all aliases in a JSON object
   * @throws {Error} When an HTTP error has occurred
   */
  geofenceDeleteAll(geofenceId, { token }) {
    return this.validate({ token, geofenceId }, ['token', 'geofenceId'])
      .then(() => {
        const url = this.url('metadata', 'v2', 'geofences', geofenceId);

        return this.fetch(url, {
          method: 'delete',
          headers: new Headers({
            'x-confirm': 'true',
            'Authorization': `Bearer ${token}`
          })
        });
      });
  }

}

module.exports = Metadata;
