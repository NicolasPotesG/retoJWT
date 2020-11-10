const connection = require("../lib/mongoUtils");
const encrypt = require("js-md5");

const sendClients = (req, res) =>
  connection.then((client) => {
    client
      .db("mydatabase")
      .collection("users")
      .find({})
      .toArray((err, data) => {
        console.log(data);
        res.send(data);
      });
  });

const postClient = (req, res) => {
  connection.then((client) => {
    const user = {
      username: req.body.username,
      password: encrypt(req.body.password),
      role: req.body.role,
      token: "",
    };

    res.send(user);
    client.db("mydatabase").collection("users").insertOne(user);
  });
};

const sendRole = (token, callback) =>
  connection.then((client) => {
    client
      .db("mydatabase")
      .collection("users")
      .findOne({ token: token })
      .then((result) => {
        if (result) {
          callback(result.role);
        } else {
          callback(null);
        }
      });
  });

module.exports = {
  sendClients,
  sendRole,
  postClient,
};
