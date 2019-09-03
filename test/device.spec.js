import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import sinon from 'sinon';
require('sinon-as-promised');

import Device from '../src/device.js';
import Tracking from '../lib/HERETracking.js';

const mockTracking = new Tracking('abc', 'xyz');

mockTracking.environment = 'production';

chai.expect();
chai.use(chaiAsPromised);

const expect = chai.expect;
let device;
let thisFetch;

global.Headers = global.Headers || function(headers) { return headers; };
let headersSpy;

/** @test {Device} */
describe('Given an instance of the device module', function () {
  before(function () {
    headersSpy = sinon.spy(global, 'Headers');
  });

  beforeEach(function () {
    thisFetch = sinon.stub().resolves({});

    device = new Device({
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
      expect(device.url).to.be.an.instanceof(Function);
    });
  });
  /** @test {Device#login} */
  describe('when I login a device', function () {
    it('should reject bad options', () => {
      return device.login('mockId')
        .then(() => {
          expect(true).to.equal(false, 'getCall should reject');
        })
        .catch((response) => {
          expect(response).to.be.an('array');
          expect(response.length).to.equal(1);
          expect(response[0]).to.be.an('error');
          expect(response[0].message).to.equal('No device secret supplied');
        });
    });
    it('should call fetch with the right path values', () => {
      return device.login('id', 'secret')
        .then(() => {
          sinon.assert.calledWith(thisFetch, 'https://tracking.api.here.com/v2/token');
          expect(headersSpy.firstCall.args[0].Authorization.match(/oauth_consumer_key="id"/)).to.have.lengthOf(1);
        });
    });
  });
});
