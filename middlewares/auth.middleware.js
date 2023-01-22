const jwt = require("jsonwebtoken");
require("dotenv").config();

const Authentication = async (req, res, next) => {
  // const user_token = req.headers.authorization.split(" ")[1];
  const user_token = req.headers.authorization;
  if (!user_token) {
    return res.status(511).send("you are not authenticated");
  } else {
      await jwt.verify(user_token, process.env.TOKEN_KEY, function (err, decoded) {
        if (err) {
          return res.status(511).send("you are not authenticated2");
        }
        req.body.UserId = decoded.userId;
        next();
      });
  }
};

module.exports = {Authentication};