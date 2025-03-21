const express = require("express");
const _ = express.Router();
const authenticationRoutes = require("./authentication");
const customerRoutes = require("./customer");
const brandRoutes = require("./brand");
const categoryRoutes = require("./category");
const tagRoutes = require("./tag");
const capacityRoutes = require("./capacity");
const colorRoutes = require("./color");
const productRoutes = require("./product");

_.use("/authentication", authenticationRoutes);
_.use("/customer", customerRoutes);
_.use("/brand", brandRoutes);
_.use("/category", categoryRoutes);
_.use("/tag", tagRoutes);
_.use("/capacity", capacityRoutes);
_.use("/color", colorRoutes);
_.use("/product", productRoutes);

module.exports = _;
