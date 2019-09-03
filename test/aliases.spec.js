import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import sinon from 'sinon';
require('sinon-as-promised');

import Aliases from '../src/aliases.js';
import Tracking from '../lib/HERETracking.js';

const mockTracking = new Tracking('abc', 'xyz');

mockTracking.environment = 'production';

chai.expect();
chai.use(chaiAsPromised);

const expect = chai.expect;

global.Headers = global.Headers || function(headers) { return headers; };

let aliases;
let thisFetch;
let headersSpy;
let urlSpy;

/** @test {Aliases} */
describe('Given an instance of the aliases module', function () {
  before(() => {
    headersSpy = sinon.spy(global, 'Headers');
    urlSpy = sinon.stub().resolves({});
  });

  beforeEach(() => {
    thisFetch = sinon.stub().resolves({});

    aliases = new Aliases({
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
      expect(aliases.url).to.be.an.instanceof(Function);
    });
  });

  describe('when I want to use the ID normalisation utility', function () {
    it('should have a reference to it', () => {
      expect(aliases.normaliseId).to.be.an.instanceof(Function);
    });
  });

  describe('when I get aliases', function () {
    it('should reject if no user token supplied', () => {
      const getCall = aliases.get(123, {});

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
    const getCall = aliases.get(123, { token: 'abc' });

    expect(getCall).to.be.fulfilled;
  });

  it('should attempt to normalise the ID', () => {
    const getCall = aliases.get(123, { token: 'abc' });

    return getCall
      .then(() => {
        expect(urlSpy.called).to.be.true;
        expect(urlSpy.firstCall.args[3]).to.be.an.instanceOf(Object);
      });

  });
});
