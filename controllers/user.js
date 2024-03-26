const { v4: uuidv4 } = require("uuid");
const { getUser, setUser } = require("../service/auth");
const User = require("../models/user");

async function handleUserSignUp(req, res) {
  const { name, email, password } = req.body;
  const role = 'NORMAL'
  await User.create({
    name,
    email,
    password,
    role,
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
  
  const token = setUser(user);
  // console.log("token", token)

  res.cookie("uid", token);

  return res.redirect("/");
}

module.exports = { handleUserSignUp, handleUserLogIn };
