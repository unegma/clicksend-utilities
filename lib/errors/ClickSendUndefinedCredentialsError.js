class ClickSendUndefinedCredentialsError extends Error {
  constructor (message) {
    super(message);
    this.name = 'ClickSendUndefinedCredentialsError';
  }
}

module.exports = ClickSendUndefinedCredentialsError;
