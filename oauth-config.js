window.ONE_MAIL_CONFIG = {
  gmail: {
    // Create an iOS OAuth client in Google Cloud with bundle ID:
    // com.onemail.prototype
    clientId: "1023973653204-cpkqmm0ln39lpbhck0n1rnu95krgss4a.apps.googleusercontent.com",
    redirectUri: "com.googleusercontent.apps.1023973653204-cpkqmm0ln39lpbhck0n1rnu95krgss4a:/oauth2redirect",
    scopes: [
      "https://www.googleapis.com/auth/gmail.modify"
    ]
  },
  aiParser: {
    enabled: true,
    endpoint: "http://10.0.0.186:8787/api/classify-emails",
    maxMessages: 30,
    minConfidence: 0.72
  }
};
