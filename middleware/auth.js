const { getUser } = require("../controllers/service/auth");

async function restrictToLoggedinUser(req, res, next) {
  const userUid = req.cookies?.uid;

  if (!userUid) return res.redirect("static/login");

  const user = getUser(userUid);

  if (!user) return res.redirect("/static/login");

  req.user = user;
  next();
}

async function checkAuth(req,res,next) {
  //here we will do the same work
  const userUid = req.cookies?.uid;

  const user = getUser(userUid);

  if(!user) return res.redirect("/static/login");

  req.user = user;
  next();
}

//now we willexport this
module.exports = {
  restrictToLoggedinUser,
  checkAuth
};
