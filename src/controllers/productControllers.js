const userschema = require("../models/userModel");
const productschema = require("../models/productModel");

const addProducts = async (req, res, next) => {
  try {
    const id = req.decoded_user.userId;

    const user = await userschema.findOne({ _id: id });

    if (user.role !== "ADMIN") {
      throw {
        status: 400,
        message: "you are not authorized to perform this action.",
      };
    }

    const { name, qty, price } = req.body;

    if (!name || !qty || !price) {
      throw { status: 400, message: "all fields are required" };
    }

    req.body.image = req.file ? req.file.buffer.toString("base64") : null;

    const product = await productschema.create({
      ...req.body,
      user_id: user._id,
    });

    res.status(200).json(product);
  } catch (err) {
    console.log("add-product", err);
    next(err);
  }
};

const viewProducts = async (req, res, next) => {
  try {
    const id = req.decoded_user.userId;
    const user = await userschema.findOne({ _id: id });
    // if(user.role==="USER"){}
    const product = await productschema.find({ user_id: id });
    res.status(200).json(product);
  } catch (error) {
    console.log("view-product", error);
    next(error);
  }
};

module.exports = { addProducts, viewProducts };

// admin1=clothes
// admin2=grocery
// admin3=eductaion
