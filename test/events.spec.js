import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import sinon from 'sinon';
require('sinon-as-promised');

import Events from '../src/events.js';
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

let events;

let thisFetch;

global.Headers = global.Headers || function(headers) { return headers; };
let headersSpy;

/** @test {Device} */
describe('Given an instance of the events module', function () {
  before(function () {
    headersSpy = sinon.spy(global, 'Headers');
  });

  beforeEach(function () {
    thisFetch = sinon.stub().resolves({});

    events = new Events({
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

  describe('when I want to use the URL utility', function () {
    it('should have a reference to it', () => {
      expect(events.url).to.be.an.instanceof(Function);
    });
  });
  /** @test {Rules#list} */
  describe('when I list events', function () {
    it('should reject bad options', () => {
      return events.list({})
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
  describe('when I get rules by device', function () {
    it('should reject bad options', () => {
      return events.getByDevice('trackingId', {})
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
