const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);
require('dotenv').config();
const nock = require('nock');
const ClickSendUtilities = require('../lib/ClickSendUtilities');
const ClickSendIntegrationError = require('../lib/errors/ClickSendIntegrationError');

describe('ClickSend Utilities Test', () => {
  let cSUtilities;
  beforeEach(function() {
    cSUtilities = new ClickSendUtilities(process.env.CLICKSEND_USER, process.env.CLICKSEND_API_KEY, process.env.SLACK_ERROR_LOG);
  });

  afterEach(function() {
  });

  it('should create an instance of ClickSendUtilities', () => {
    expect(cSUtilities).to.be.instanceOf(ClickSendUtilities);
    expect(() => {
      cSUtilities.throwError('Message')
    }).to.throw(ClickSendIntegrationError);
  });

  it('should create an instance of a ClickSendIntegrationError', () => {
    const error = new ClickSendIntegrationError('Error');
    expect(error.message).to.equal('Error');
  });

  // live test
  it('should get my account', async () => {
    let result = await cSUtilities.getFromCS('/account');
    expect(result.data).to.include.keys('username');
  });

});
