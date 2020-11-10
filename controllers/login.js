const connection = require("../lib/mongoUtils");

const sendPassword = (username, callback) => {
  connection.then((client) => {
    client
      .db("mydatabase")
      .collection("users")
      .findOne({ username })
      .then((result) => {
        if (result) {
          callback(result.password);
        } else {
          callback(null);
        }
      });
  });
};

const updateToken = (username, token) => {
  connection.then((client) => {
    client
      .db("mydatabase")
      .collection("users")
      .updateOne({ username }, { $set: { token: token } });
  });
};

module.exports = {
  sendPassword,
  updateToken,
};
