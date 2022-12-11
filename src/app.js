const express = require('express');
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(cors());

module.exports = {app, port};