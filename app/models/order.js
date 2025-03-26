const mongoose = require("mongoose");
const { Schema } = mongoose;
const orderSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    company: {
      type: String,
    },
    country: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    streetAddress: {
      type: String,
      required: true,
    },
    apartment: {
      type: String,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    orderNotes: {
      type: String,
    },
    orderStatus: {
      type: String,
      default: "1",
    },
    shipping: {
      type: String,
      required: true,
    },
    productInfo: [
      {
        type: Map,
        of: mongoose.Schema.Types.Mixed,
        required: true,
      },
    ],
    paymentGateway: {
      type: Boolean,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", orderSchema);
