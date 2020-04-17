import chai from 'chai';
import sinon from 'sinon';
import chaiAsPromised from 'chai-as-promised';
import Geofences from '../src/geofences.js';

import Tracking from '../lib/HERETracking.js';
const mockTracking = new Tracking('abc', 'xyz');

mockTracking.environment = 'production';
require('sinon-as-promised');

chai.expect();
chai.use(chaiAsPromised);

const expect = chai.expect;

let geofences;
let thisFetch;

global.Headers = global.Headers || function(headers) { return headers; };
let headersSpy;

/** @test {Geofence} */
describe('Given an instance of the geofence module', function () {
  before(function () {
    headersSpy = sinon.spy(global, 'Headers');
  });

  beforeEach(function () {
    thisFetch = sinon.stub().resolves({shadow: 'mock'});
    geofences = new Geofences({
      url: () => 'mockUrl',
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
      expect(geofences.url).to.be.an.instanceof(Function);
    });
  });

  describe('when I get all geofences', () => {
    it('should reject options without token', () => {
      geofences.list({ count: 100, pageToken: 1 })
        .then(() => {
          expect(true).to.equal(false);
        })
        .catch(e => {
          expect(e[0]).to.be.an.instanceOf(Error)
            .and.have.property('message', 'No token supplied');
        });
    });

    it('should call the geofences service', () => {
      thisFetch = sinon.stub().resolves([{id: 'fence1'}, {id: 'fence2'}]);
      geofences = new Geofences({
        url: () => 'mockUrl',
        validate: Tracking.validate.bind(mockTracking),
        fetch: thisFetch
      });
      return geofences.list({ count: 100, pageToken: 1, token: 123 })
        .then(() => {
          sinon.assert.calledOnce(thisFetch);

          sinon.assert.calledWith(thisFetch, 'mockUrl', {
            credentials: 'include',
            headers: new Headers({
              'Authorization': 'Bearer 123'
            })
          });
        });
    });
  });

  describe('when I get the geofence', function () {
    it('should reject options without token', () => {
      const getCall = geofences.get('xyz', {});

      getCall
        .then(() => {
          expect(true).to.equal(false);
        })
        .catch(e => {
          expect(e).to.be.an.instanceOf(Array)
            .and.to.have.lengthOf(1);
          expect(e[0]).to.be.an.instanceOf(Error)
            .and.have.property('message', 'No token supplied');
        });
    });

    it('should reject a call without thing account', () => {
      const getCall = geofences.get(null, {token: 123});

      getCall
        .then(() => {
          expect(true).to.equal(false);
        })
        .catch(e => {
          expect(e).to.be.an.instanceof(Array)
            .and.to.have.lengthOf(1);
          expect(e[0]).to.be.an.instanceof(Error)
            .and.have.property('message', 'No geofence ID specified');
        });
    });

    it('should allow options with thing account', () => {
      const getCall = geofences.get('geofenceId', {token: 123});

      expect(getCall).to.eventually.deep.equal({shadow: 'mock'});
    });

    it('should call the geofences service', () => {
      thisFetch = sinon.stub().resolves([{id: 'fence1'}, {id: 'fence2'}]);
      geofences = new Geofences({
        url: () => 'mockUrl',
        validate: Tracking.validate.bind(mockTracking),
        fetch: thisFetch
      });
      return geofences.get('geofenceId', {token: 123})
        .then(geofence => {
          sinon.assert.calledOnce(thisFetch);

          sinon.assert.calledWith(thisFetch, 'mockUrl', {
            credentials: 'include',
            headers: new Headers({
              'Authorization': 'Bearer 123'
            })
          });
        });
    });
  });

  describe('when I create the geofence', function () {
    it('should call the geofence create service', () => {
      thisFetch = sinon.stub().resolves({message: 'created'});
      geofences = new Geofences({
        url: () => 'mockUrl',
        validate: Tracking.validate.bind(mockTracking),
        fetch: thisFetch
      });
      return geofences.create({type: 'mock', definition: 'test'}, {token: 123, thingAccountId: 123})
        .then(geofence => {
          sinon.assert.calledOnce(thisFetch);

          sinon.assert.calledWith(thisFetch, 'mockUrl', {
            method: 'post',
            headers: new Headers({
              'Authorization': 'Bearer 123',
              'Content-Type': 'application/json'
            }),
            body: JSON.stringify({type: 'mock', definition: 'test'})
          });
        });
    });
    it('should handle error when missing request "type" parameter', () => {
      geofences = new Geofences({
        url: () => 'mockUrl',
        validate: Tracking.validate.bind(mockTracking),
        fetch: thisFetch
      });
      return geofences.create({definition: 'test'}, {token: 123, thingAccountId: 123})
        .then(geofence => {
        })
        .catch(e => {
          expect(e).to.be.an.instanceof(Error)
            .and.have.property('message', 'No geofence type specified');
        });
    });
    it('should handle error when missing request "definition" parameter', () => {
      geofences = new Geofences({
        url: () => 'mockUrl',
        validate: Tracking.validate.bind(mockTracking),
        fetch: thisFetch
      });
      return geofences.create({type: 'mock'}, {token: 123, thingAccountId: 123})
        .then(geofence => {
          expect(true).to.equal(false);
        })
        .catch(e => {
          expect(e).to.be.an.instanceof(Error)
            .and.have.property('message', 'No geofence shape definition specified');
        });
    });
    it('should handle request errors', () => {
      thisFetch = sinon.stub().rejects('Bad Request');
      geofences = new Geofences({
        url: () => 'mockUrl',
        validate: Tracking.validate.bind(mockTracking),
        fetch: thisFetch
      });

      return geofences.get('trackingId', {token: 123})
        .then(geofence => {
          sinon.assert.fail();
        })
        .catch(errorResponse => {
          expect(errorResponse).to.be.an.instanceOf(Error).and.have.property('message', 'Bad Request');
        });
    });
  });

  describe('when I remove the geofence', function () {
    it('should call the geofence remove service', () => {
      thisFetch = sinon.stub().resolves({ ok: true });

      geofences = new Geofences({
        url: () => 'mockUrl',
        validate: Tracking.validate.bind(mockTracking),
        fetch: thisFetch
      });

      return geofences.remove('abc456', { token: 123 }).then(() => {
        sinon.assert.calledOnce(thisFetch);

        sinon.assert.calledWith(thisFetch, 'mockUrl', {
          method: 'delete',
          headers: new Headers({
            'Authorization': 'Bearer 123'
          })
        });
      });
    });
    it('should NOT call the geofence remove service when geofence ID is missing', () => {
      return geofences.remove(null, { token: 123 }, {})
        .catch((e) => {
          expect(e).to.be.an.instanceof(Array)
            .and.to.have.lengthOf(1);
          expect(e[0]).to.be.an.instanceof(Error)
            .and.have.property('message', 'No geofence ID specified');
        });
    });
  });
  describe('when I update the geofence', function () {
    it('should call the geofence update service', () => {
      thisFetch = sinon.stub().resolves({ok: true, json: () => {return {message: 'updated'};}});
      geofences = new Geofences({
        url: () => 'mockUrl',
        validate: Tracking.validate.bind(mockTracking),
        fetch: thisFetch
      });
      return geofences.update({id: 123, type: 'mock', definition: 'test'}, { token: '123' })
        .then(geofence => {
          sinon.assert.calledOnce(thisFetch);

          sinon.assert.calledWith(thisFetch, 'mockUrl', {
            method: 'put',
            headers: new Headers({
              'Authorization': 'Bearer 123',
              'Content-Type': 'application/json'
            }),
            body: JSON.stringify({type: 'mock', definition: 'test'})
          });
        });
    });
    it('should return an error if the fence definition is empty', () => {
      thisFetch = sinon.stub().resolves({ok: false, statusText: 'Bad Request'});
      geofences = new Geofences({
        url: () => 'mockUrl',
        validate: Tracking.validate.bind(mockTracking),
        fetch: thisFetch
      });
      return geofences.update({}, {token: 123, thingAccountId: 123})
        .then(geofence => {
          sinon.assert.fail();
        })
        .catch(error => {
          expect(error[0]).to.be.an('error');
          expect(error[0].message).to.equal('Required parameter missing: id');
        });
    });
  });

  describe('when I add a device to a geofence', () => {
    it('should call the add device to geofence service', () => {
      thisFetch = sinon.stub().resolves({ ok: true });
      geofences = new Geofences({
        url: () => 'mockUrl',
        validate: Tracking.validate.bind(mockTracking),
        fetch: thisFetch
      });

      return geofences.addDevice(456, 789, { token: 123 }).then(() => {
        sinon.assert.calledOnce(thisFetch);

        sinon.assert.calledWith(thisFetch, 'mockUrl', {
          method: 'put',
          headers: new Headers({
            'Authorization': 'Bearer 123',
            'Content-Type': 'application/json'
          })
        });
      });
    });
    it('should NOT call add device to geofence service when fence ID is missing', () => {
      return geofences.addDevice('', 789, { token: 123 })
        .catch((e) => {
          expect(e).to.be.an.instanceof(Array)
            .and.to.have.lengthOf(1);
          expect(e[0]).to.be.an.instanceof(Error)
            .and.have.property('message', 'No geofence ID specified');
        });
    });
    it('should NOT call add device to geofence service when thing account ID is missing', () => {
      return geofences.addDevice(456, '', { token: 123 })
        .catch((e) => {
          expect(e).to.be.an.instanceof(Array)
            .and.to.have.lengthOf(1);
          expect(e[0]).to.be.an.instanceof(Error)
            .and.have.property('message', 'No tracking ID specified');
        });
    });
  });

  describe('when I get devices associated with a geofence', () => {
    it('should call the geofence getDevices service', () => {
      thisFetch = sinon.stub().resolves([{id: 'device1'}, {id: 'device2'}]);
      geofences = new Geofences({
        url: () => 'mockUrl',
        validate: Tracking.validate.bind(mockTracking),
        fetch: thisFetch
      });
      return geofences.getDevices('geofenceId', {token: 123, count: 100, pageToken: 1})
        .then(() => {
          sinon.assert.calledOnce(thisFetch);

          sinon.assert.calledWith(thisFetch, 'mockUrl', {
            credentials: 'include',
            headers: new Headers({
              'Authorization': 'Bearer 123'
            })
          });
        });
    });
  });
});
