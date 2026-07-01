window.ONE_MAIL_CONFIG = {
  gmail: {
    // Create an iOS OAuth client in Google Cloud with bundle ID:
    // com.onemail.prototype
    clientId: "PASTE_IOS_CLIENT_ID.apps.googleusercontent.com",
    redirectUri: "com.googleusercontent.apps.PASTE_IOS_CLIENT_ID:/oauth2redirect",
    scopes: [
      "https://www.googleapis.com/auth/gmail.readonly"
    ]
  }
};
