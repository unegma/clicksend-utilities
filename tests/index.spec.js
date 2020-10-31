const SLACK_ERROR_LOG = 'https://example.com';
const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);
const nock = require('nock');
const ClickSendUtilities = require('../lib/ClickSendUtilities');
const ClickSendIntegrationError = require('../lib/errors/ClickSendIntegrationError');

describe('ClickSend Utilities Test', () => {
  beforeEach(function() {
  });

  afterEach(function() {
  });

  it('should create an instance of ClickSendUtilities', () => {
    const error = new ClickSendUtilities();
    expect(error.message).to.equal('Error');
  });

  it('should create an instance of a ClickSendIntegrationError', () => {
    const error = new ClickSendIntegrationError('Error');
    expect(error.message).to.equal('Error');
  });
});
