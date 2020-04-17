/*
 * Copyright (C) 2017-2019 HERE Europe B.V.
 * Licensed under MIT, see full license in LICENSE
 * SPDX-License-Identifier: MIT
 */
const Geofences = require('./geofences');
const Device = require('./device');
const Devices = require('./devices');
const Vendor = require('./vendor');
const Notifications = require('./notifications');
const Shadows = require('./shadows');
const Traces = require('./traces');
const Transitions = require('./transitions');
const Journeys = require('./journeys');
const Users = require('./users');
const Aliases = require('./aliases');
const Metadata = require('./metadata');
const Events = require('./events');
const Rules = require('./rules');
const Associations = require('./associations');
const Messages = require('./messages');

// Validation for correlationId
const v4 = new RegExp(/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i);

/**
 * HERETracking JS simplifies access to HERE Tracking.
 * It can be used to create management consoles, monitoring interfaces
 * and general device interfaces.
 *
 * It can also be used to create a virtual device.
 */
class HERETracking {

  /**
   * Create an instance of HERETracking
   *
   * See https://developer.here.com/ for more details
   */
  constructor() {
    this._hosts = {
      'cit': 'https://cit.tracking.api.here.com',
      'production': 'https://tracking.api.here.com'
    };

    this._name = 'HERETracking v2.2.1';
    this._environment = 'production';
    this._host = this._hosts[this._environment];

    // If this is set, use it as a trace for all request
    this._correlationId = null;

    // If this is set, use it on all API calls
    this._projectId = null;

    const utils = {
      url: this.url.bind(this),
      validate: HERETracking.validate.bind(this),
      fetch: (url, options = {}) => {
        if (this._correlationId) {
          options.headers = options.headers || {};
          options.headers['X-Request-Id'] = this._correlationId;
        }
        return fetch(url, options)
          .then(HERETracking.handleErrors)
          .then((response) => {
            const contentType = response.headers.get('content-type');

            if (contentType) {
              if (contentType.indexOf('application/json') !== -1) {
                return response.json();
              }
              if (contentType.indexOf('text/plain') !== -1) {
                return response.text();
              }
            }
            return response;
          });
      },
      normaliseId: HERETracking.normaliseId.bind(this)
    };

    /**
     * Create, modify and delete geofences: {@link Geofences}
     */
    this.geofences = new Geofences(utils);
    /**
     * Device sender interface: {@link Device}
     */
    this.device = new Device(utils);
    /**
     * Device management interfaces: {@link Devices}
     */
    this.devices = new Devices(utils);
    /**
     * Provision new devices.: {@link Vendor}
     */
    this.vendor = new Vendor(utils, this.devices.claim);
    /**
     * Register and unregister notification channels: {@link Notifications}
     */
    this.notifications = new Notifications(utils);
    /**
     * Access to device shadows: {@link Shadows}
     */
    this.shadows = new Shadows(utils);
    /**
     * Access to device geofence transitions: {@link Transitions}
     */
    this.transitions = new Transitions(utils);
    /**
     * Manage journey templates and instances: {@link Journeys}
     */
    this.journeys = new Journeys(utils);
    /**
     * Access to device traces: {@link Traces}
     */
    this.traces = new Traces(utils);
    /**
     * Log in users, list available devices: {@link Users}
     */
    this.users = new Users(utils);
    /**
     * Manage external IDs for devices: {@link Aliases}
     */
    this.aliases = new Aliases(utils);
    /**
     * Manage associated data for devices and geofences: {@link Metadata}
     */
    this.metadata = new Metadata(utils);
    /**
     * Create and manage sensor rules {@link Rules}
     */
    this.rules = new Rules(utils);
    /**
     * Manage sensor events {@link Events}
     */
    this.events = new Events(utils);
    /**
     * Manage associations between devices and rules {@link Associations}
     */
    this.associations = new Associations(utils);
  }

  /**
   * Return the name and version of this library
   * @returns {string} Name and version
   */
  get name() {
    return this._name;
  }

