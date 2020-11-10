var express = require("express");
var router = express.Router();
let jwt = require("jsonwebtoken");
let config = require("../config");
const connection = require("../lib/mongoUtils");
const login = require("../controllers/login");
const encrypt = require("js-md5");

router.post("/", function (req, res, next) {
  let username = req.body.username;
  let password = req.body.password;

  if (username && password) {
    let encryptedPassword = encrypt(password);

    login.sendPassword(username, (passw) => {
      if (!passw) {
        res.send({
          success: false,
          message: "The user does not exist.",
        });
      } else {
        if (encryptedPassword === passw) {
          let token = jwt.sign({ username: username }, config.secret, {
            expiresIn: "24h",
          });
          login.updateToken(username, token);
          res.send({
            success: true,
            message: "Successful authentication.",
            token: token,
          });
        } else {
          res.send({
            success: false,
            message: "Invalid username or password.",
          });
        }
      }
    });
  } else {
    res.send({
      success: false,
      message: "Invalid username or password.",
    });
  }
});

module.exports = router;
