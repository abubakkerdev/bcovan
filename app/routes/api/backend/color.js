const express = require("express");
const {
  handleAllColor: allColor,
  handleStoreColor: storeColor,
  handleDestroyColor: destroyColor,
} = require("../../../controllers/backend/colorController");
const apiPostRequestValidation = require("../../../middleware/backend/apiPostRequestValidation");
const apiGetRequestValidation = require("../../../middleware/backend/apiGetRequestValidation");

const _ = express.Router();

_.get("/all",  apiGetRequestValidation, allColor);
_.post("/store", apiPostRequestValidation, storeColor);

_.post(
  "/destroy",
  apiPostRequestValidation,
  destroyColor
);

module.exports = _;