  /**
   * Valid environments are 'cit', 'production'
   * @param {string} env - Environment name
   */
  set environment(env) {
    if (Object.keys(this._hosts).indexOf(env) > -1) {
      this._environment = env;
      this._host = this._hosts[env];
    }
  }

  /**
   * Allows setting a global correlationId for all requests
   * @param {string} id - valid UUID v4
   */
  set correlationId(id) {
    if (id.match(v4)) {
      this._correlationId = id;
    } else {
      throw new TypeError(Messages.v4);
    }
  }

  /**
   * @returns {string} Specified environment name
   */
  get environment() {
    return this._environment;
  }

  /**
   * @returns {string} Specified projectId name
   */
  get projectId() {
    return this._projectId;
  }

  /**
   * Allows setting a global projectId for all requests
   * @param {string} id
   */
  set projectId(id) {
    this._projectId = id;
  }

  /**
   * Generate a correctly formatted URL pointing to the
   * right environment.
   *
   * Can be called with:
   *
   *     url(servicename, version, path, segments)
   *
   * or
   *
   *     url(path)
   *
   * @param {...string} [args] Variable arguments list of path parts
   * @returns {string} Formatted HERE Tracking URL
   */
  url(...args) {
    const queryParams = {};

    if (this._projectId) {
      queryParams.projectId = this._projectId;
    }

    if (typeof args[args.length - 1] === 'object') {
      const params = args.pop();

      // eslint-disable-next-line no-restricted-syntax
      for (const key in params) {
        queryParams[key] = params[key];
      }
    }

    let pathname = `/${args.join('/')}`;

    if (pathname.match(/^\/\//)) {
      pathname = pathname.substr(1);
    }

    const query = HERETracking.serialize(queryParams);

    return `${this._host}${pathname}${query ? `?${query}` : ''}`;
  }

  static serialize(obj) {
    const str = [];

    Object.keys(obj).forEach((key) => {
      str.push(`${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`);
    });

    return str.join('&');
  }

  /**
   * Handle HTTP Errors
   *
   * Throw when the HTTP response is not a good one.
   *
   * @param {Object} response result of a Fetch call
   * @returns {Object} A promise that resolves to the Response object of Fetch API
   * @throws {Error} When an HTTP error has occurred
   */
  static handleErrors(response) {
    if (!response.ok) {
      return Promise.reject(response);
    }
    return response;
  }

  /**
   * Allow methods to be called using either trackingId
   * or an object containing externalId and appId
   * @param {string} trackingId - can be a trackingId or an externalId/appId object
   * @returns {Object} trackingId and queryParameter object
   */
  static normaliseId(trackingId) {
    const { appId, externalId } = trackingId;

    if (appId && externalId) {
      return {
        trackingId: externalId,
        queryParameters: {
          appId
        }
      };
    }
    return {
      trackingId,
      queryParameters: {}
    };
  }

  /**
   * Return consistent error messages
   *
   * @param {string} key Name of missing parameter
   * @returns {string} Error message
   */
  static errorMessages(key) {
    return Messages[key] || `Required parameter missing: ${key}`;
  }

  /**
   * Determine missing parameters
   *
   * If a key is listed in requiredKeys but not available in
   * options, an error message is returned;
   *
   * @param {Object} options supplied parameters
   * @param {Array} requiredKeys List of required parameters
   * @returns {Array} Error messages for missing parameters
   */
  static check(options, requiredKeys) {
    return requiredKeys.map(key => (!options[key] && key) || key === 0)
      .filter(Boolean)
      .map(HERETracking.errorMessages);
  }

  /**
   * Resolve or reject based on missing parameters
   *
   * @param {Object} options Supplied parameters
   * @param {Array} keys List of required parameters
   * @returns {Promise}
   */
  static validate(options, keys) {
    if (typeof keys === 'undefined' || keys.length === 0) {
      return Promise.resolve(true);
    }
    const errors = HERETracking.check(options, keys);

    if (errors.length > 0) {
      return Promise.reject(errors.map(Error));
    }
    return Promise.resolve(true);
  }

}

module.exports = HERETracking;
