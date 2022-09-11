const express = require("express");
const router = express.Router();

// Controllers
const transactionRouter = require("./transaction");
const balanceRouter = require("./balance");

// Initialise base routes
router.use("/transaction", transactionRouter);
router.use("/balance", balanceRouter);


module.exports = router;
