const express = require("express");
const {
  handleAllColor: allColor,
} = require("../../../controllers/frontend/colorController");
const apiPostRequestValidation = require("../../../middleware/backend/apiPostRequestValidation");
const apiGetRequestValidation = require("../../../middleware/backend/apiGetRequestValidation");

const _ = express.Router();

_.get("/all", apiGetRequestValidation, allColor);

module.exports = _;
