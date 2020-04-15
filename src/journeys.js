/*
 * Copyright (C) 2017-2019 HERE Europe B.V.
 * Licensed under MIT, see full license in LICENSE
 * SPDX-License-Identifier: MIT
 *
 *
 * Create and manage journey templates.
 *
 */

class Templates {
  /**
   * @param {Object} utils - general utilities passed from main HERETracking
   * @param {function(varArgs: ...string): string} utils.url - generate URL for HERE Tracking
   * @param {function(options: Object, required: Array): Promise} utils.validate - check the supplied parameters
   * @param {function(url: string, options: Object): Object} utils.fetch - wrap fetch and error handling
   */
  constructor(utils) {
    this.url = utils.url;
    this.validate = utils.validate;
    this.fetch = utils.fetch;
  }

  /**
   * List the journey templates available to the user.
   *
   * @param {Object} options - Object containing request options
   * @param {string} options.token - valid user access token
   * @param {number} [options.pageSize] - max number of entries retrieved in the page
   * @param {number} [options.pageIndex] - index of the page to retrieve
   * @param {number} [options.likeName] - a search term to fetch template having this term matching parts or their names
   * @param {number} [options.name] - an exact name search for a template
   * @returns {Array} body of the journey templates response
   * @throws {Error} when an HTTP error has occurred
   */
  list({ pageSize, pageIndex, likeName, name, token }) {
    return this.validate({ token }, ['token']).then(() => {
      const queryParameters = {};

      if (Number.isInteger(pageSize)) queryParameters.pageSize = pageSize;
      if (Number.isInteger(pageIndex)) queryParameters.pageIndex = pageIndex;
      if (typeof likeName === 'string') queryParameters.likeName = likeName;
      if (typeof name === 'string') queryParameters.name = name;

      const url = this.url('journeys', 'v2', 'journeyTemplates', queryParameters);

      return this.fetch(url, {
        method: 'get',
        headers: new Headers({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        })
      });
    });
  }

  /**
   * Get a specific journey template
   *
   * @param {string} templateId - ID of the journey template to retrieve
   * @param {Object} options - Object containing request options
   * @param {string} options.token - valid user access token
   * @param {number} [options.pageSize] - max number of entries retrieved in the page
   * @param {number} [options.pageIndex] - index of the page to retrieve
   * @param {number} [options.likeName] - a search term to fetch template having this term matching parts or their names
   * @param {number} [options.name] - an exact name search for a template
   * @returns {Array} body of the journey templates response
   * @throws {Error} when an HTTP error has occurred
   */
  get(templateId, { token }) {
    return this.validate({ token }, ['token']).then(() => {
      const url = this.url('journeys', 'v2', 'journeyTemplates', templateId);

      return this.fetch(url, {
        method: 'get',
        headers: new Headers({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        })
      });
    });
  }

  /**
   * Create a journey template
   *
   * @param {number} description - Human-readable description of the template
   * @param {number} checkpoints - Array of checkpoint objects in the order they should appear
   * @param {Object} templateOptions - Options relating to the management of the journey
   * @param {number} templateOptions.externalId - ID of of the template in the external system
   * @param {boolean} templateOptions.adhoc - ???
   * @param {Object} options - Object containing request options
   * @param {string} options.token - valid user access token
   * @returns {Object} body of the journey template response
   * @throws {Error} when an HTTP error has occurred
   */
  create(description, checkpoints, { externalId, adhoc = false }, { token }) {
    return this.validate({ description, checkpoints, token },
      ['description', 'checkpoints', 'token'])
      .then(() => {
        const body = {
          jorTempDesc: description,
          jorTempAdhoc: adhoc,
          checkpoints
        };

        if (externalId) {
          body.jorTempExtUid = externalId;
        }

        return this.fetch(this.url('journeys', 'v2', 'journeyTemplates'), {
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
   * Create a journey template, checkpoints and checkpoint types via JSON upload
   *
   * @param {number} templateJson - Object describing all checkpoints, types and the full template
   * @param {Object} options - Object containing request options
   * @param {string} options.token - valid user access token
   * @returns {Object} body of the journey template response
   * @throws {Error} when an HTTP error has occurred
   */
  jsonCreate(templateJson, { token }) {
    return this.validate({ templateJson, token },
      ['templateJson', 'token'])
      .then(() => {
        return this.fetch(this.url('journeys', 'v2', 'import', 'setup'), {
          method: 'post',
          headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }),
          body: JSON.stringify(templateJson)
        });
      });
  }

  /**
   * Delete journey template
   * @param {number} templateId - ID of the tempalte to delete
   * @param {Object} options - Object containing request options
   * @param {string} options.token - valid user access token
   * @returns {object} successful delete confirmation
   */
  delete(templateId, {token}) {
    return this.validate({ templateId, token },
      ['templateId', 'token'])
      .then(() => {
        return this.fetch(this.url('journeys', 'v2', 'journeyTemplates', templateId), {
          method: 'delete',
          headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          })
        });
      });
  }
}

/**
 * Create and manage journey instances.
 *
 */
class Instances {
  /**
   * @param {Object} utils - general utilities passed from main HERETracking
   * @param {function(varArgs: ...string): string} utils.url - generate URL for HERE Tracking
   * @param {function(options: Object, required: Array): Promise} utils.validate - check the supplied parameters
   * @param {function(url: string, options: Object): Object} utils.fetch - wrap fetch and error handling
   */
  constructor(utils) {
    this.url = utils.url;
    this.validate = utils.validate;
    this.fetch = utils.fetch;
  }

