import jwt from "jsonwebtoken";

const genToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "20d",
  });

  res.cookie("jwt", token, {
    maxAge: 20 * 24 * 60 * 60 * 1000, // ms format
    httpOnly: true, // only accessable through http
    sameSite: "strict", // sent in req only from same site
  });
};

export default genToken;