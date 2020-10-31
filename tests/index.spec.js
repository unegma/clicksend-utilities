const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);
require('dotenv').config();
const nock = require('nock');
const { ClickSendUtilities, SMSUtilities } = require('../lib');
const ClickSendIntegrationError = require('../lib/errors/ClickSendIntegrationError');

describe('ClickSend Utilities Test', () => {
  let cSUtilities; let smsUtilities;
  beforeEach(function() {
    cSUtilities = new ClickSendUtilities(process.env.CLICKSEND_USER, process.env.CLICKSEND_API_KEY, process.env.SLACK_ERROR_LOG);
    smsUtilities = new SMSUtilities(process.env.CLICKSEND_USER, process.env.CLICKSEND_API_KEY, process.env.SLACK_ERROR_LOG);
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

  // live test (will get real account)
  it('should get my account', async () => {
    let result = await cSUtilities.getFromCS('/account');
    expect(result.data).to.include.keys('username');
  });

  // live test using test account mobile number +61411111111
  it('should send a message to test account', async () => {
    let result = await smsUtilities.sendSMS('+61411111111', 'Hello');
    expect(result['response_msg']).to.equal('Messages queued for delivery.');
  });

});
