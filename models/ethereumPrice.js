const mongoose = require("mongoose");

const EthereumPriceSchema = new mongoose.Schema({
  ethereum_price_inr: { type: String, required: true },
  created_at: {
    type: Date,
    default: new Date(),
  },
  updated_at: {
    type: Date,
    default: new Date(),
  },
});
module.exports = mongoose.model("EthereumPrice", EthereumPriceSchema);
