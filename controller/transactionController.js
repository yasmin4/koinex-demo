// DB model
const transactionModel = require("../models/transaction");

// Utils method
const { getTransactions } = require("../utils/api_calls");

//to find the transaction of user and store in to database
exports.transactionOfUser = async (req, res) => {
  try {
    const { user_address } = req.body;

    const getTransactionDetails = await getTransactions(user_address);

    const isTransactionAlreadyExist = await transactionModel.findOne({
      user_address,
    });

   //if transaction already exist update the transaction
    if (isTransactionAlreadyExist) {
      // update
      await transactionModel.findOneAndUpdate(
        {
          user_address,
        },
        {
          $set: {
            result: getTransactionDetails?.data?.result,
          },
        }
      );
    } else {
      //create new transaction if transaction is not present into database
      const newTransactionDetails = new transactionModel({
        user_address,
        result: getTransactionDetails?.data?.result,
      });

      await newTransactionDetails.save();
    }

    res.status(200).send({
      status: true,
      message: "Transaction fetched successfully",
      result: getTransactionDetails.data?.result,
    });
  } catch (error) {
    console.log("error while getting user's transaction and save it to db", error);
    return res.status(500).send({
      status: false,
      message: "Something went wrong. Please try again.",
    });
  }
};
