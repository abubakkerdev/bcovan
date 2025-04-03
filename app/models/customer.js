const mongoose = require("mongoose");
const { Schema } = mongoose;

const customerSchema = new Schema(
  {
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    uname: {
      type: String,
      default: 'User',
    },
    email: {
      type: String,
    },
    photo: {
      type: String,
      default: 'user.jpg',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Customer", customerSchema);
