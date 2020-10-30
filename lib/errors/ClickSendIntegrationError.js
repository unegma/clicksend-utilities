class ClickSendIntegrationError extends Error {
  constructor (message) {
    super(message);
    this.name = 'ClickSendIntegrationError';
  }
}

module.exports = ClickSendIntegrationError;
