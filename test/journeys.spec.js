import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import Tracking from '../lib/HERETracking.js';

const mockTracking = new Tracking('abc', 'xyz');
mockTracking.environment = 'production';

import sinon from 'sinon';
require('sinon-as-promised');

import Transitions from '../src/transitions.js';

function url(varArgs) {
  const args = [].slice.call(arguments);
  const queryParams = {};

  if (typeof args[args.length - 1] === 'object') {
    const params = args.pop();

    for (let key in params) {
      queryParams[key] = params[key];
    }
  }

  let pathname = '/' + args.join('/');

  if (pathname.match(/^\/\//)) {
    pathname = pathname.substr(1);
  }

  return 'dummyUrl' + pathname + '?' + serialize(queryParams);
}

function serialize(obj) {
  const str = [];

  Object.keys(obj).forEach(key => {
    str.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
  });

  return str.join('&');
}

let thisFetch;

function handleErrorsMock(response) {
  if (!response.ok) {
    return Promise.reject(response);
  }
  return response;
}

chai.expect();
chai.use(chaiAsPromised);

const expect = chai.expect;

let transition;

global.Headers = global.Headers || function(headers) { return headers; };
let headersSpy;

/** @test {Transition} */
describe('Given an instance of the transition module', function () {
  before(function() {
    headersSpy = sinon.spy(global, 'Headers');
  });

  beforeEach(function () {
    thisFetch = sinon.stub().resolves({
      ok: true,
      json: () => {}
    });

    transition = new Transitions({
      url: url,
      handleErrors: handleErrorsMock,
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
      expect(transition.url).to.be.an.instanceof(Function);
    });
  });
  describe('when I get transitions', function () {
    it('should reject if no user token supplied', () => {
      const getCall = transition.get(123, {}, {});

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
    it('should reject if no device account ID supplied', () => {
      const getCall = transition.get('', {}, {token: 'abc'});

      return getCall
        .then(() => {
          expect(true).to.equal(false, 'getCall should reject');
        })
        .catch(e => {
          expect(e).to.be.an.instanceOf(Array)
            .and.to.have.lengthOf(1);
          expect(e[0]).to.be.an.instanceOf(Error)
            .and.have.property('message', 'No tracking ID specified');
        });
    });
    it('should resolve if token and account ID are supplied', () => {
      const getCall = transition.get('xyz', {}, { token: 'abc' });

      expect(getCall).to.be.fulfilled;
    });
    it('should call fetch if token and account ID are supplied', () => {
      return transition.get(123, { after: 1505212812104 }, { token: 123 })
        .then(transition => {
          sinon.assert.calledOnce(thisFetch);
          sinon.assert.calledWith(thisFetch, 'dummyUrl/transitions/v2/devices/123?after=1505212812104');
        });
    });
    it('should call fetch with last url param if last option is supplied', () => {
      return transition.get('xyz', { last: 5 }, { token: 'abc' })
        .then(transition => {
          sinon.assert.calledOnce(thisFetch);

          sinon.assert.calledWith(thisFetch, 'dummyUrl/transitions/v2/devices/xyz?last=5');
        });

    });
    it('should call fetch with before url param if before option is supplied', () => {
      return transition.get('xyz', { before: 5 }, { token: 'abc' })
        .then(transition => {
          sinon.assert.calledOnce(thisFetch);
          sinon.assert.calledWith(thisFetch, 'dummyUrl/transitions/v2/devices/xyz?before=5');
        });
    });
  });
});
