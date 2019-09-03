import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import sinon from 'sinon';
require('sinon-as-promised');

import Users from '../src/users.js';
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

let users;

let thisFetch;

global.Headers = global.Headers || function(headers) { return headers; };
let headersSpy;

/** @test {Device} */
describe('Given an instance of the users module', function () {
  before(function () {
    headersSpy = sinon.spy(global, 'Headers');
  });

  beforeEach(function () {
    thisFetch = sinon.stub().resolves({});

    users = new Users({
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
      expect(users.url).to.be.an.instanceof(Function);
    });
  });
  /** @test {Users#listDevices} */
  describe('when I list devices', function () {
    it('should reject bad options', () => {
      return users.listDevices({})
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
  /** @test {Users#getLicenseInfo} */
  describe('when I get LicenseInfo', function () {
    it('should reject bad options', () => {
      return users.getLicenseInfo({})
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
