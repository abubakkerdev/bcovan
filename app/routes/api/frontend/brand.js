const express = require("express");
const {
  handleAllBrand: allBrand,
} = require("../../../controllers/frontend/brandController");
const apiPostRequestValidation = require("../../../middleware/backend/apiPostRequestValidation");
const apiGetRequestValidation = require("../../../middleware/backend/apiGetRequestValidation");

const _ = express.Router();

_.get("/all", apiGetRequestValidation, allBrand);
// _.post("/store", apiPostRequestValidation, storeBrand);

// _.post(
//   "/destroy",
//   apiPostRequestValidation,
//   destroyBrand
// );

module.exports = _;
