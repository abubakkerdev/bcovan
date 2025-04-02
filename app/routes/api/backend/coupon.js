const express = require("express");
const {
  handleAllCoupon: allCoupon,
  handleStoreCoupon: storeCoupon,
  handleDestroyCoupon: destroyCoupon,
} = require("../../../controllers/backend/couponController");
const apiPostRequestValidation = require("../../../middleware/backend/apiPostRequestValidation");
const apiGetRequestValidation = require("../../../middleware/backend/apiGetRequestValidation");

const _ = express.Router();

_.get("/all",  apiGetRequestValidation, allCoupon);
_.post("/store", apiPostRequestValidation, storeCoupon);

_.post(
  "/destroy",
  apiPostRequestValidation,
  destroyCoupon
);

module.exports = _;
