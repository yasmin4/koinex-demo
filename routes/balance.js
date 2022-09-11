const express = require("express");
const router = express.Router();

// Controllers
const { currentBalanceOfUser } = require("../controller/balanceController");

//user listing
router.get("/user/:user_address", currentBalanceOfUser);

module.exports = router;
