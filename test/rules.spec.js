import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import sinon from 'sinon';
require('sinon-as-promised');

import Rules from '../src/rules.js';
import Tracking from '../lib/HERETracking.js';

const mockTracking = new Tracking('abc', 'xyz');

mockTracking.environment = 'production';

const mockVendor = {
  requestBatch: sinon.stub().resolves([{}]),
  waitForBatchResults: sinon.stub().resolves([{}])
};

chai.expect();
chai.use(chaiAsPromised);

const expect = chai.expect;

let rules;

let thisFetch;

global.Headers = global.Headers || function(headers) { return headers; };
let headersSpy;

/** @test {Device} */
describe('Given an instance of the rules module', function () {
  before(function () {
    headersSpy = sinon.spy(global, 'Headers');
  });

  beforeEach(function () {
    thisFetch = sinon.stub().resolves({});

    rules = new Rules({
      url: mockTracking.url.bind(mockTracking),
      validate: Tracking.validate.bind(mockTracking),
      fetch: thisFetch
    });
  });

  afterEach(function () {
    headersSpy.reset();
  });

  after(function () {
    headersSpy.restore();
  });

  describe('when I want to use sensor types array', function () {
    it('should have a reference to it', () => {
      expect(rules.SENSOR_TYPES[0]).to.equal('acceleration');
    });
  });
  describe('when I want to use the URL utility', function () {
    it('should have a reference to it', () => {
      expect(rules.url).to.be.an.instanceof(Function);
    });
  });
  /** @test {Rules#list} */
  describe('when I list rules', function () {
    it('should reject bad options', () => {
      return rules.list({})
        .then(() => {
          expect(true).to.equal(false, 'getCall should reject');
        })
        .catch((response) => {
          expect(response).to.be.an('array');
          expect(response.length).to.equal(1);
          expect(response[0]).to.be.an('error');
          expect(response[0].message).to.equal('No token supplied');
        });
    });
  });
  /** @test {Rules#remove} */
  describe('when I remove a rule', function () {
    it('should reject bad options', () => {
      return rules.remove('ruleId', {})
        .then(() => {
          expect(true).to.equal(false, 'getCall should reject');
        })
        .catch((response) => {
          expect(response).to.be.an('array');
          expect(response.length).to.equal(1);
          expect(response[0]).to.be.an('error');
          expect(response[0].message).to.equal('No token supplied');
        });
    });
  });
});
