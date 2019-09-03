import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import Tracking from '../lib/HERETracking.js';

const mockTracking = new Tracking('abc', 'xyz');

mockTracking.environment = 'production';

import sinon from 'sinon';
require('sinon-as-promised');

import Traces from '../src/traces.js';

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

function handleErrorsMock(response) {
  if (!response.ok) {
    return Promise.reject(response);
  }
  return response;
}

const mockTransition = {
  get: sinon.stub().resolves(1)
};

chai.expect();
chai.use(chaiAsPromised);

const expect = chai.expect;

let trace;
let thisFetch;

global.Headers = global.Headers || function(headers) { return headers; };
let headersSpy;

/** @test {Trace} */
describe('Given an instance of the trace module', function() {
  before(function() {
    headersSpy = sinon.spy(global, 'Headers');
  });

  beforeEach(function() {
    thisFetch = sinon.stub().resolves({
      ok: true,
      json: function() {}
    });

    trace = new Traces({
      url: url,
      handleErrors: handleErrorsMock,
      validate: Tracking.validate.bind(mockTracking),
      fetch: thisFetch
    }, mockTransition);
  });

  afterEach(function() {
    headersSpy.reset();
  });

  after(function() {
    headersSpy.restore();
  });

  describe('when I want to use the URL utility', function() {
    it('should have a reference to it', () => {
      expect(trace.url).to.be.an.instanceof(Function);
    });
  });
  describe('when I get traces', function() {
    it('should reject if no user token supplied', () => {
      const getCall = trace.get(123, {}, {});

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
      const getCall = trace.get('', {}, { token: 'abc' });

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
      const getCall = trace.get(123, {}, { token: 'abc' });

      expect(getCall).to.be.fulfilled;
    });
    it('should call fetch if token and tracking ID are supplied', () => {
      return trace.get('123', { after: 1505212812104 }, { token: 123 })
        .then(trace => {
          sinon.assert.calledOnce(thisFetch);

          sinon.assert.calledWith(thisFetch, 'dummyUrl/traces/v2/123?after=1505212812104');
        });
    });
    it('should call fetch with last url param if last option is supplied', () => {
      return trace.get('xyz', { last: 5 }, { token: 'abc' })
        .then(trace => {
          sinon.assert.calledOnce(thisFetch);

          sinon.assert.calledWith(thisFetch, 'dummyUrl/traces/v2/xyz?last=5');
        });

    });
    it('should call fetch with before url param if before option is supplied', () => {
      return trace.get('xyz', { before: 5 }, { token: 'abc' })
        .then(trace => {
          sinon.assert.calledOnce(thisFetch);
          sinon.assert.calledWith(thisFetch, 'dummyUrl/traces/v2/xyz?before=5');
        });
    });
  });
  describe('when I remove traces', function() {
    it('should reject when no thing id present', function() {
      expect(trace.remove({ token: 'blaa' }, {})).to.be.rejected;
    });

    it('should reject when no token present', function() {
      expect(trace.remove({}, { thingId: 'blaaa' })).to.be.rejected;
    });

    it('should call fetch if token and id are present', function() {
      return trace.remove('xyz', {
          token: 'abc'
        })
        .then(trace => {
          sinon.assert.calledOnce(thisFetch);
          sinon.assert.calledWith(thisFetch, 'dummyUrl/traces/v2/xyz?');
        });
    });
  });
});