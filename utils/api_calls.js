const { default: axios } = require("axios");

exports.getEtherPrice = () => axios.get(
  `${process.env.API_ETHER_PRICE_BASE_URL}/simple/price`,
  { params: { ids: "ethereum", vs_currencies: "inr" } }
);

exports.getTransactions = (user_address) =>
  axios.get(`${process.env.API_ETHERSCAN_BASE_URL}/api`, {
    params: {
      module: "account",
      action: "txlist",
      address: user_address,
      startblock: 0,
      ndblock: 99999999,
      sort: "asc",
      apikey: process.env.ETHERSCAN_API_KEY,
    },
  });
