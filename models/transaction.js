const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
  user_address: { type: String, required: true },
  result: { type: Array, default: [] },
  created_at: {
    type: Date,
    default: new Date(),
  },
  updated_at: {
    type: Date,
    default: new Date(),
  },
});
module.exports = mongoose.model("Transaction", TransactionSchema);
