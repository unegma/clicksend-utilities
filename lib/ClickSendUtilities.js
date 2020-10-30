const CLICKSEND_API_URL = 'https://rest.clicksend.com/v3';
const fetch = require('node-fetch');
const { ErrorHandler } = require('@unegma/error-handler');
const { SlackErrorHandler } = require('@unegma/error-handler');
const { ClickSendIntegrationError } = require('./errors');

/**
 * Base Utilities Class
 */
class ClickSendUtilities {

  /**
   * Base Utilities
   *
   * errorLogPrefix will prefix the start and end of function console logs
   *
   * @param clickSendUser
   * @param clickSendApiKey
   * @param errorLogUrl
   * @param errorLogPrefix
   */
  constructor(clickSendUser, clickSendApiKey, errorLogUrl = "", errorLogPrefix = "## ") {
    this._clickSendUser = clickSendUser;
    this._clickSendApiKey = clickSendApiKey;
    this._errorLogUrl = errorLogUrl;
    this._errorLogPrefix = errorLogPrefix;

    // error logging
    if (this._errorLogUrl.includes('slack')) {
      this._errorHandler = new SlackErrorHandler(this._errorLogUrl);
    } else {
      this._errorHandler = new ErrorHandler();
    }
  }

  getHeaders = () => {
    return {
      "Authorization": `Basic ${new Buffer(this._clickSendUser).toString('base64')}:${new Buffer(this._clickSendApiKey).toString('base64')}`,
      "Content-Type": "application/json",
      "Accept": "application/json, text/plain, */*"
    };
  }

  /**
   * API FUNCTIONS
   */

  /**
   * Low level GET from CS
   *
   * @param path
   * @param absolute
   * @returns {Promise<*>}
   */
  getFromCS = async (path, absolute = false) => {
    console.log(`${this._errorLogPrefix}Beginning getFromCS with path: ${path}`);
    try {
      let response;
      let url;
      if (absolute === false) {
        url = `${CLICKSEND_API_URL}${path}`;
      } else {
        url = path;
      }
      const params = {
        method: "get",
        headers: this.getHeaders()
      };

      response = await fetch(url, params);
      if (response.ok) {
        console.log(`${this._errorLogPrefix}Finished getFromCS with Response: ${response.status}, ${response.statusText}`);
        return response.json();
      } else {
        throw new ClickSendIntegrationError(await response.text());
      }
    } catch (error) {
      await this._errorHandler.handleError('getFromCS', 'Error communicating with CS.', error);
      throw new ClickSendIntegrationError(error.message);
    }
  }

  /**
   * Do POST request to CS
   *
   * @param path
   * @param data
   * @param absolute
   * @returns {Promise<*>}
   */
  postToCS = async (path, data, absolute = false) => {
    console.log(`${this._errorLogPrefix}Beginning postToCS with path: ${path}`);
    try {
      let response;
      let url;

      if (absolute === false) {
        url = `${CLICKSEND_API_URL}${path}`;
      } else {
        url = path;
      }

      const params = {
        method: "post",
        headers: this.getHeaders(),
        body: JSON.stringify(data)
      };

      response = await fetch(url, params); // cant console log here, uses up the stream? await csPostResponse.json()
      if (response.ok) {
        console.log(`${this._errorLogPrefix}Finished postToCS with Response: ${response.status}, ${response.statusText}`);
        return response.json();
      } else {
        throw new ClickSendIntegrationError(await response.text());
      }
    } catch (error) {
      await this._errorHandler.handleError('postToCS', 'ClickSend Integration Error', error);
      throw new ClickSendIntegrationError(error.message);
    }
  }

  /**
   * Do PUT request to CS
   *
   * @param path
   * @param data
   * @param absolute
   * @returns {Promise<*>}
   */
  putToCS = async (path, data, absolute = false) => {
    console.log(`${this._errorLogPrefix}Beginning putToCS with path: ${path}`);
    try {
      let response;
      let url;

      if (absolute === false) {
        url = `${CLICKSEND_API_URL}${path}`;
      } else {
        url = path;
      }

      const params = {
        method: "put",
        headers: this.getHeaders(),
        body: JSON.stringify(data)
      };

      response = await fetch(url, params); // cant console log here, uses up the stream? await csPostResponse.json()
      if (response.ok) {
        console.log(`${this._errorLogPrefix}Finished putToCS with Response: ${response.status}, ${response.statusText}`);
        return response.json();
      } else {
        throw new ClickSendIntegrationError(await response.text());
      }
    } catch (error) {
      await this._errorHandler.handleError('putToCS', 'Error communicating with CS.', error);
      throw new ClickSendIntegrationError(error.message);
    }
  }

  /**
   * Low level function for getting all of a type from ClickSend
   * Optionally use the page parameter to get a specific page (useful for debugging)
   *
   * @param type
   * @param page
   * @param pages
   * @returns {Promise<*[]>}
   */
  getAllFromCS = async (type, page, pages = 1) => {
    console.log(`${this._errorLogPrefix}Beginning getAllFromCS`);
    let data = [];
    let result;
    if (page) {
      let i = 0;
      page = (typeof page == 'number') ? page : 1;
      do {
        if (result && result.next) {
          result = await this.getFromCS(result.next, true);
        } else {
          result = await this.getFromCS(`/${type}/?page=${page}`);
        }
        data = data.concat(result.results);
        console.log(`Data length: ${data.length}`)
        i++;
      }
      while (i < pages);
    } else { // default, get ALL
      do {
        if (result && result.next) {
          result = await this.getFromCS(result.next, true);
        } else {
          result = await this.getFromCS(`/${type}/`);
        }
        data = data.concat(result.results);
        console.log(`Data length: ${data.length}`)
      }
      while (result.next);
    }
    console.log(`${this._errorLogPrefix}Finishing getAllFromCS`);
    return data;
  }

  /**
   * LOW LEVEL FUNCTIONS
   */

  // used for testing
  throwError() {
    throw new ClickSendIntegrationError();
  }

}

module.exports = ClickSendUtilities;
