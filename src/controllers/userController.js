const userschema = require("../models/userModel");
const bcrypt = require("bcrypt");
const path = require("path");
const multer = require("multer");
const jwt = require("jsonwebtoken");

const signUp = async (req, res, next) => {
  console.log("signup");
  try {
    const { name, email, password, role, phone } = req.body;
    console.log("req", req);
    if (!name || !email || !password || !phone) {
      throw { status: 400, message: "all fields are required for signup" };
    }
    const hasedPassword = await bcrypt.hash(password, 10);
    req.body.password = hasedPassword;

    // for admin login
    if (role === "ADMIN" && email) {
      const user = await userschema.findOne({ email, role });
      if (user) {
        throw { status: 400, message: "Admin already exist" };
      }
      req.body.profile_pic = req?.file
        ? req.file.buffer.toString("base64")
        : null;
      const newAdmin = await userschema.create(req.body);
      res.status(200).json(newAdmin);
    } else {
      const user = await userschema.findOne({ email });
      console.log("user", user);
      if (user) {
        throw { status: 400, message: "User already exist" };
      }

      req.body.profile_pic = req?.file
        ? req.file.buffer.toString("base64")
        : null;

      const newUser = await userschema.create(req.body);
      res.status(200).json(newUser);
    }
  } catch (err) {
    // res.status(400).json({ message: err.message });
    console.log("singup-err", err);
    next(err);
  }
};

const getUser = async (req, res, next) => {
  console.log("req", req.query);
  const { role } = req.query;
  try {
    if (role) {
      const findUserByRole = await userschema.find({ role });
      console.log("find", findUserByRole);
      res.status(200).json(findUserByRole);
    }
    const user = await userschema.find();
    if (!user) {
      throw { status: 400, message: "no user found" };
    }
    res.status(200).json(user);
  } catch (err) {
    console.log("getuser", err);
    next(err);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const body = req.body;
    const id = req.decoded_user.userId;
    const profile_pic = req?.file ? req.file.buffer.toString("base64") : null;
    if (profile_pic) {
      body.profile_pic = profile_pic;
    }

    const userById = await userschema.findByIdAndUpdate({ _id: id }, body, {
      new: true,
    });

    // console.log("userbyid", userById, req.file, profile_pic, "body", req.body);
    if (!userById) {
      throw { status: 400, message: "User not found" };
    }

    res.status(200).json(userById);
  } catch (err) {
    console.log("update-user", err);
    next(err);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const id = req.decoded_user.userId;
    const userById = await userschema.findById({ _id: id });

    if (!userById) {
      throw { status: 400, message: "User not found" };
    }

    await userschema.deleteOne({ _id: id });
    res.status(200).json({ message: "successfully deleted" });
  } catch (err) {
    console.log("delete-user", err);
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw { status: 400, message: "email and password is required" };
    }

    const user = await userschema.findOne({ email }).lean();
    if (!user) {
      throw { status: 400, message: "User not found" };
    }
    console.log("result", password, user.password);

    const result = await bcrypt.compare(password, user.password);

    console.log("result", result);
    if (!result) {
      throw { status: 400, message: "invalid credential" };
    }

    const payload = { userId: user._id };
    const token = jwt.sign({ data: payload }, process.env.JWT_SECRET);

    res.status(200).json({ ...user, token });
  } catch (err) {
    console.log("login", err);
    next(err);
  }
};

module.exports = { signUp, getUser, updateUser, deleteUser, login };

// doubt
// how to use image in frontend
// how to send response with or without profile_pic
// clustor,fork and spwan ,emit,child process
