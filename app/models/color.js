const mongoose = require("mongoose");
const { Schema } = mongoose;

const colorSchema = new Schema(
  {
    colorName: {
      type: String,
      required: true,
    },
    productId: [
      {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Color", colorSchema);
