/*
 * Copyright (C) 2017-2019 HERE Europe B.V.
 * Licensed under MIT, see full license in LICENSE
 * SPDX-License-Identifier: MIT
 *
 *
 * Provision new devices.
 *
 * Create new requests for a specified number of devices, manage requests,
 * retrieve freshly minted device licences.
 *
 * For more information, see:
 * https://developer.here.com/documentation/tracking/topics/vendor.html
 */
class Vendor {

  /**
   * @param {Object} utils - general utilities passed from main HERETracking
   * @param {function(varArgs: ...string): string} utils.url - Generate the URL for HERE Tracking
   * @param {function(options: Object, required: Array): Promise} utils.validate - Check the supplied parameters
   * @param {function(url: string, options: Object): Object} utils.fetch - Wrap the standard Fetch API
   * (https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) to provide error handling
   * @param {function(deviceId: string, options: Object): Object} claimDevice - Reference to the device
   * claiming method of the Devices class
   */
  constructor(utils, claimDevice) {
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
     * Reference to the device claiming method of the Devices class
     * @type {function(deviceId: string, options: Object): Object}
     */
    this.claimDevice = claimDevice;
  }

  /**
   * Create a new request for device licences.
   * /registry/v2/{app_ID}/devices
   *
   * @param {string} vendorId - Valid appId enabled for HERE Tracking
   * @param {string} count - Number of licences to create
   * @param {Object} options - Object containing request options
   * @param {string} options.token - Valid user access token
   * @returns {string} Request ID
   * @throws {Error} When an HTTP error has occurred
   */
  requestBatch(vendorId, count, { token }) {
    return this.validate({ vendorId, count, token }, ['vendorId', 'count', 'token'])
      .then(() => this.fetch(this.url('registry', 'v2', vendorId, 'devices'),
        {
          method: 'post',
          headers: new Headers({
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }),
          body: JSON.stringify({
            count
          })
        })
        .then(json => json.jobId)
      );
  }

  /**
   * Create a new request for device licences given an external ID
   * /registry/v2/{app_ID}/devices
   *
   *    {
   *      "devices":[{
   *        "id": "externalId1"
   *      }, {
   *        "id": "externalId2"
   *      }]
   *.   }
   *
   *
   * @param {string} vendorId - Valid appId enabled for HERE Tracking
   * @param {Array} devices - Array of external IDs for new devices
   * @param {Object} options - Object containing request options
   * @param {string} options.token - Valid user access token
   * @returns {string} Request ID
   * @throws {Error} When an HTTP error has occurred
   */
  requestBatchExternalId(vendorId, devices, { token }) {
    const body = {
      devices: devices.map(deviceId => ({
        id: deviceId
      }))
    };

    return this.validate({ vendorId, devices, token }, ['vendorId', 'devices', 'token'])
      .then(() => this.fetch(this.url('registry', 'v2', vendorId, 'devices'),
        {
          method: 'post',
          headers: new Headers({
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }),
          body: JSON.stringify({
            body
          })
        })
        .then(json => json.jobId)
      );
  }

  /**
   * Check on the status of a previous request
   * /registry/v2/{jobId}/status
   *
   * @param {string} jobId - ID of the request
   * @param {Object} options - Object containing request options
   * @param {string} options.token - Valid user access token
   * @returns {Object} Body of the status check response
   * @throws {Error} When an HTTP error has occurred
   */
  checkBatchStatus(jobId, { token }) {
    return this.validate({ jobId, token }, ['jobId', 'token'])
      .then(() => this.fetch(this.url('registry', 'v2', jobId, 'status'), {
        method: 'get',
        headers: new Headers({
          'Authorization': `Bearer ${token}`
        })
      }));
  }

