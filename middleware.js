const jwt = require("jsonwebtoken");
const config = require("./config");
const client = require("./controllers/client");

const checkToken = (req, res, next) => {
  let token = req.headers["x-access-token"] || req.headers["authorization"];

  if (token) {
    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length);
      jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
          return res.json({
            success: false,
            message: "Invalid token.",
          });
        } else {
          req.decoded = decoded;
          client.sendRole(token, (role) => {
            console.log(role);
            if (role) {
              if (role === "admin" || role === "list") {
                next();
              } else {
                res.send({
                  success: false,
                  message: "Your user role cannot access this information.",
                });
              }
            } else {
              res.send({
                success: false,
                message: "There is no user with the token provided.",
              });
            }
          });
        }
      });
    }
  } else {
    res.send({
      success: false,
      message: "Auth token not supplied.",
    });
  }
};

const checkTokenPost = (req, res, next) => {
  let token = req.headers["x-access-token"] || req.headers["authorization"];

  if (token) {
    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length);
      jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
          return res.json({
            success: false,
            message: "Invalid token.",
          });
        } else {
          req.decoded = decoded;
          client.sendRole(token, (role) => {
            console.log(role);
            if (role) {
              if (role === "admin" || role === "post") {
                next();
              } else {
                res.send({
                  success: false,
                  message: "The user's role is not allowed to make a post.",
                });
              }
            } else {
              res.send({
                success: false,
                message: "There is no user with the token provided.",
              });
            }
          });
        }
      });
    }
  } else {
    res.send({
      success: false,
      message: "Auth token not supplied.",
    });
  }
};

module.exports = {
  checkToken: checkToken,
  checkTokenPost: checkTokenPost,
};
