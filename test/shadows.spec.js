import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import Shadows from '../src/shadows.js';
import Tracking from '../lib/HERETracking.js';

const mockTracking = new Tracking('abc', 'xyz');
mockTracking.environment = 'production';

import sinon from 'sinon';
require('sinon-as-promised');

chai.expect();
chai.use(chaiAsPromised);

const expect = chai.expect;

let shadow;
let thisFetch;

global.Headers = global.Headers || function(headers) { return headers; };
let headersSpy;

function assertIsValidationError(error, message) {
  expect(error).to.be.an.instanceOf(Array)
    .and.to.have.lengthOf(1);
  expect(error[0]).to.be.an.instanceOf(Error)
    .and.have.property('message', message);
}

function assertIsHttpError(error, message) {
  expect(error).to.be.an.instanceOf(Error).and.have.property('message', message);
}

/** @test {Shadow} */
describe('Given an instance of the shadow module', function() {
  before(function() {
    headersSpy = sinon.spy(global, 'Headers');
  });

  beforeEach(function() {
    thisFetch = sinon.stub().resolves({ ok: true, json: () => { return { shadow: 'mock' }; } });

    shadow = new Shadows({
      url: mockTracking.url.bind(mockTracking),
      validate: Tracking.validate.bind(mockTracking),
      normaliseId: Tracking.normaliseId.bind(mockTracking),
      fetch: thisFetch
    });

  });
  afterEach(function () {
    headersSpy.reset();
  });

  after(function () {
    headersSpy.restore();
  });

  describe('when I want to use the URL utility', function() {
    it('should have a reference to it', () => {
      expect(shadow.url).to.be.an.instanceof(Function);
    });
  });
  describe('when I get the shadow', function() {
    it('should reject options without token', () => {
      const getCall = shadow.get(123, {});

      return getCall
        .then(() => {
          expect.fail('The call should reject');
        })
        .catch(e => {
          assertIsValidationError(e, 'No token supplied');
        });
    });
    it('should reject options without thing account', () => {
      const getCall = shadow.get('', { token: 123 });

      return getCall
        .then(() => {
          expect.fail('The call should reject');
        })
        .catch(e => {
          assertIsValidationError(e, 'No tracking ID or external ID/app ID object specified');
        });
    });
    it('should call the Shadows service', () => {
      return shadow.get(123, { token: 123 })
        .then(shadow => {
          sinon.assert.calledOnce(thisFetch);

          sinon.assert.calledWith(thisFetch, sinon.match('/shadows/v2/123'), {
            credentials: 'include',
            headers: new Headers({
              'Authorization': 'Bearer 123'
            })
          });
        });
    });
    it('should call the Shadows service with externalId', () => {
      return shadow.get({ appId: 'appId-1', externalId: 'externalId-1' }, { token: 123 })
        .then(() => {
          sinon.assert.calledWith(
            thisFetch,
            sinon.match('/shadows/v2/externalId-1?appId=appId-1'),
            sinon.match.any
          );
        });
    });
    it('should handle request errors', () => {
      thisFetch.rejects('Bad Request');
      return shadow.get(123, { token: 123 })
        .then(() => {
          expect.fail('The call should reject');
        })
        .catch(e => {
          assertIsHttpError(e, 'Bad Request');
        });
    });
  });
  describe('when I get shadows batch', () => {
    it('should call Shadows service', () => {
      return shadow.getBatch(['thingAccountId-1'], { token: 'token-1' })
        .then(() => {
          sinon.assert.calledWith(
            thisFetch,
            sinon.match('/shadows/v2/batch'),
            {
              method: 'post',
              credentials: 'include',
              headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer token-1'
              }),
              body: '["thingAccountId-1"]'
            }
          );
        });
    });
    it('should call Shadows service with after parameter', () => {
      const options = {
        token: 'token-1',
        after: Date.now()
      };
      return shadow.getBatch(['thingAccountId-1'], options)
        .then(() => {
          sinon.assert.calledWith(
            thisFetch,
            sinon.match(`/shadows/v2/batch?after=${options.after}`),
            sinon.match.any
          );
        });
    });
    it('should call the Shadows service with externalId', () => {
      return shadow.getBatch(['externalId-1'], { appId: 'appId-1', token: 123 })
        .then(() => {
          sinon.assert.calledWith(
            thisFetch,
            sinon.match('/shadows/v2/batch?appId=appId-1'),
            sinon.match({
              body: '["externalId-1"]'
            })
          );
        });
    });
    it('should reject with non-array as trackingIds', () => {
      return shadow.getBatch(1337, { token: 123 })
        .then(() => {
          expect.fail('The call should reject');
        })
        .catch((e) => {
          console.log(e);
          expect(e, 'reject error').to.equal('You must supply an array');
        });
    });
    it('should reject options without token', () => {
      const options = {};
      return shadow.getBatch(['thingAccountId-1'], options)
        .then(() => {
          expect.fail('The call should reject');
        })
        .catch((e) => {
          assertIsValidationError(e, 'No token supplied');
        });
    });
    it('should reject options without thingAccountIds', () => {
      const options = {
        token: 'token-1'
      };
      return shadow.getBatch(null, options)
        .then(() => {
          expect.fail('The call should reject');
        })
        .catch((e) => {
          assertIsValidationError(e, 'Required parameter missing: trackingIds');
        });
    });
    it('should succeed options with 100 thingAccountIds', () => {
      return shadow.getBatch(new Array(100).fill(1), { token: 'token-1' });
    });
    it('should reject options with more than 100 thingAccountIds', () => {
      return shadow.getBatch(new Array(101).fill(1), { token: 'token-1' })
        .then(() => {
          expect.fail('The call should reject');
        })
        .catch((err) => {
          expect(err, 'reject error').to.equal('Maximum batch size is 100');
        });
    });
  });
  describe('when I get desired shadow', function() {
    it('should call the Shadows service', () => {
      return shadow.getDesired(123, { token: 123 })
        .then(() => {
          sinon.assert.calledOnce(thisFetch);
          sinon.assert.calledWith(thisFetch, sinon.match('/shadows/v2/123/desired'), {
            credentials: 'include',
            headers: new Headers({
              'Authorization': 'Bearer 123'
            })
          });
        });
    });
    it('should call the Shadows service with externalId', () => {
      return shadow.getDesired({ appId: 'appId-1', externalId: 'externalId-1' }, { token: 123 })
        .then(() => {
          sinon.assert.calledWith(
            thisFetch,
            sinon.match('/shadows/v2/externalId-1/desired?appId=appId-1'),
            sinon.match.any
          );
        });
    });
    it('should call the Shadows service with selector', () => {
      return shadow.getDesired(123, { token: 123, selector: 'payload/color' })
        .then(() => {
          sinon.assert.calledWith(
            thisFetch,
            sinon.match('/shadows/v2/123/desired/payload/color'),
            sinon.match.any
          );
        });
    });
    it('should reject options without token', () => {
      return shadow.getDesired(123, {})
        .then(() => {
          expect.fail('The call should reject');
        })
        .catch(e => {
          assertIsValidationError(e, 'No token supplied');
        });
    });
    it('should reject options without thing account', () => {
      return shadow.getDesired('', { token: 123 })
        .then(() => {
          expect.fail('The call should reject');
        })
        .catch(e => {
          assertIsValidationError(e, 'No tracking ID or external ID/app ID object specified');
        });
    });
    it('should handle request errors', () => {
      thisFetch.rejects('Bad Request');
      return shadow.getDesired(123, { token: 123 })
        .then(() => {
          expect.fail('The call should reject');
        })
        .catch(e => {
          assertIsHttpError(e, 'Bad Request');
        });
    });
  });
  describe('when I get reported shadow', function() {
    it('should call the Shadows service', () => {
      return shadow.getReported(123, { token: 123 })
        .then(() => {
          sinon.assert.calledOnce(thisFetch);
          sinon.assert.calledWith(thisFetch, sinon.match('/shadows/v2/123/reported'), {
            credentials: 'include',
            headers: new Headers({
              'Authorization': 'Bearer 123'
            })
          });
        });
    });
    it('should call the Shadows service with externalId', () => {
      return shadow.getReported({ appId: 'appId-1', externalId: 'externalId-1' }, { token: 123 })
        .then(() => {
          sinon.assert.calledWith(
            thisFetch,
            sinon.match('/shadows/v2/externalId-1/reported?appId=appId-1'),
            sinon.match.any
          );
        });
    });
    it('should call the Shadows service with selector', () => {
      return shadow.getReported(123, { token: 123, selector: 'payload/color' })
        .then(() => {
          sinon.assert.calledWith(
            thisFetch,
            sinon.match('/shadows/v2/123/reported/payload/color'),
            sinon.match.any
          );
        });
    });
    it('should reject options without token', () => {
      return shadow.getReported(123, {})
        .then(() => {
          expect.fail('The call should reject');
        })
        .catch(e => {
          assertIsValidationError(e, 'No token supplied');
        });
    });
    it('should reject options without thing account', () => {
      return shadow.getReported('', { token: 123 })
        .then(() => {
          expect.fail('The call should reject');
        })
        .catch(e => {
          assertIsValidationError(e, 'No tracking ID or external ID/app ID object specified');
        });
    });
    it('should handle request errors', () => {
      thisFetch.rejects('Bad Request');
      return shadow.getReported(123, { token: 123 })
        .then(() => {
          expect.fail('The call should reject');
        })
        .catch(e => {
          assertIsHttpError(e, 'Bad Request');
        });
    });
  });
  describe('when I set desired shadow', function() {
    const desired = {
      payload: {
        color: 'GREEN'
      },
      system: {
        rate: {
          sendMs: 300000,
          sampleMs: 300000,
          distanceM: 0
        }
      }
    };

    it('should call the Shadows service', () => {
      return shadow.setDesired(123, desired, { token: 123 })
        .then(shadow => {
          sinon.assert.calledOnce(thisFetch);
          sinon.assert.calledWith(thisFetch, sinon.match('/shadows/v2/123'), {
            method: 'put',
            credentials: 'include',
            headers: new Headers({
              'Content-Type': 'application/json',
              'Authorization': 'Bearer 123'
            }),
            body: JSON.stringify({ desired })
          });
        });
    });
    it('should call the Shadows service with externalId', () => {
      return shadow.setDesired({ appId: 'appId-1', externalId: 'externalId-1' }, desired, { token: 123 })
        .then(() => {
          sinon.assert.calledWith(
            thisFetch,
            sinon.match('/shadows/v2/externalId-1?appId=appId-1'),
            sinon.match.any
          );
        });
    });
    it('should reject options without token', () => {
      return shadow.setDesired(123, desired, {})
        .then(() => {
          expect.fail('The call should reject');
        })
        .catch(e => {
          assertIsValidationError(e, 'No token supplied');
        });
    });
    it('should reject options without thing account', () => {
      return shadow.setDesired('', desired, { token: 123 })
        .then(() => {
          expect.fail('The call should reject');
        })
        .catch(e => {
          assertIsValidationError(e, 'No tracking ID or external ID/app ID object specified');
        });
    });
    it('should handle request errors', () => {
      thisFetch.rejects('Bad Request');
      return shadow.setDesired(123, desired, { token: 123 })
        .then(() => {
          expect.fail('The call should reject');
        })
        .catch(e => {
          assertIsHttpError(e, 'Bad Request');
        });
    });
  });
  describe('when I clear the shadow', function() {
    it('should call the Shadows service', () => {
      return shadow.clear(123, { token: 123 })
        .then(() => {
          sinon.assert.calledOnce(thisFetch);
          sinon.assert.calledWith(thisFetch, sinon.match('/shadows/v2/123'), {
            method: 'delete',
            credentials: 'include',
            headers: new Headers({
              'Authorization': 'Bearer 123'
            })
          });
        });
    });
    it('should call the Shadows service with externalId', () => {
      return shadow.clear({ appId: 'appId-1', externalId: 'externalId-1' }, { token: 123 })
        .then(() => {
          sinon.assert.calledWith(
            thisFetch,
            sinon.match('/shadows/v2/externalId-1?appId=appId-1'),
            sinon.match.any
          );
        });
    });
    it('should reject options without token', () => {
      return shadow.clear(123, {})
        .then(() => {
          expect.fail('The call should reject');
        })
        .catch(e => {
          assertIsValidationError(e, 'No token supplied');
        });
    });
    it('should reject options without thing account', () => {
      return shadow.clear('', { token: 123 })
        .then(() => {
          expect.fail('The call should reject');
        })
        .catch(e => {
          assertIsValidationError(e, 'No tracking ID or external ID/app ID object specified');
        });
    });
    it('should handle request errors', () => {
      thisFetch.rejects('Bad Request');
      return shadow.clear(123, { token: 123 })
        .then(() => {
          expect.fail('The call should reject');
        })
        .catch(e => {
          assertIsHttpError(e, 'Bad Request');
        });
    });
  });
});
