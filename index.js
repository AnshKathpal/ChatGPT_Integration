const mongoose = require("mongoose")
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT;


require("dotenv").config();
app.use(express.json());


