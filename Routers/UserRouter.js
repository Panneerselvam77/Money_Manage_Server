import express from "express";
import { User } from "../Models/User.js";
import bcrypt from "bcrypt";

// Configureing Router
const router = express.Router();

// Register Router

router.post("/register", async function (req, res) {
  try {
    // Finding User is Already Exits or not !!!
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(500).json({ message: "Email already exits" });

    // Generate HasedPassword
    const salt = await bcrypt.genSalt(10);
    const hasedPassword = await bcrypt.hash(req.body.password, salt);

    // Add the new user
    const newuser = new User({
      name: req.body.name,
      email: req.body.email,
      password: hasedPassword,
    });
    await newuser.save();
    res
      .status(201)
      .json({ message: "Successfully Signed Up", UserDetail: newuser });
  } catch (error) {
    res.status(500).json({ message: "Local server Error", error: error });
  }
});

// Login Router

router.post("/login", async function (req, res) {
  try {
    // Finding Existing User
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }
    // Password Validate
    const validatePassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validatePassword) {
      return res.status(400).json({ message: "Invalid Creadentials" });
    }
    res.status(200).json({ message: "Logged in Successfully", User: user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error", error: error });
  }
});

export const userRouter = router;
