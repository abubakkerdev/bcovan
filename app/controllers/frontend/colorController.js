const colorModel = require("../../models/color");

const handleAllColor = async (req, res) => {
  const color = await colorModel.find({}).sort({ colorName: 1 });

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

module.exports = {
  handleAllColor,
};
