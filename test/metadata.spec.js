import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import sinon from 'sinon';
require('sinon-as-promised');

import Metadata from '../src/metadata.js';
import Tracking from '../lib/HERETracking.js';

const mockTracking = new Tracking('abc', 'xyz');

mockTracking.environment = 'production';

chai.expect();
chai.use(chaiAsPromised);

const expect = chai.expect;

global.Headers = global.Headers || function(headers) { return headers; };

let metadata;
let thisFetch;
let headersSpy;
let urlSpy;

/** @test {metadata} */
describe('Given an instance of the metadata module', function () {
  before(() => {
    headersSpy = sinon.spy(global, 'Headers');
    urlSpy = sinon.stub().resolves({});
  });

  beforeEach(() => {
    thisFetch = sinon.stub().resolves({});

    metadata = new Metadata({
      url: urlSpy,
      validate: Tracking.validate.bind(mockTracking),
      fetch: thisFetch,
      normaliseId: () => ({trackingId: '123', queryParameters: {}})
    });
  });

  afterEach(() => {
    headersSpy.reset();
    urlSpy.reset();
  });

  after(() => {
    headersSpy.restore();
  });

  describe('when I want to use the URL utility', function () {
    it('should have a reference to it', () => {
      expect(metadata.url).to.be.an.instanceof(Function);
    });
  });

  describe('when I want to use the ID normalisation utility', function () {
    it('should have a reference to it', () => {
      expect(metadata.normaliseId).to.be.an.instanceof(Function);
    });
  });

  describe('when I get metadata', function () {
    it('should reject if no user token supplied', () => {
      const getCall = metadata.get(123, {});

      return getCall
        .then(() => {
          expect(true).to.equal(false, 'getCall should reject');
        })
        .catch(e => {
          expect(e).to.be.an.instanceOf(Array)
            .and.to.have.lengthOf(1);
          expect(e[0]).to.be.an.instanceOf(Error)
            .and.have.property('message', 'No token supplied');
        });
    });
  });

  it('should resolve if token and account ID are supplied', () => {
    const getCall = metadata.get(123, { token: 'abc' });

    expect(getCall).to.be.fulfilled;
  });

  it('should attempt to normalise the ID', () => {
    const getCall = metadata.get(123, { token: 'abc' });
    return getCall
      .then(() => {
        expect(urlSpy.called).to.be.true;
        expect(urlSpy.firstCall.args[4]).to.be.an.instanceOf(Object);
      });

  });

  describe('when I update metadata of geofence', () => {
    it('should fetch with right parameters', () => {
      const data = { key: 'value' };
      const getCall = metadata.geofenceUpdate('geofenceId', data, { token: 'abc' });

      return getCall
        .then(() => {
          expect(thisFetch.firstCall.args[1]).to.eql({
            method: 'put',
            headers: new Headers({
              'Authorization': 'Bearer abc',
              'Content-Type': 'application/json'
            }),
            body: JSON.stringify(data)
          });
        });
    });
  });

  describe('when I update metadata property of geofence', () => {
    it('should fetch with right parameters', () => {
      const getCall = metadata.geofenceSetValue('geofenceId', 'key', 'updated value', { token: 'abc' });

      return getCall
        .then(() => {
          expect(thisFetch.firstCall.args[1]).to.eql({
            method: 'put',
            headers: new Headers({
              'Authorization': 'Bearer abc',
              'Content-Type': 'application/json'
            }),
            body: JSON.stringify({ key: 'updated value' })
          });
        });
    });
  });

  describe('when I remove metadata property of geofence', () => {
    it('should fetch with right parameters', () => {
      const getCall = metadata.geofenceDeleteKey('geofenceId', 'key', { token: 'abc' });

      return getCall
        .then(() => {
          expect(thisFetch.firstCall.args[1]).to.eql({
            method: 'put',
            headers: new Headers({
              'Authorization': 'Bearer abc',
              'Content-Type': 'application/json'
            }),
            body: JSON.stringify({ key: null })
          });
        });
    });
  });
});
