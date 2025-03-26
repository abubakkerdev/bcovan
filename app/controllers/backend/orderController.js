const orderModel = require("../../models/order");

const handleAllOrder = async (req, res) => {
  const orderAll = await orderModel
    .find({})
    .populate({ path: "userId", select: "_id uname" })
    .select({
      firstName: 1,
      lastName: 1,
      company: 1,
      country: 1,
      city: 1,
      streetAddress: 1,
      apartment: 1,
      phone: 1,
      email: 1,
      orderNotes: 1,
      orderStatus: 1,
      shipping: 1,
      productInfo: 1,
      paymentGateway: 1,
      amount: 1,
      userId: 1,
    })
    .sort({ createdAt: -1 });

  if (orderAll.length > 0) {
    return res.send({
      success: {
        message: "Data Fetch Successfull.",
        data: orderAll,
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

const handleStoreOrder = async (req, res) => {
  const {
    firstName,
    lastName,
    company,
    country,
    city,
    streetAddress,
    apartment,
    phone,
    email,
    orderNotes,
    shipping,
    productInfo,
    paymentGateway,
    amount,
    userId,
  } = req.body;

  const order = new orderModel({
    firstName,
    lastName,
    company,
    country,
    city,
    streetAddress,
    apartment,
    phone,
    email,
    orderNotes,
    shipping,
    productInfo,
    paymentGateway,
    amount,
    userId,
  });

  let orderData = await order.save();

  if (orderData._id !== "") {
    return res.send({
      success: {
        message: "Order Add Successfull.",
        data: orderData,
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

const handleUpdateOrder = async (req, res) => {
  const { id, orderStatus } = req.body;
  try {
    await orderModel.findByIdAndUpdate(
      { _id: id },
      { orderStatus: orderStatus },
      { new: true }
    );

    return res.send({
      success: {
        message: "Order Accept Successfully!",
      },
    });
  } catch (err) {
    return res.send({
      error: {
        message: "Failed to Update. Please try again.",
      },
    });
  }
};

const handleDestroyOrder = async (req, res) => {
  const { id } = req.body;

  try {
    await orderModel.findByIdAndDelete({ _id: id });
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
  handleAllOrder,
  handleStoreOrder,
  handleUpdateOrder,
  handleDestroyOrder,
};
