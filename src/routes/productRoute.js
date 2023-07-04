const express = require("express");
const router = express.Router();
const {
  addProducts,
  viewProducts,
  updateProductDetail,
  deleteProduct,
} = require("../controllers/productControllers");
const validateToken = require("../middleware/validateTokenHandler");
const multer = require("multer");

const upload = multer({ storage: multer.memoryStorage() });

router.post("/add", validateToken, upload.single("image"), addProducts);
router.get("/all_products", validateToken, viewProducts);
router.put("/:id", validateToken, upload.single("image"), updateProductDetail);
router.delete("/:id", validateToken, deleteProduct);

module.exports = router;
