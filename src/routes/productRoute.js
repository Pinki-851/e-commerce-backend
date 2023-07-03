const express = require("express");
const router = express.Router();
const {
  addProducts,
  viewProducts,
} = require("../controllers/productControllers");
const validateToken = require("../middleware/validateTokenHandler");
const multer = require("multer");

const upload = multer({ storage: multer.memoryStorage() });

router.post("/add", validateToken, upload.single("image"), addProducts);
router.get("/all_products", validateToken, viewProducts);

module.exports = router;
