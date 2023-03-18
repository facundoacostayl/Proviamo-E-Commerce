const { google } = require("googleapis");
require("dotenv").config();

const oAuth2Client = new google.auth.OAuth2(
  process.env.ID_OAUTH2CLIENT_1,
  process.env.ID_OAUTH2CLIENT_2,
  process.env.ID_OAUTH2CLIENT_3
);

oAuth2Client.setCredentials({
  access_token: process.env.ACCESS_TOKEN_OAUTH2,
  refresh_token: process.env.REFRESH_TOKEN_OAUTH2,
  scope: "https://www.googleapis.com/auth/spreadsheets",
  token_type: "Bearer",
  expiry_date: 1641929044877,
});

const sheets = google.sheets({ version: "v4", auth: oAuth2Client });

module.exports = { oAuth2Client, sheets };
