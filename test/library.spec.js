import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import HERETracking from '../src/index.js';
import config from '../package.json';

chai.expect();
chai.use(chaiAsPromised);

const expect = chai.expect;

let lib;

/** @test {HERETracking} */
describe('Given an instance of my library', function () {
  beforeEach(function () {
    lib = new HERETracking('testAppId', 'testAppCode');
  });
  describe('when I need to use it', function () {
    it('should have loaded the geofence helper', () => {
      expect(lib.geofences.get).to.be.an.instanceof(Function);
    });
    it('should have loaded the device helper', () => {
      expect(lib.devices.claim).to.be.an.instanceof(Function);
    });
    it('should have loaded the vendor helper', () => {
      expect(lib.vendor.requestBatch).to.be.an.instanceof(Function);
    });
    it('should have loaded the shadow helper', () => {
      expect(lib.shadows.setDesired).to.be.an.instanceof(Function);
    });
    it('should have loaded the trace helper', () => {
      expect(lib.traces.get).to.be.an.instanceof(Function);
    });
    it('should have loaded the transition helper', () => {
      expect(lib.transitions.get).to.be.an.instanceof(Function);
    });
    it('should have loaded the notification helper', () => {
      expect(lib.notifications.list).to.be.an.instanceof(Function);
    });
    it('should have loaded the users helper', () => {
      expect(lib.users.listDevices).to.be.an.instanceof(Function);
    });
  });
  describe('when I need the name', function () {
    it('should return the name', () => {
      expect(lib.name).to.be.equal(`HERETracking v${config.version}`);
    });
  });
  describe('when I set the environment', function () {
    describe('with a valid environment name', function () {
      it('should set the environment correctly ', () => {
        lib.environment = 'cit';
        expect(lib.environment).to.be.equal('cit');
      });
      it('should set the host correctly ', () => {
        lib.environment = 'cit';
        expect(lib.url('thing-http', 'v1', 'token')).to.be
          .equal('https://cit.tracking.api.here.com/thing-http/v1/token');
      });
    });
    describe('with an invalid environment name', function () {
      it('should leave the environment as default ', () => {
        lib.environment = 'cat';
        expect(lib.environment).to.be.equal('production');
      });
    });
  });
  describe('when I pass query parameters', function () {
    it('should include my query params', () => {
      lib.environment = 'cit';
      expect(lib.url('thing-http', 'v1', 'token', {'my': 'parameter'})).to.be
        .equal('https://cit.tracking.api.here.com/thing-http/v1/token?my=parameter');
    });
    it('should not include my empty query params', () => {
      lib.environment = 'cit';
      expect(lib.url('thing-http', 'v1', 'token', {})).to.be
        .equal('https://cit.tracking.api.here.com/thing-http/v1/token');
    });
  });
  describe('when I validate method parameter', function () {
    it('should cope when nothing is required', () => {
      const validationCall = HERETracking.validate({test: 'value'});

      expect(validationCall).to.eventually.equal(true);
    });
    it('should pass when I require a supplied value', () => {
      const validationCall = HERETracking.validate({test: 'value'}, ['test']);

      expect(validationCall).to.eventually.equal(true);
    });
    it('should pass when I provide more values than required', () => {
      const validationCall = HERETracking.validate({test: 'value', 'mock': 'duck'}, ['test']);

      expect(validationCall).to.eventually.equal(true);
    });
    it('should fail when I do not provide a required value', () => {
      const validationCall = HERETracking.validate({test: 'value'}, ['mock']);

      expect(validationCall).to.be.rejected;
      expect(validationCall).to.be.rejectedWith(['Required parameter missing: mock']);
    });
  });
});
