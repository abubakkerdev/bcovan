const categoryModel = require("../../models/category");
const subCategoryModel = require("../../models/subCategory");

const handleAllSubCategory = async (req, res) => {
  const allSubCategory = await subCategoryModel
    .find({})
    .populate({ path: "categoryId", select: "_id categoryName" })
    .sort({ createdAt: -1 });

  if (allSubCategory.length > 0) {
    return res.send({
      success: {
        message: "Data Fetch Successfull.",
        data: allSubCategory,
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

const handleStoreSubCategory = async (req, res) => {
  const { subCategory, categoryId, childrenCategory } = req.body;

  const subCategoryStore = new subCategoryModel({
    subCategory,
    categoryId,
    childrenCategory,
  });

  let subCategoryData = await subCategoryStore.save();

  if (subCategoryData._id !== "") {
    await categoryModel.findByIdAndUpdate(
      { _id: categoryId },
      { $push: { subCategoryId: subCategoryData._id } },
      { new: true }
    );

    return res.send({
      success: {
        message: "SubCategory Add Successfull.",
        data: subCategoryData,
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

const handleDestroySubCategory = async (req, res) => {
  const { subCategoryInfo } = req.body;

  try {
    await subCategoryModel.findByIdAndDelete({ _id: subCategoryInfo._id });

    await categoryModel.findByIdAndUpdate(
      { _id: subCategoryInfo.categoryId._id },
      { $pull: { subCategoryId: subCategoryInfo._id} },
      { new: true }
    );

    return res.send({
      success: {
        message: "Data Deleted successfully!",
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
  handleAllSubCategory,
  handleStoreSubCategory,
  handleDestroySubCategory,
};
