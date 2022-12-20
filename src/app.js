const express = require('express');
require('dotenv').config();
const port = process.env.PORT || 3000;
const {router} = require('./routes');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", router);
app.use("/", express.static("frontend"));

module.exports = {app, port};