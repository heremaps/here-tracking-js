import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import sinon from 'sinon';
require('sinon-as-promised');

import Vendor from '../src/vendor.js';
import Tracking from '../lib/HERETracking.js';

const mockTracking = new Tracking('abc', 'xyz');

mockTracking.environment = 'production';

chai.expect();
chai.use(chaiAsPromised);

const expect = chai.expect;

let vendor;

let thisFetch;

global.Headers = global.Headers || function(headers) { return headers; };
let headersSpy;

/** @test {Vendor} */
describe('Given an instance of the vendor management module', function () {
  before(function() {
    headersSpy = sinon.spy(global, 'Headers');
  });

  beforeEach(function () {
    thisFetch = sinon.stub().resolves({});

    vendor = new Vendor({
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
      expect(vendor.url).to.be.an.instanceof(Function);
    });
  });
  /** @test {Vendor#requestBatch} */
  describe('when I request a batch', function () {
    it('should reject bad options', () => {
      return vendor.requestBatch('mockId', 1, {})
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
    it('should call fetch with the right path values', () => {
      return vendor.requestBatch('mockId', 1, {token: 'abc'})
        .then(() => {
          sinon.assert.calledWith(thisFetch, 'https://tracking.api.here.com/registry/v2/mockId/devices');
        });
    });
  });
  /** @test {Vendor#requestBatchExternalId} */
  describe('when I request a batch with an externalId', function () {
    beforeEach(() => {
      thisFetch = sinon.stub().resolves({jobId: 'job1'});
      vendor = new Vendor({
        url: mockTracking.url.bind(mockTracking),
        validate: Tracking.validate.bind(mockTracking),
        fetch: thisFetch
      });
    });

    it('should reject bad options', () => {
      return vendor.requestBatchExternalId('mockId', ['id1', 'id2'], {})
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
    it('should call fetch with the right path values', () => {
      return vendor.requestBatchExternalId('mockId', ['id1', 'id2'], {token: '123'})
        .then(() => {
          sinon.assert.calledWith(thisFetch, 'https://tracking.api.here.com/registry/v2/mockId/devices');
        });
    });
  });
});
