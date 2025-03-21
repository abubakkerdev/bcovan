const express = require("express");
const {
  handleAllProduct: allProduct,
  handleViewProduct: viewProduct,
} = require("../../../controllers/frontend/productController");
const apiPostRequestValidation = require("../../../middleware/backend/apiPostRequestValidation");
const apiGetRequestValidation = require("../../../middleware/backend/apiGetRequestValidation");

const _ = express.Router();

_.get("/all", allProduct);
_.get("/view/:id", viewProduct);

module.exports = _;


