const express = require("express");
const router = express.Router();
const { addProducts } = require("../controllers/productControllers");

router.get("/add", addProducts);

module.exports = router;
