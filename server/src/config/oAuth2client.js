const { google } = require('googleapis');
require('dotenv').config();

const oAuth2Client = new google.auth.OAuth2(
    "642074610154-9kqiofje4quqrbslusmubjusnjo2dro2.apps.googleusercontent.com",
    "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",
    "urn:ietf:wg:oauth:2.0:oob"
);

oAuth2Client.setCredentials({
    access_token:
    "ya29.a0ARrdaM_EM_niCJQ3U62J-15KQWIue9IsA4pQztPkPl_go1xDhxUVZQpjMngHfGUQmtPSK7z32xFZYpT6WAxgU5N2QWJevON979IxZZRp3Nwp2OCDBmF7jb4WWl5qp28Z3qiveCRVioRp3px_TusfNI_8omLr",
    refresh_token:
    "1//0hc_kJL1tV92gCgYIARAAGBESNwF-L9IrphAB_mkC1Wj5R_uYd6ZaepJ4iVFjnxCkpyHdIa68-Q89QvsDkh74tzoxgbRxncAZCvo",
    scope: "https://www.googleapis.com/auth/spreadsheets",
    token_type: "Bearer",
    expiry_date: 1641929044877,
});

const sheets = google.sheets({ version: 'v4', auth: oAuth2Client });

module.exports = {oAuth2Client, sheets};