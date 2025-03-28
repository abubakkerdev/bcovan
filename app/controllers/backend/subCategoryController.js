const categoryModel = require("../../models/category");
const subCategoryModel = require("../../models/subCategory");
const productModel = require("../../models/product");

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

const handleUpdateSubCategory = async (req, res) => {
  const { subCategoryInfo, genarateNew, regenerate } = req.body;

  if (regenerate.length > 0) {
    for (let latestData of regenerate) {
      await productModel.updateMany(
        { childrenCategory: latestData },
        {
          $set: {
            productStatus: "inactive",
            childrenCategory: "",
          },
        }
      );
    }
  }

  try {
    await subCategoryModel.findByIdAndUpdate(
      { _id: subCategoryInfo._id },
      { $set: { childrenCategory: genarateNew } },
      { new: true }
    );

    return res.send({
      success: {
        message: "Data Update successfully!",
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

const handleDestroySubCategory = async (req, res) => {
  const { subCategoryInfo } = req.body;

  await productModel.updateMany(
    { subcategoryId: subCategoryInfo._id },
    {
      $set: {
        productStatus: "inactive",
        subcategoryId: null,
        childrenCategory: "",
      },
    }
  );

  try {
    await subCategoryModel.findByIdAndDelete({ _id: subCategoryInfo._id });

    await categoryModel.findByIdAndUpdate(
      { _id: subCategoryInfo.categoryId._id },
      { $pull: { subCategoryId: subCategoryInfo._id } },
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
  handleUpdateSubCategory,
  handleDestroySubCategory,
};
