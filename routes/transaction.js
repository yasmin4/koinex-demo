const express = require("express");
const router = express.Router();

//Validations
const {
  transactionValidation,
} = require("../validation/transactionValidation");

// Controllers
const { transactionOfUser } = require("../controller/transactionController");

//user listing
router.post("/", transactionValidation, transactionOfUser);

module.exports = router;