import bcrypt from "bcryptjs";
import User from "../models/userModel.js";
import genToken from "../utils/genToken.js";

export const signup = async (req, res) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;

    // check password
    if (password !== confirmPassword) {
      return res.status(400).json({ error: "passwords dont match" });
    }

    // checks if user exists
    const user = await User.findOne({ username });

    if (user) {
      return res.status(400).json({ error: "username already exists" });
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // https://avatar-placeholder.iran.liara.run/document
    const boyPfp = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlPfp = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    // creating user from the passed inputs
    const newUser = new User({
      fullName,
      username,
      password: hashedPassword,
      gender,
      profilePic: gender === "male" ? boyPfp : girlPfp,
    });

    // save user to db
    if (newUser) {
      genToken(newUser._id, res);
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        username: newUser.username,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({ error: "invalid user data" });
    }
  } catch (error) {
    console.log("error in signup controller", error.message);
    res.status(500).json({ error: "internal server error" });
  }
};

export const login = (req, res) => {
  console.log("loginUser");
};

export const logout = (req, res) => {
  console.log("logoutUser");
};
