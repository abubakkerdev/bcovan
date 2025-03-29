const productModel = require("../../models/product");
const handleAllProduct = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Default page 1
    const dataview = parseInt(req.query.dataview) || 1; // Default dataview 10
    const skip = (page - 1) * dataview;

    const allProducts = await productModel
      .find({ productStatus: "active" })
      .populate({ path: "brandId", select: "_id brandName" })
      .populate({ path: "categoryId", select: "_id categoryName" })
      .populate({ path: "colorId", select: "_id colorName" })
      .populate({ path: "capacityId", select: "_id capacityName" })
      .populate({ path: "tagId", select: "_id tagName" })
      .select({
        title: 1,
        shortDesc: 1,
        amount: 1,
        categoryId: 1,
        tagId: 1,
        brandId: 1,
        colorId: 1,
        capacityId: 1,
        imageArray: 1,
      })
      .sort({ createdAt: -1 })
      .skip(skip) // Pagination
      .limit(dataview); // Pagination

    let countProduct = await productModel.countDocuments({
      productStatus: "active",
    });

    if (allProducts.length > 0) {
      return res.send({
        success: {
          message: "Data Fetch Successfull.",
          data: {
            products: allProducts,
            count: countProduct,
            page,
            dataview,
            totalPages: Math.ceil(countProduct / dataview),
            hasNextPage: page * dataview < countProduct,
            hasPrevPage: page > 1,
          },
        },
      });
    } else {
      return res.send({
        error: {
          message: "Failed to fetch Data",
        },
      });
    }
  } catch (error) {
    return res.status(500).send({
      error: {
        message: "Internal Server Error",
        details: error.message,
      },
    });
  }
};

const handleViewProduct = async (req, res) => {
  const id = req.params.id;

  const productView = await productModel
    .find({ _id: id })
    .populate({ path: "brandId", select: "_id brandName" })
    .populate({ path: "categoryId", select: "_id categoryName" })
    .populate({ path: "colorId", select: "_id colorName" })
    .populate({ path: "capacityId", select: "_id capacityName" })
    .populate({ path: "tagId", select: "_id tagName" })
    .select({
      title: 1,
      shortDesc: 1,
      description: 1,
      additionalInfo: 1,
      amount: 1,
      sku: 1,
      categoryId: 1,
      tagId: 1,
      brandId: 1,
      colorId: 1,
      capacityId: 1,
      imageArray: 1,
      moreProduct: 1,
      relatedProduct: 1,
    });

  let moreProductData = await Promise.all(
    productView[0].moreProduct.map(async (el) => {
      let productInfo = await productModel
        .find({ _id: el })
        .select({ _id: 1, title: 1, amount: 1, imageArray: 1 });

      return productInfo[0];
    })
  );

  let relatedProductData = await Promise.all(
    productView[0].relatedProduct.map(async (el) => {
      let productInfo = await productModel
        .find({ _id: el })
        .select({ _id: 1, title: 1, amount: 1, imageArray: 1 });

      return productInfo[0];
    })
  );

  let latestProductInfo = [
    {
      title: productView[0].title,
      shortDesc: productView[0].shortDesc,
      description: productView[0].description,
      additionalInfo: productView[0].additionalInfo,
      amount: productView[0].amount,
      sku: productView[0].sku,
      categoryId: productView[0].categoryId,
      tagId: productView[0].tagId,
      brandId: productView[0].brandId,
      colorId: productView[0].colorId,
      capacityId: productView[0].capacityId,
      imageArray: productView[0].imageArray,
      moreProduct: moreProductData,
      relatedProduct: relatedProductData,
    },
  ];

  // console.log("latestProductInfo", latestProductInfo);

  if (productView.length > 0) {
    return res.send({
      success: {
        message: "Data Fetch Successfull.",
        data: latestProductInfo,
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
  handleAllProduct,
  handleViewProduct,
};
