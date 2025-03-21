const customerModel = require("../../models/customer");
const fs = require("fs");

const handleAllCustomer = async (req, res) => {
  const allCustomers = await customerModel.find(
    {},
    {
      createdAt: 0,
      updatedAt: 0,
    }
  );

  if (allCustomers.length > 0) {
    return res.send({
      success: {
        message: "Data Fetch Successfull.",
        data: allCustomers,
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

const handleStoreCustomer = async (req, res) => {
  const { uname, email, phone, date, subcontinents, description } = req.body;
  const duplicateEmail = await customerModel.find({ email });

  if (duplicateEmail.length == 0) {
    try {
      if (req.imgURL) {
        const customer = new customerModel({
          uname,
          email,
          phone,
          date,
          subcontinents,
          imageURL: req.imgURL,
          description,
        });

        await customer.save();

        return res.send({
          success: {
            message: "Data Add Successfull.",
          },
        });
      } else {
        const customer = new customerModel({
          uname,
          email,
          phone,
          date,
          subcontinents,
          description,
        });

        await customer.save();

        return res.send({
          success: {
            message: "Data Add Successfull.",
          },
        });
      }
    } catch (error) {
      if (error.name === "ValidationError") {
        // Log detailed validation error

        if (req.imgURL) {
          const filePath = "./public/images/" + req.imgURL;
          fs.unlinkSync(filePath);
        }

        for (const field in error.errors) {
          return res.send({
            error: {
              field: `${field}`,
              message: `${error.errors[field].message}`,
            },
          });
        }
      } else {
        // Handle other types of errors
        return res.send({
          error: {
            message: `${error.message}`,
          },
        });
      }
    }
  } else {
    return res.send({
      error: {
        message: "This email address is already registered.",
      },
    });
  }
};

const handleEditCustomer = async (req, res) => {
  const id = req.params.id;

  try {
    const editCustomer = await customerModel.find({ _id: id });
    return res.send({
      success: {
        message: "Data details retrieved successfully.",
        data: editCustomer,
      },
    });
  } catch (err) {
    return res.send({
      error: {
        message: "The requested data does not exist in our records.",
      },
    });
  }
};

const handleUpdateCustomer = async (req, res) => {
  const { id, uname, phone, date, subcontinents, description, imageObj } =
    req.body;
  const findID = await customerModel.find({ _id: id });

  if (findID.length > 0) {
    try {
      if (req.imgURL) {
        await customerModel.findOneAndUpdate(
          { _id: id },
          {
            uname,
            phone,
            date,
            subcontinents,
            imageURL: req.imgURL,
            description,
          },
          { new: true, runValidators: true }
        );

        const filePath = "./public/images/" + imageObj[2];
        fs.unlinkSync(filePath);

        return res.send({
          success: {
            message: "Data Update Successfull.",
          },
        });
      } else {
        await customerModel.findOneAndUpdate(
          { _id: id },
          {
            uname,
            phone,
            date,
            subcontinents,
            description,
          },
          { new: true, runValidators: true }
        );

        return res.send({
          success: {
            message: "Data Update Successfull.",
          },
        });
      }
    } catch (error) {
      if (error.name === "ValidationError") {
        // Log detailed validation error

        if (req.imgURL) {
          const filePath = "./public/images/" + req.imgURL;
          fs.unlinkSync(filePath);
        }

        for (const field in error.errors) {
          return res.send({
            error: {
              field: `${field}`,
              message: `${error.errors[field].message}`,
            },
          });
        }
      } else {
        // Handle other types of errors
        return res.send({
          error: {
            message: `${error.message}`,
          },
        });
      }
    }
  } else {
    return res.send({
      error: {
        message: "The requested data does not exist in our records.",
      },
    });
  }
};

const handleDestroyCustomer = async (req, res) => {
  const { _id, imgURL } = req.body;

  if (imgURL) {
    const filePath = "./public/images/" + imgURL;
    fs.unlinkSync(filePath);

    try {
      await customerModel.findByIdAndDelete({ _id: _id });
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
  } else {
    try {
      await customerModel.findByIdAndDelete({ _id: _id });
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
  }
};

module.exports = {
  handleAllCustomer,
  handleStoreCustomer,
  handleEditCustomer,
  handleUpdateCustomer,
  handleDestroyCustomer,
};