  /**
   * Retrieve details about a journey instance.
   *
   * @param {number} journeyId - ID of journey instance to retrieve
   * @param {Object} options - Object containing request options
   * @param {number} options.checkupTs - timestamp at which to evaluate the journey delays
   * @param {string} options.token - valid user access token
   * @param {string} [options.detailed] - required level of detail in response
   * @param {string} [options.checkupTs] - timestamp we want information about.
   * @returns {Object} body of the journey instance response
   * @throws {Error} when an HTTP error has occurred
   */
  get(journeyId, { checkupTs, detailed, token }) {
    return this.validate({ token, journeyId }, ['token', 'journeyId']).then(() => {
      const queryParameters = {};

      if (typeof detailed === 'string') queryParameters.detailed = detailed;
      if (Number.isInteger(checkupTs)) queryParameters.checkupTs = checkupTs;

      const url = this.url('journeys', 'v2', `${journeyId}`, queryParameters);

      return this.fetch(url, {
        method: 'get',
        headers: new Headers({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        })
      });
    });
  }

  /**
   * List the journey instances available to the user
   *
   * @param {Object} options - Object containing request options
   * @param {number} options.checkupTs - timestamp at which to evaluate the journey delays
   * @param {string} options.token - valid user access token
   * @param {string} options.detailed - required level of detail in response
   * @returns {Object} body of the journey instance response
   * @throws {Error} when an HTTP error has occurred
   */
  list({ checkupTs, detailed, token }) {
    return this.validate({ token }, ['token']).then(() => {
      const queryParameters = {};

      if (typeof detailed === 'string') queryParameters.detailed = detailed;
      if (Number.isInteger(checkupTs)) queryParameters.checkupTs = checkupTs;

      const url = this.url('journeys', 'v2', queryParameters);

      return this.fetch(url, {
        method: 'get',
        headers: new Headers({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        })
      });
    });
  }

