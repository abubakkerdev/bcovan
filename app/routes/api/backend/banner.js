const express = require("express");
const {
  handleAllBanner: allBanner,
  handleStoreBanner: storeBanner,
  handleStatusBanner: statusBanner,
  handleDestroyBanner: destroyBanner,
} = require("../../../controllers/backend/bannerController");
const apiPostRequestValidation = require("../../../middleware/backend/apiPostRequestValidation");
const apiGetRequestValidation = require("../../../middleware/backend/apiGetRequestValidation");

const _ = express.Router();

_.get("/all",  apiGetRequestValidation, allBanner);
_.post("/store", apiPostRequestValidation, storeBanner);
_.post("/status", apiPostRequestValidation, statusBanner);

_.post(
  "/destroy",
  apiPostRequestValidation,
  destroyBanner
);

module.exports = _;
