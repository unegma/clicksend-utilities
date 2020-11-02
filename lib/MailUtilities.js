const ClickSendUtilities = require('./ClickSendUtilities');

/**
 * Mail Utilities
 */
class MailUtilities extends ClickSendUtilities {

  /**
   * Mail Utilities
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
   * Send Letter
   * If using a doc file, this will need to be converted (see here: https://developers.clicksend.com/docs/rest/v3/?shell#send-letter)
   *
   * @param to
   * @param message
   * @param from
   * @param source
   * @param customString
   * @returns {Promise<*>}
   */
  sendLetter = async function (to, message, from, source, customString = "") {
    // todo add try?
    console.log(`${this._errorLogPrefix}Beginning sendLetter`);
    const response = await this.postToCS('/post/letters/send', {
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
    console.log(`${this._errorLogPrefix}Finishing sendLetter`);
    return response;
  }

}

module.exports = MailUtilities;
