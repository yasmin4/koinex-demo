// DB model
const transactionModel = require("../models/transaction");

// Utils method
const { getEtherPrice } = require("../utils/api_calls");

//calculate the current balance of user and fetch current eth
exports.currentBalanceOfUser = async (req, res) => {
  try {
    const transaction = await transactionModel.find({
      user_address: req.params.user_address,
    });
    
    //find current etherum price
    const getEthereumPrice = await getEtherPrice();
 
    //calculate current user balance
    if (transaction.length) {
      let transactionOfUser = transaction[0]["result"];
      let currentBalance = 0;

      for (let i = 0; i < transactionOfUser.length; i++) {
        const element = transactionOfUser[i];

        if (element?.to === req.params.user_address)
          currentBalance = currentBalance - Number(element?.value);
        if (element?.from === req.params.user_address)
          currentBalance = currentBalance + Number(element?.value);
      }
      return res.status(200).send({
        status: true,
        message: "calculate user balance base on transaction",
        result: {
          currentBalance: currentBalance,
          ethereum_price_inr: getEthereumPrice?.data?.ethereum?.inr,
        },
      });
    } else {
      return res.status(500).send({
        status: false,
        message:
          "No data found for this address in data base first get your transaction then try to fetch balance",
      });
    }
  } catch (error) {
    console.log("error in currentBalanceOfUser", error);
    return res.status(500).send({
      status: false,
      message: "Something went wrong. Please try again.",
    });
  }
};
