const { v4: uuidv4 } = require("uuid");
const { getUser, setUser, logoutUser } = require("../service/auth");
const User = require("../models/user");

async function handleUserSignUp(req, res) {
  const { name, email, password } = req.body;
  await User.create({
    name,
    email,
    password,
  });

  return res.redirect("/");
}

async function handleUserLogIn(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });

  if (!user) {
    res
      .status(400)
      .json({ error: "Please try to login with correct credentials" });
    return;
  }
  //     return res.render("login", {
  // error : "Invalid Username or password"},
  // console.log("Invalid Username or password"));

  const token = setUser(user);

  res.cookie("uid", token);

  return res.redirect("/");
}

module.exports = { handleUserSignUp, handleUserLogIn };
