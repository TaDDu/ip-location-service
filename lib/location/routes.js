var express = require("express");
router = express.Router();
var controller = require("./controller.js");
router.get("/", controller.get.location);
//router.put("/", controller.put.industries);
//router.delete("/:id", controller.delete.industry);

module.exports = router;
