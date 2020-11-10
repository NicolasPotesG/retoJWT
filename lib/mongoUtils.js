const { MongoClient } = require("mongodb");

const url = "mongodb://localhost:27017";

const connection = MongoClient.connect(url, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

module.exports = connection;
