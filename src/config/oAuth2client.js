const { google } = require('googleapis');
require('dotenv').config();

const oAuth2Client = new google.auth.OAuth2(
    "642074610154-9kqiofje4quqrbslusmubjusnjo2dro2.apps.googleusercontent.com",
    "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",
    "urn:ietf:wg:oauth:2.0:oob"
);

oAuth2Client.setCredentials({
    access_token:
        process.env.DB_ACCESS_TOKEN,
    refresh_token:
        process.env.DB_REFRESH_TOKEN,
    scope: "https://www.googleapis.com/auth/spreadsheets",
    token_type: "Bearer",
    expiry_date: 1641929044877,
});

const sheets = google.sheets({ version: 'v4', auth: oAuth2Client });

module.exports = {oAuth2Client, sheets};