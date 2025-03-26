const categoryModel = require("../../models/category");

const handleAllCategory = async (req, res) => {
  const categories = await categoryModel.find(
    {},
    {
      createdAt: 0,
      updatedAt: 0,
    }
  );

  if (categories.length > 0) {
    return res.send({
      success: {
        message: "Data Fetch Successfull.",
        data: categories,
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

const handleStoreCategory = async (req, res) => {
  const { title } = req.body;

  const category = new categoryModel({
    categoryName: title,
  });

  let categoryData = await category.save();

  if (categoryData._id !== "") {
    return res.send({
      success: {
        message: "Category Add Successfull.",
        data: categoryData,
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

const handleDestroyCategory = async (req, res) => {
  const { _id } = req.body;

  try {
    await categoryModel.findOneAndDelete({ _id: _id });
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
  handleAllCategory,
  handleStoreCategory,
  handleDestroyCategory,
};
