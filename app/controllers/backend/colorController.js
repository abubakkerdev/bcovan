const colorModel = require("../../models/color");

const handleAllColor = async (req, res) => {
  const color = await colorModel.find(
    {},
    {
      createdAt: 0,
      updatedAt: 0,
    }
  );

  if (color.length > 0) {
    return res.send({
      success: {
        message: "Data Fetch Successfull.",
        data: color,
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

const handleStoreColor = async (req, res) => {
  const { title } = req.body;

  const color = new colorModel({
    colorName: title,
  });

  let colorData = await color.save();

  if (colorData._id !== "") {
    return res.send({
      success: {
        message: "Color Add Successfull.",
        data: colorData,
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

const handleDestroyColor = async (req, res) => {
  const { _id } = req.body;

  try {
    await colorModel.findByIdAndDelete({ _id: _id });
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
  handleAllColor,
  handleStoreColor,
  handleDestroyColor,
};