  /**
   * Get the results of a completed batch request
   * /v2/{jobId}/results
   *
   * @param {string} jobId - ID of the request
   * @param {Object} options - Object containing request options
   * @param {string} options.token - Valid user access token
   * @returns {Object} Body of the status check response
   * @throws {Error} When an HTTP error has occurred
   */
  getBatchResults(jobId, { token }) {
    return this.validate({ jobId, token }, ['jobId', 'token'])
      .then(() => this.fetch(this.url('registry', 'v2', jobId, 'results'), {
        method: 'get',
        headers: new Headers({
          'Authorization': `Bearer ${token}`
        })
      }));
  };

  /**
   * Helper function to repeatedly check batch status until the job is complete
   *
   * @param {string} jobId - ID of the request
   * @param {Object} options - Object containing method options
   * @param {string} options.token - Valid user access token
   * @returns {Object} Body of the status check response
   * @throws {Error} When an HTTP error has occurred
   */
  waitForBatchResults(jobId, options) {
    if (!this.batchTimeout) {
      this.batchTimeout = +new Date() + 30000;
    }

    if (+new Date() > this.batchTimeout) {
      delete this.batchTimeout;
      return Promise.reject(new Error('Timed out retrieving batch results'));
    }

    return this.checkBatchStatus(jobId, options)
      .then((status) => {
        if (status.status === 'complete') {
          delete this.batchTimeout;

          return this.getBatchResults(jobId, options);
        }
        return new Promise(resolve => setTimeout(() => resolve(), 1000))
          .then(() => this.waitForBatchResults(jobId, options));
      });
  }

  /**
   * Create device licenses.
   *
   * @param {string} vendorId - Valid appId enabled for HERE Tracking
   * @param {Object} options - Object containing method options
   * @param {string} options.token - Valid user access token
   * @param {string} options.count - Number of licenses to create. Default is 1.
   * @returns {Array} Device licenses
   * @throws {Error} When an HTTP error has occurred
   */
  provision(vendorId, { token, count = 1 }) {
    if (count > 100) {
      return Promise.reject(new Error('Too many licenses requested, maximum is 100'));
    }
    return this.validate({ vendorId, token }, ['vendorId', 'token'])
      .then(() => this.requestBatch(vendorId, count, { token }))
      .then(jobId => this.waitForBatchResults(jobId, { token }))
      .then((result) => {
        const { data } = result || {};

        if (!data || data.length === 0) {
          return Promise.reject(new Error('No Device license created'));
        }
        return data;
      });
  }

  /**
   * Create a license and autoclaim a Device.
   *
   * This creates a license using a vendor account
   * Then immediately claims it to the same account
   * as if it were a standard user.standard
   *
   * Typically, this is only used for testing and development.
   *
   * @param {string} vendorId - Valid appId enabled for HERE Tracking
   * @param {Object} options - Object containing method options
   * @param {string} options.token - Valid user access token
   *
   * @returns {Object} Device data and trackingId
   * @throws {Error} When an HTTP error has occurred
   */
  provisionAndClaim(vendorId, { token }) {
    return this.provision(vendorId, { token })
      .then((result = []) => {
        const { deviceId, deviceSecret } = result[0] || {};

        if (deviceId) {
          return this.claimDevice(deviceId, { token })
            .then(({ trackingId }) => ({ trackingId, deviceId, deviceSecret }));
        }
        return Promise.reject(new Error('No Device license created'));
      });
  }

  /**
   * Retrieves the count of already created licenses.
   * /registry/v2/{app_ID}/licenseCount
   *
   * @param {string} vendorId - Valid appId enabled for HERE Tracking
   * @param {Object} options - Object containing request options
   * @param {string} options.token - Valid user access token
   * @returns {Object} Object with number of created licenses
   * @throws {Error} When an HTTP error has occurred
   */
  getLicenseCount(vendorId, { token }) {
    return this.validate({ vendorId, token }, ['vendorId', 'token'])
      .then(() => this.fetch(this.url('registry', 'v2', vendorId, 'licenseCount'),
        {
          method: 'get',
          headers: new Headers({
            'Authorization': `Bearer ${token}`
          })
        }))
      .then(json => json.count);
  }
}

module.exports = Vendor;
