const express = require("express");
const {
  signUp,
  getUser,
  updateUser,
  deleteUser,
  login,
} = require("../controllers/userController");
const validateToken = require("../middleware/validateTokenHandler");
const multer = require("multer");

const router = express.Router();

// const userStorage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     console.log("image", path.join(__dirname, "/public/userImage"));
//     cb(
//       null,
//       path.join(__dirname, "../../public/userImage"),
//       function (err, success) {
//         if (err) {
//           throw err;
//         }
//       }
//     );
//   },
//   filename: function (req, file, cb) {
//     console.log("file", file);
//     const name = Date.now() + "-" + file.originalname;
//     cb(null, name);
//   },
// });

const upload = multer({ storage: multer.memoryStorage() });
// const upload = multer({ storage: userStorage });

router.post("/signup", upload.single("profile_pic"), signUp);

router.get("/allusers", getUser);

router.put("/update", validateToken, upload.single("profile_pic"), updateUser);
router.delete("/delete", validateToken, deleteUser);

router.post("/login", login);

module.exports = router;
