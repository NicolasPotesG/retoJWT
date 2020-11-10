var express = require("express");
var router = express.Router();

const middleware = require("../middleware");
const clients = require("../controllers/client");

router.get("/", middleware.checkToken, clients.sendClients);

router.post("/", middleware.checkTokenPost, clients.postClient);

module.exports = router;
