import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import sinon from 'sinon';
require('sinon-as-promised');

import Devices from '../src/devices.js';
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

let devices;

let thisFetch;

global.Headers = global.Headers || function(headers) { return headers; };
let headersSpy;

/** @test {Device} */
describe('Given an instance of the device management module', function () {
  before(function() {
    headersSpy = sinon.spy(global, 'Headers');
  });

  beforeEach(function () {
    thisFetch = sinon.stub().resolves({});

    devices = new Devices({
      url: mockTracking.url.bind(mockTracking),
      validate: Tracking.validate.bind(mockTracking),
      fetch: thisFetch
    }, mockVendor);
  });

  afterEach(function () {
    headersSpy.reset();
  });

  after(function () {
    headersSpy.restore();
  });

  describe('when I want to use the URL utility', function () {
    it('should have a reference to it', () => {
      expect(devices.url).to.be.an.instanceof(Function);
    });
  });
  /** @test {Device#claim} */
  describe('when I claim a device', function () {
    it('should reject bad options', () => {
      return devices.claim('mockId', {})
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
    it('should call fetch with the right parameters', () => {
      return devices.claim('xyz', {token: 'abc', ownerAppId: 'mockOwnerAppId'})
        .then(() => {
          sinon.assert.calledWith(
            thisFetch,
            'https://tracking.api.here.com/registry/v2/devices/xyz', {
              method: 'put',
              headers: new Headers({
                'Authorization': `Bearer abc`,
                'Content-Type': 'application/json'
              }),
              body: JSON.stringify({ownerAppId: 'mockOwnerAppId'})
            }
          );
        });
    });
  });
  /** @test {Device#unclaim} */
  describe('when I unclaim a device', function () {
    beforeEach(() => {
      thisFetch = sinon.stub().resolves();
      devices = new Devices({
        url: mockTracking.url.bind(mockTracking),
        validate: Tracking.validate.bind(mockTracking),
        fetch: thisFetch
      }, mockVendor);
    });

    it('should reject bad options', () => {
      return devices.unclaim('xyz', {})
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
      return devices.unclaim('xyz', {token: 'abc'})
        .then(() => {
          sinon.assert.calledWith(thisFetch, 'https://tracking.api.here.com/registry/v2/xyz');
        });
    });
  });
});
