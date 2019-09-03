/*
 * Copyright (C) 2017-2019 HERE Europe B.V.
 * Licensed under MIT, see full license in LICENSE
 * SPDX-License-Identifier: MIT
 *
 *
 * Log in users, refresh access tokens and list available devices
 *
 */
class Users {

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
   * Get the list of devices for a user
   *
   * @param {Object} options - Object containing request options
   * @param {string} options.token - Valid user access token
   * @returns {Object} Array of device IDs
   * @throws {Error} When an HTTP error has occurred
   */
  listDevices({ count, pageToken, token }) {
    return this.validate({ token }, ['token'])
      .then(() => {
        const queryParameters = {};

        if (count) {
          queryParameters.count = count;
        }
        if (pageToken) {
          queryParameters.pageToken = pageToken;
        }

        return this.fetch(this.url('users', 'v2', 'devices', queryParameters), {
          method: 'get',
          headers: new Headers({
            'Authorization': `Bearer ${token}`
          })
        });
      });
  }

  /**
   * Log in user
   *
   * @param {string} email - User's email address
   * @param {string} password - User's password
   * @returns {Object} Log in response
   * @throws {Error} When an HTTP error has occurred
   */
  login(email, password) {
    return this.validate({ email, password }, ['email', 'password'])
      .then(() => {
        const url = this.url('users', 'v2', 'login');

        return this.fetch(url, {
          method: 'post',
          headers: new Headers({
            'Content-Type': 'application/json'
          }),
          body: JSON.stringify({ email, password })
        });
      });
  }

  /**
   * Refresh user access token
   *
   * @param {string} accessToken - Expired access token
   * @param {string} refreshToken - Token received during login
   * @returns {Object} Log in response
   * @throws {Error} When an HTTP error has occurred
   */
  refresh(accessToken, refreshToken) {
    return this.validate({ accessToken, refreshToken }, ['accessToken', 'refreshToken'])
      .then(() => {
        const url = this.url('users', 'v2', 'refresh');

        return this.fetch(url, {
          method: 'post',
          body: JSON.stringify({ accessToken, refreshToken })
        });
      });
  }

  /**
   * Retrieves application license information
   * /registry/v2/licenses
   *
   * @param {Object} options - Object containing request options
   * @param {string} options.token - Valid user access token
   * @returns {Array} An array contains all applications license information of the user
   * @throws {Error} When an HTTP error has occurred
   */
  getLicenseInfo({ token }) {
    return this.validate({ token }, ['token'])
      .then(() => this.fetch(this.url('registry', 'v2', 'licenses'),
        {
          method: 'get',
          headers: new Headers({
            'Authorization': `Bearer ${token}`
          })
        }))
      .then(json => json.licenses);
  }
}

module.exports = Users;
