const express = require("express");
const {
  handleAllSubCategory: allSubCategory,
  handleStoreSubCategory: storeSubCategory,
  handleDestroySubCategory: destroySubCategory,
} = require("../../../controllers/backend/subCategoryController");
const apiPostRequestValidation = require("../../../middleware/backend/apiPostRequestValidation");
const apiGetRequestValidation = require("../../../middleware/backend/apiGetRequestValidation");

const _ = express.Router();

_.get("/all",  apiGetRequestValidation, allSubCategory);
_.post("/store", apiPostRequestValidation, storeSubCategory);

_.post(
  "/destroy",
  apiPostRequestValidation,
  destroySubCategory
);

module.exports = _;
