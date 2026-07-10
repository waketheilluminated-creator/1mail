window.ONE_MAIL_CONFIG = {
  gmail: {
    // Create an iOS OAuth client in Google Cloud with bundle ID:
    // com.onemail.prototype
    clientId: "1023973653204-cpkqmm0ln39lpbhck0n1rnu95krgss4a.apps.googleusercontent.com",
    redirectUri: "com.googleusercontent.apps.1023973653204-cpkqmm0ln39lpbhck0n1rnu95krgss4a:/oauth2redirect",
    // Optional: create a Web OAuth client for localhost browser testing.
    // Add http://localhost:4175 to Authorized JavaScript origins in Google Cloud.
    webClientId: "1023973653204-rurfsullarhm55iaogj1vo7ltbnsoofu.apps.googleusercontent.com",
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
