const EthereumModel = require("../models/ethereumPrice");
const { getEtherPrice } = require("../utils/api_calls");

exports.ethereumPrice = async () => {
  console.log("node cron job called");
  //fetch the current price of ethereum using API
  const getEthereumPrice = await getEtherPrice();

  //save into database
  const EthereumModelData = new EthereumModel({
    ethereum_price_inr: getEthereumPrice?.data?.ethereum?.inr,
  });

  await EthereumModelData.save();
};