  /**
   * Create a journey instance
   *
   * @param {number} templateId - ID of journey instance to retrieve
   * @param {number} trackingId - ID of the device
   * @param {number} externalId - ID of of the device in the external system
   * @param {Object} instanceOptions - Options relating to the management of the journey
   * @param {boolean} instanceOptions.controlled - Enable controlled journey transition mode
   * @param {boolean} instanceOptions.autostart - Start the journey when the first checkpoint is transitioned
   * @param {Object} options - Object containing request options
   * @param {string} options.token - valid user access token
   * @param {string} options.detailed - required level of detail in response
   * @returns {Object} body of the journey instance response
   * @throws {Error} when an HTTP error has occurred
   */
  create(templateId, trackingId, externalId, { controlled = true, autoStart = true }, { token }) {
    return this.validate({ templateId, trackingId, externalId, token },
      ['templateId', 'trackingId', 'externalId', 'token'])
      .then(() => {
        const body = {
          jorTempId: templateId,
          jorExtUid: externalId,
          trackerUid: trackingId,
          jorControlled: controlled,
          autoStart
        };

        return this.fetch(this.url('journeys', 'v2'), {
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
   * Create journey instance via JSON upload
   *
   * @param {number} instanceJson - Object describing all checkpoints, types and the full template
   * @param {Object} options - Object containing request options
   * @param {string} options.token - valid user access token
   * @returns {Object} body of the journey template response
   * @throws {Error} when an HTTP error has occurred
   */
  jsonCreate(instanceJson, { token }) {
    return this.validate({ instanceJson, token },
      ['instanceJson', 'token'])
      .then(() => {
        return this.fetch(this.url('journeys', 'v2', 'import', 'journeys'), {
          method: 'post',
          headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }),
          body: JSON.stringify(instanceJson)
        });
      });
  }

}

/**
 * Create and manage journey statistics.
 *
 */
class Stats {
  /**
   * @param {Object} utils - general utilities passed from main HERETracking
   * @param {function(varArgs: ...string): string} utils.url - generate URL for HERE Tracking
   * @param {function(options: Object, required: Array): Promise} utils.validate - check the supplied parameters
   * @param {function(url: string, options: Object): Object} utils.fetch - wrap fetch and error handling
   */
  constructor(utils) {
    this.url = utils.url;
    this.validate = utils.validate;
    this.fetch = utils.fetch;
  }

  /**
   * Retrieve statistical totals.
   *
   * @param {Object} options - Object containing request options
   * @param {string} options.token - valid user access token
   * @param {number} options.checkupTs - the timestamp where the statistics are to be retrieved
   * @param {Array} options.templates - journey template IDs, for which transactions are to contribute
   * to the statistics
   * @param {Array} options.journeys - journey IDs, which are to contribute to the statistics
   * @param {Array} options.checkpoints - check point IDs, for which transactions are to contribute
   * in the statistics
   * @param {Array} options.checkpointTypes - checkpoint types, for which transactions are to
   * contribute to the statistics
   * @param {Array} options.assets - assets list, for which transactions are to contribute to the statistics
   * @param {number} options.statusId - the status ID of journey instances to contribute to the statistics
   * @param {number} options.fromTs - the minimum checkpoint event timestamp that may contribute to
   * the statistics
   * @param {number} options.toTs - the maximum checkpoint event timestamp that may contribute to
   * the statistics
   * @param {Array} options.ranges - array of time ranges to obtain counts within { fromTs: 9999, toTs: 9999 }
   * @returns {Object} body of the statistics response
   * @throws {Error} when an HTTP error has occurred
   */
  getOverallTotals({
    checkupTs, templates, journeys, checkpoints, checkpointTypes,
    assets, statusId, fromTs, toTs, ranges, token
  }) {
    return this.validate({ token }, ['token']).then(() => {
      const queryParameters = {};

      if (Number.isInteger(checkupTs)) queryParameters.checkupTs = checkupTs;
      if (Number.isInteger(statusId)) queryParameters.statusId = statusId;
      if (Number.isInteger(fromTs)) queryParameters.fromTs = fromTs;
      if (Number.isInteger(toTs)) queryParameters.toTs = toTs;

      const body = {};

      if (Array.isArray(templates) && templates.length) body.templates = templates;
      if (Array.isArray(journeys) && journeys.length) body.journeys = journeys;
      if (Array.isArray(checkpoints) && checkpoints.length) body.checkpoints = checkpoints;
      if (Array.isArray(checkpointTypes) && checkpointTypes.length) body.checkpointTypes = checkpointTypes;
      if (Array.isArray(assets) && assets.length) body.assets = assets;
      if (Array.isArray(ranges) && ranges.length) body.ranges = ranges;

      const url = this.url('journeys', 'v2', 'stats', 'overallTotals', queryParameters);

      return this.fetch(url, {
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
   * Retrieve journeys that have delays in a specific delay range.
   *
   * @param {number} minDelayS - Minimum delay value for a journey instance to Retrieve
   * @param {number} maxDelayS - Maximum delay value for a journey instance to Retrieve
   * @param {Object} options - Object containing request options
   * @param {string} options.token - valid user access token
   * @param {number} options.checkupTs - the timestamp where the statistics are to be retrieved
   * @param {Array} options.templates - journey template IDs, for which transactions are to contribute
   * to the statistics
   * @param {Array} options.journeys - journey IDs, which are to contribute to the statistics
   * @param {Array} options.checkpoints - check point IDs, for which transactions are to contribute
   * in the statistics
   * @param {Array} options.checkpointTypes - checkpoint types, for which transactions are to
   * contribute to the statistics
   * @param {Array} options.assets - assets list, for which transactions are to contribute to the statistics
   * @param {number} options.statusId - the status ID of journey instances to contribute to the statistics
   * @param {number} options.fromTs - the minimum checkpoint event timestamp that may contribute to
   * the statistics
   * @param {number} options.toTs - the maximum checkpoint event timestamp that may contribute to
   * the statistics
   * @returns {Object} body of the journeys list response
   * @throws {Error} when an HTTP error has occurred
   */
  listJourneysByDelays(minDelayS, maxDelayS, {
    checkupTs, templates, journeys, checkpoints, checkpointTypes,
    assets, statusId, fromTs, toTs, pageSize, pageIndex, token
  }) {
    if (!Number.isInteger(minDelayS) || !Number.isInteger(maxDelayS) || minDelayS > maxDelayS) {
      return Promise.reject(new Error('Invalid min/max delay values'));
    }
    return this.validate({ token }, ['token']).then(() => {
      const queryParameters = { minDelayS, maxDelayS };

      if (Number.isInteger(checkupTs)) queryParameters.checkupTs = checkupTs;
      if (Number.isInteger(statusId)) queryParameters.statusId = statusId;
      if (Number.isInteger(fromTs)) queryParameters.fromTs = fromTs;
      if (Number.isInteger(toTs)) queryParameters.toTs = toTs;
      if (Number.isInteger(pageSize)) queryParameters.pageSize = pageSize;
      if (Number.isInteger(pageIndex)) queryParameters.pageIndex = pageIndex;

      const body = {};

      if (Array.isArray(templates) && templates.length) body.templates = templates;
      if (Array.isArray(journeys) && journeys.length) body.journeys = journeys;
      if (Array.isArray(checkpoints) && checkpoints.length) body.checkpoints = checkpoints;
      if (Array.isArray(checkpointTypes) && checkpointTypes.length) body.checkpointTypes = checkpointTypes;
      if (Array.isArray(assets) && assets.length) body.assets = assets;

      const url = this.url('journeys', 'v2', 'stats', 'journeysDelays', queryParameters);

      return this.fetch(url, {
        method: 'post',
        headers: new Headers({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }),
        body: JSON.stringify(body)
      });
    });
  }
}

/**
 * Create and manage journey checkpoints.
 *
 */
class Checkpoints {
  /**
   * @param {Object} utils - general utilities passed from main HERETracking
   * @param {function(varArgs: ...string): string} utils.url - generate URL for HERE Tracking
   * @param {function(options: Object, required: Array): Promise} utils.validate - check the supplied parameters
   * @param {function(url: string, options: Object): Object} utils.fetch - wrap fetch and error handling
   */
  constructor(utils) {
    this.url = utils.url;
    this.validate = utils.validate;
    this.fetch = utils.fetch;
  }

  /**
   * List the checkpoints available to the user.
   *
   * @param {Object} options - Object containing request options
   * @param {string} options.token - valid user access token
   * @param {number} [options.pageSize] - max number of entries retrieved in the page
   * @param {number} [options.pageIndex] - index of the page to retrieve
   * @param {number} [options.likeName] - a search term to fetch template having this term matching parts or their names
   * @param {number} [options.name] - an exact name search for a template
   * @returns {Array} body of the journey templates response
   * @throws {Error} when an HTTP error has occurred
   */
  list({ pageSize, pageIndex, likeName, name, token }) {
    return this.validate({ token }, ['token']).then(() => {
      const queryParameters = {};

      if (Number.isInteger(pageSize)) queryParameters.pageSize = pageSize;
      if (Number.isInteger(pageIndex)) queryParameters.pageIndex = pageIndex;
      if (typeof likeName === 'string') queryParameters.likeName = likeName;
      if (typeof name === 'string') queryParameters.name = name;

      const url = this.url('journeys', 'v2', 'checkpoints', queryParameters);

      return this.fetch(url, {
        method: 'get',
        headers: new Headers({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        })
      });
    });
  }

  /**
   * Get the checkpoint details
   *
   * @param {string} checkpointId - ID of checkpoint we want information about
   * @param {Object} options - Object containing request options
   * @param {string} options.token - valid user access token
   * @param {number} [options.pageSize] - max number of entries retrieved in the page
   * @param {number} [options.pageIndex] - index of the page to retrieve
   * @param {number} [options.likeName] - a search term to fetch template having this term matching parts or their names
   * @param {number} [options.name] - an exact name search for a template
   * @returns {Array} body of the journey templates response
   * @throws {Error} when an HTTP error has occurred
   */
  get(checkpointId, { pageSize, pageIndex, likeName, name, token }) {
    return this.validate({ token, checkpointId }, ['token', 'checkpointId']).then(() => {
      const url = this.url('journeys', 'v2', 'checkpoints', `${checkpointId}`);

      return this.fetch(url, {
        method: 'get',
        headers: new Headers({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        })
      });
    });
  }

  /**
   * List the checkpoint types available to the user.
   *
   * @param {Object} options - Object containing request options
   * @param {string} options.token - valid user access token
   * @param {number} [options.pageSize] - max number of entries retrieved in the page
   * @param {number} [options.pageIndex] - index of the page to retrieve
   * @param {number} [options.likeName] - a search term to fetch template having this term matching parts or their names
   * @param {number} [options.name] - an exact name search for a template
   * @returns {Array} body of the journey templates response
   * @throws {Error} when an HTTP error has occurred
   */
  listTypes({ pageSize, pageIndex, likeName, name, token }) {
    return this.validate({ token }, ['token']).then(() => {
      const queryParameters = {};

      if (Number.isInteger(pageSize)) queryParameters.pageSize = pageSize;
      if (Number.isInteger(pageIndex)) queryParameters.pageIndex = pageIndex;
      if (typeof likeName === 'string') queryParameters.likeName = likeName;
      if (typeof name === 'string') queryParameters.name = name;

      const url = this.url('journeys', 'v2', 'checkpointtypes', queryParameters);

      return this.fetch(url, {
        method: 'get',
        headers: new Headers({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        })
      });
    });
  }

  /**
   * Create checkpoints
   * @param {Array} checkpoints - list of checkpoints to create
   * @param {Object} options - Object containing request options
   * @param {string} options.token - valid user access token
   * @returns {Object} list of failed and succesful creations
   */
  create(checkpoints, {token}) {
    return this.validate({ checkpoints, token },
      ['checkpoints', 'token'])
      .then(() => {
        const body = checkpoints.map(checkpoint => {
          const checkpointBody = {
            cpTypeId: checkpoint.type,
            cpDesc: checkpoint.description
          };

          if (checkpoint.externalId) {
            checkpointBody.cpExtUid = checkpoint.externalId;
          }
          if (checkpoint.externalIdType) {
            checkpointBody.cpExtUid = checkpoint.externalIdType;
          }
          if (checkpoint.info) {
            checkpointBody.infoObj = checkpoint.info;
          }
          return checkpointBody;
        });

        return this.fetch(this.url('journeys', 'v2', 'checkpoints'), {
          method: 'post',
          headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }),
          body: JSON.stringify({checkpoints: body})
        });
      });
  }

  /**
   * Delete checkpoint
   * @param {number} checkpointId - ID of the checkpoint to delete
   * @param {Object} options - Object containing request options
   * @param {string} options.token - valid user access token
   * @returns {object} successful delete confirmation
   */
  delete(checkpointId, {token}) {
    return this.validate({ checkpointId, token },
      ['checkpointId', 'token'])
      .then(() => {
        return this.fetch(this.url('journeys', 'v2', 'checkpoints', checkpointId), {
          method: 'delete',
          headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          })
        });
      });
  }

  /**
   * Create checkpoint type
   * @param {String} name - Human-readable name of type to create
   * @param {String} externalId - reference to an external system ID
   * @param {Object} options - Object containing request options
   * @param {string} options.token - valid user access token
   * @returns {Object} confirmation of type creation
   */
  createType(name, externalId, {token}) {
    return this.validate({ name, externalId, token },
      ['name', 'externalId', 'token'])
      .then(() => {
        return this.fetch(this.url('journeys', 'v2', 'checkpointtypes'), {
          method: 'post',
          headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }),
          body: JSON.stringify({
            cpTypeName: name,
            cpTypeExtUid: externalId
          })
        });
      });
  }

  /**
   * Delete checkpoint type
   * @param {String} typeId - ID of the checkpoint type to delete
   * @param {Object} options - Object containing request options
   * @param {string} options.token - valid user access token
   * @returns {Object} confirmation of type deletion
   */
  deleteType(typeId, {token}) {
    return this.validate({ typeId, token },
      ['typeId', 'token'])
      .then(() => {
        return this.fetch(this.url('journeys', 'v2', 'checkpointtypes', typeId), {
          method: 'delete',
          headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          })
        });
      });
  }

}

/**
 * Create and manage journeys.
 *
 */
class Journeys {

  /**
   * @param {Object} utils - general utilities passed from main HERETracking
   * @param {function(varArgs: ...string): string} utils.url - generate URL for HERE Tracking
   * @param {function(options: Object, required: Array): Promise} utils.validate - check the supplied parameters
   * @param {function(url: string, options: Object): Object} utils.fetch - wrap fetch and error handling
   */
  constructor(utils) {
    this.templates = new Templates(utils);
    this.stats = new Stats(utils);
    this.instances = new Instances(utils);
    this.checkpoints = new Checkpoints(utils);
  }
}

module.exports = Journeys;
