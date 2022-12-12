const express = require('express');
require('dotenv').config();
const cors = require('cors');
const port = process.env.PORT || 3001;
const {router} = require('./routes');
const app = express();

app.use(express.json());
app.use(cors());
app.use("/api", router);

module.exports = {app, port};