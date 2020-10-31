const ClickSendUtilities = require('./ClickSendUtilities');

/**
 * SMS Utilities
 */
class SMSUtilities extends ClickSendUtilities {

  /**
   * SMS Utilities
   *
   * @param clickSendUser
   * @param clickSendApiKey
   * @param errorLogUrl
   * @param errorLogPrefix
   */
  constructor(clickSendUser, clickSendApiKey, errorLogUrl, errorLogPrefix) {
    super(clickSendUser, clickSendApiKey, errorLogUrl, errorLogPrefix);
  }

  /**
   * Send SMS
   *
   * @param to
   * @param message
   * @param from
   * @param source
   * @param customString
   * @returns {Promise<*>}
   */
  sendSMS = async function (to, message, from, source, customString = "") {
    // todo add try?
    console.log(`${this._errorLogPrefix}Beginning sendSMS`);
    const response = await this.postToCS('/sms/send', {
      messages: [
        {
          to: to,
          body: message,
          from: from, // todo maybe add this on conditionally if not empty
          source: source // todo maybe add this on conditionally if not empty
        }
      ]
    });
    // if (typeof response === 'undefined') {
    //   throw new Error(`Failed ${clientId}`);
    // }
    console.log(`${this._errorLogPrefix}Finishing sendSMS`);
    return response;
  }

}

module.exports = SMSUtilities;
