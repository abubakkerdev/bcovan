const mongoose = require("mongoose");
const { Schema } = mongoose;
const productSchema = new Schema( 
  {
    title: {
      type: String,
      required: true,
    },
    shortDesc: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    amount: {
      type: String,
      required: true,
    },
    sku: {
      type: String,
    },
    categoryId: [
      {
        type: Schema.Types.ObjectId,
        ref: "Category",
        required: true,
      },
    ], 
    tagId: [
      {
        type: Schema.Types.ObjectId,
        ref: "Tag",
        required: true,
      },
    ],
    brandId: {
      type: Schema.Types.ObjectId,
      ref: "Brand",
      default: null,
    },
    colorId: {
      type: Schema.Types.ObjectId,
      ref: "Color",
      default: null,
    },
    capacityId: {
      type: Schema.Types.ObjectId,
      ref: "Capacity",
      default: null,
    },
    reviewId: [
      {
        type: Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
    imageArray: [
      {
        type: String,
        required: true,
      },
    ],
    moreProduct: [
      {
        type: String,
      },
    ],
    relatedProduct: [
      {
        type: String,
      },
    ],
    additionalInfo: {
      type: String,
    },
    wishlistId: [
      {
        type: Schema.Types.ObjectId,
        ref: "Wishlist",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);
