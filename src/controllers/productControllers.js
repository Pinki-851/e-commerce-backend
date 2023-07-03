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

    // console.log("user", user);
    let product;
    if (user.role === "USER") {
      product = await productschema.find();
    } else {
      product = await productschema.find({ user_id: id });
    }

    res.status(200).json(product);
  } catch (error) {
    console.log("view-product", error);
    next(error);
  }
};

const updateProductDetail = async (req, res, next) => {
  try {
    const productID = req.params.id;

    const id = req.decoded_user.userId;

    const body = req.body;

    const user = await userschema.findOne({ _id: id });
    const product = await productschema.findOne({ _id: productID });

    const image = req?.file ? req.file.buffer.toString("base64") : null;
    if (image) {
      req.body.image = image;
    }

    // console.log("user", user, product);
    // console.log(
    //   "check-condition",
    //   user.role === "USER",
    //   id == product.user_id,
    //   user._id,
    //   product.user_id
    // );
    // why === not working
    if (user.role === "USER" || id != product.user_id) {
      throw {
        staus: 401,
        message: "you are not autorized to perform this action",
      };
    } else {
      const updatedProduct = await productschema.findByIdAndUpdate(
        { _id: productID },
        body,
        { new: true }
      );
      res.status(200).json(updatedProduct);
    }
  } catch (error) {
    console.log("product-update", error);
    next(error);
  }
};

module.exports = { addProducts, viewProducts, updateProductDetail };

// admin1=clothes
// admin2=hardware
// admin3=eductaion
