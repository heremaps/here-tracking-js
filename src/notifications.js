/*
 * Copyright (C) 2017-2019 HERE Europe B.V.
 * Licensed under MIT, see full license in LICENSE
 * SPDX-License-Identifier: MIT
 *
 *
 * Register and unregister notification channels.
 *
 * These channels will be used to inform users of device geofence transitions
 *
 * For more information, see:
 * https://developer.here.com/documentation/tracking/topics/notifications.html
 *
 */
class Notifications {

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
   * Register a notifications channel
   * /notifications/v2/register
   *
   * @param {string} type - Type of channel, possible value: 'webhook'
   * @param {Object} value - Channel details, URL for 'webhook'
   * @param {Object} options - Object containing request options
   * @param {string} options.token - Valid user access token
   * @returns {Object} Success message
   * @throws {Error} When an HTTP error has occurred
   */
  register(type, value, { token }) {
    return this.validate({ type, token }, ['type', 'value', 'token'])
      .then(() => {
        const channel = {
          type
        };

        if (type !== 'webhook') {
          return Promise.reject(new Error('Unsupported notification type'));
        }

        channel.url = value;

        const url = this.url('notifications', 'v2', 'register');

        return this.fetch(url, {
          method: 'post',
          credentials: 'include',
          headers: new Headers({
            'Authorization': `Bearer ${token}`
          }),
          body: JSON.stringify(channel)
        });
      });
  }

  /**
   * Retrieve list of registered notification channels
   * /notifications/v2/registrations
   *
   * @param {Object} options - Object containing request options
   * @param {string} options.token - Valid user access token
   * @returns {Object} List of notification channels
   * @throws {Error} When an HTTP error has occurred
   */
  list({ token }) {
    return this.validate({ token }, ['token'])
      .then(() => this.fetch(this.url('notifications', 'v2', 'registrations'), {
        credentials: 'include',
        headers: new Headers({
          'Authorization': `Bearer ${token}`
        })
      }));
  }

  /**
   * Remove a notification channel
   *  /notifications/v2/registration/{channelName}
   *
   * @param {Object} channelName - ID of the channel
   * @param {Object} options - Object containing request options
   * @param {string} options.token - Valid user access token
   * @throws {Error} When an HTTP error has occurred
   */
  delete(channelName, { token }) {
    return this.validate({ channelName }, ['channelName'])
      .then(() => this.fetch(this.url('notifications', 'v2', 'registration', channelName), {
        method: 'delete',
        headers: new Headers({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        })
      }));
  }
}

module.exports = Notifications;
