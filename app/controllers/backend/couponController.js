const couponModel = require("../../models/coupon");
const fs = require("node:fs");

const handleAllCoupon = async (req, res) => {
  const allCoupons = await couponModel.find({}).sort({ createdAt: -1 });

  if (allCoupons.length > 0) {
    return res.send({
      success: {
        message: "Data Fetch Successfull.",
        data: allCoupons,
      },
    });
  } else {
    return res.send({
      error: {
        message: "Failed to fetch Data",
      },
    });
  }
};

const handleStoreCoupon = async (req, res) => {
  const {
    couponCode,
    discountType,
    shippingCharge,
    discountRate,
    minimumShopping,
    expiredDate,
    maximumDiscount,
  } = req.body;

  //   return res.send({
  //     success: {
  //       message: "Coupon Add Successfull.",
  //     },
  //   });

  const coupon = new couponModel({
    couponCode,
    discountType,
    shippingCharge,
    discountRate,
    minimumShopping,
    expiredDate,
    maximumDiscount,
  });

  let couponData = await coupon.save();

  if (couponData._id !== "") {
    return res.send({
      success: {
        message: "Coupon Add Successfull.",
      },
    });
  } else {
    return res.send({
      error: {
        message: "There was an server-side Error",
      },
    });
  }
};

const handleDestroyCoupon = async (req, res) => {
  const { id } = req.body;

  try {
    await couponModel.findByIdAndDelete({ _id: id });
    return res.send({
      success: {
        message: "Data deleted successfully!",
      },
    });
  } catch (err) {
    return res.send({
      error: {
        message: "Failed to delete. Please try again.",
      },
    });
  }
};

module.exports = {
  handleAllCoupon,
  handleStoreCoupon,
  handleDestroyCoupon,
};
