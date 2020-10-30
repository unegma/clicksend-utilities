# ClickSend Utilities
Utility functions for interacting with ClickSend APIs

## Usage

`npm install @unegma/clicksend-utilities --save`

```
const {
  CLICKSEND_API_KEY,
  CLICKSEND_USERNAME,
  SLACK_ERROR_LOG // optional
} = process.env;
const { ClickSendUtilities } = require('@unegma/clicksend-utilities');
const cSLib = new ClickSendUtilities(CLICKSEND_USERNAME, CLICKSEND_API_KEY, SLACK_ERROR_LOG); // with optional slack logging

...
// get stuff
cSLib.getStuff();
```

