/*
 * Copyright (C) 2017-2019 HERE Europe B.V.
 * Licensed under MIT, see full license in LICENSE
 * SPDX-License-Identifier: MIT
 *
 *
 * Defining and manage sensor rules
 *
 */

class Rules {

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
    /**
     * Sensor types
     */
    this.SENSOR_TYPES = ['acceleration', 'attach', 'battery', 'humidity', 'pressure', 'tamper', 'temperature'];
  }

  /**
   * List the rules available to the user.
   *
   * @param {Object} options - Object containing request options
   * @param {string} options.token - Valid user access token
   * @param {number} [options.count] - Number of rules returned per page (default 100)
   * @param {string} [options.pageToken] - Page token used for retrieving next page
   * @returns {Object} Body of the rules response
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

        const url = this.url('sensors', 'v3', queryParameters);

        return this.fetch(url, {
          credentials: 'include',
          headers: new Headers({
            'Authorization': `Bearer ${token}`
          })
        });
      });
  }

  /**
   * Retrieve details about a rule.
   *
   * @param {string} ruleId - ID of sensor rule to retrieve
   * @param {Object} options - Object containing request options
   * @param {string} options.token - Valid user access token
   * @returns {Object} Body of the sensor rule response
   * @throws {Error} When an HTTP error has occurred
   */
  get(ruleId, { token }) {
    return this.validate({ token, ruleId }, ['token', 'ruleId'])
      .then(() => {
        const url = this.url('sensors', 'v3', ruleId);

        return this.fetch(url, {
          credentials: 'include',
          headers: new Headers({
            'Authorization': `Bearer ${token}`
          })
        });
      });
  }

  /**
   * Create rule
   *
   * @param {string} type - type of sensor
   * @param {Object} ruleOptions - Object containing rule details
   * @param {string} [ruleOptions.name] - human-readable name of rule
   * @param {string} [ruleOptions.description] - human-readable description of rule
   * @param {Object} [ruleOptions.threshold] - threshold
   * @param {number} [ruleOptions.threshold.value] - threshold value
   * @param {Object} [ruleOptions.range] - Object containing range details
   * @param {number} [ruleOptions.range.begin] - minimum value in range
   * @param {number} [ruleOptions.range.end] - maximum value in range
   * @param {Object} options - Object containing request options
   * @param {string} options.token - Valid user access token
   * @returns {Object}
   * @throws {Error} When an HTTP error has occurred
   */
  create(type, { name, description, range, threshold }, { token }) {
    return this.validate({
      type,
      token
    }, ['type', 'token'])
      .then(() => {
        if (!this.SENSOR_TYPES.includes(type)) {
          return Promise.reject(new Error(`Sensor rules must be one of: ${this.SENSOR_TYPES.join(', ')}`));
        }

        const body = {
          type
        };

        if (name) body.name = name;
        if (description) body.description = description;
        if (threshold &&
          typeof threshold.value !== 'undefined') body.threshold = threshold;
        if (range &&
          typeof range.begin !== 'undefined' &&
          typeof range.end !== 'undefined') body.range = range;

        return this.fetch(this.url('sensors', 'v3'), {
          method: 'post',
          headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }),
          body: JSON.stringify(body)
        });
      });
  }

  /**
   * Create a new attach-type sensor rule
   *
   * @param {Object} rule - Object containing rule definition
   * @param {string} rule.name - Valid user access token
   * @param {string} rule.description - Valid user access token
   * @param {Object} options - Object containing request options
   * @param {string} options.token - Valid user access token
   * @returns {Object} ID of the rule
   * @throws {Error} When an HTTP error has occurred
   */
  createAttach({ name = '', description = '' }, { token }) {
    return this.validate({ token }, ['token'])
      .then(() => {
        return this.fetch(this.url('sensors', 'v3'), {
          method: 'post',
          headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }),
          body: JSON.stringify({
            name,
            description,
            type: 'attach'
          })
        });
      });
  }

  /**
   * Create a tamper-type sensor rule
   *
   * @param {Object} rule - Object containing rule definition
   * @param {string} rule.name - Valid user access token
   * @param {string} rule.description - Valid user access token
   * @param {Object} options - Object containing request options
   * @param {string} options.token - Valid user access token
   * @returns {Object} ID of the rule
   * @throws {Error} When an HTTP error has occurred
   */
  createTamper({ name = '', description = '' }, { token }) {
    return this.validate({ token }, ['token'])
      .then(() => {
        return this.fetch(this.url('sensors', 'v3'), {
          method: 'post',
          headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }),
          body: JSON.stringify({
            name,
            description,
            type: 'tamper'
          })
        });
      });
  }

  /**
   * Update an existing sensor rule
   *
   * @param {string} id - rule id
   * @param {Object} ruleOptions - Object containing rule details
   * @param {string} [ruleOptions.name] - human-readable name of rule
   * @param {string} [ruleOptions.description] - human-readable description of rule
   * @param {Object} [ruleOptions.range] - Object containing range details
   * @param {number} [ruleOptions.range.begin] - minimum value in range
   * @param {number} [ruleOptions.range.end] - maximum value in range
   * @param {Object} [ruleOptions.threshold] - threshold
   * @param {number} [ruleOptions.threshold.value] - threshold value
   * @param {Object} options - Object containing request options
   * @param {string} options.token - Valid user access token
   * @returns {Object} Body of the geofence response
   * @throws {Error} When an HTTP error has occurred
   */
  update(id, { type, name, description, range, threshold}, { token }) {
    return this.validate({
      id,
      token
    }, ['id', 'token'])
      .then(() => {
        const url = this.url('sensors', 'v3', id);

        const body = {
          type // TODO: this should be ignored in the backend
        };

        if (name) body.name = name;
        if (description) body.description = description;
        if (threshold &&
          typeof threshold.value !== 'undefined') body.threshold = threshold;
        if (range &&
          typeof range.begin !== 'undefined' &&
          typeof range.end !== 'undefined') body.range = range;

        return this.fetch(url, {
          method: 'put',
          headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }),
          body: JSON.stringify(body)
        });
      });
  }

  /**
   * Remove rule
   *
   * @param {Object} ruleId - ID of the rule
   * @param {Object} options - Object containing request options
   * @param {string} options.token - Valid user access token
   * @returns {Object}
   * @throws {Error} When an HTTP error has occurred
   */
  remove(ruleId, { token }) {
    return this.validate({ ruleId, token }, ['token', 'ruleId'])
      .then(() => this.fetch(this.url('sensors', 'v3', ruleId), {
        method: 'delete',
        headers: new Headers({
          'Authorization': `Bearer ${token}`
        })
      }));
  }

  /**
   * Remove all rules.
   * This is a separate method so that it can't be called by accidentally
   * forgetting to pass rule ID
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
          return Promise.reject(new Error('Confirmation required to delete all rules.'));
        }

        const url = this.url('sensors', 'v3');

        return this.fetch(url, {
          method: 'delete',
          headers: new Headers({
            'Authorization': `Bearer ${token}`,
            'x-confirm': really
          })
        });
      });
  }

}

module.exports = Rules;
