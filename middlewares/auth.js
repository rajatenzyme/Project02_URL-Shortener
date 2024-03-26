const { getUser } = require("../service/auth");

async function checkForAuthorization(req, res, next) {
  // console.log("req", req)
  const tokenCookie = req.cookies?.uid;
  console.log("tokenCookie", tokenCookie)
  req.user = null;

  if(!tokenCookie )
    return next();

  const token = tokenCookie;
  const user = getUser(token);
  console.log("user", user)
  req.user = user;
  return next();

}

function restrictTo(roles = []){
  
  return function(req, res, next){
    // console.log("req", req)
    if(!req.user)
       return res.redirect("/login")
    if(!roles.includes(req.user.role))
      return res.end("UnAuthorized Access!!")

    return next();
  };
}

module.exports = {
  checkForAuthorization,
  restrictTo
};
