const express = require("express");
const {
  handleAllCustomer: allCustomer,
  handleStoreCustomer: storeCustomer,
  handleEditCustomer: editCustomer,
  handleUpdateCustomer: updateCustomer,
  handleDestroyCustomer: destroyCustomer,
} = require("../../../controllers/backend/customerController");
const userIsLoginValidation = require("../../../middleware/backend/userIsLoginValidation");
const apiPostRequestValidation = require("../../../middleware/backend/apiPostRequestValidation");
const apiGetRequestValidation = require("../../../middleware/backend/apiGetRequestValidation");
const customerFromValidation = require("../../../middleware/backend/customerFromValidation");

const _ = express.Router();

_.get("/all", userIsLoginValidation, apiGetRequestValidation, allCustomer);
_.post(
  "/store",
  userIsLoginValidation,
  apiPostRequestValidation,
  customerFromValidation,
  storeCustomer
);
_.get(
  "/edit/:id",
  userIsLoginValidation,
  apiGetRequestValidation,
  editCustomer
);
_.post(
  "/update",
  userIsLoginValidation,
  apiPostRequestValidation,
  customerFromValidation,
  updateCustomer
);
_.post(
  "/destroy",
  userIsLoginValidation,
  apiPostRequestValidation,
  destroyCustomer
);

module.exports = _;
