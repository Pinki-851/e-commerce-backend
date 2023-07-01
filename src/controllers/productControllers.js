const addProducts = async (req, res, next) => {
  try {
    res.status(200).json({ products: "add product" });
  } catch (err) {
    console.log("add-product", err);
    next();
  }
};

module.exports = { addProducts };
