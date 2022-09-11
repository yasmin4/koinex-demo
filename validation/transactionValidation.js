const yup = require("yup");

exports.transactionValidation = async (req, res, next) => {
  try {
    const transactionSchema = yup.object().shape({
      user_address: yup
        .string()
        .required("user adress is required to know their transaction"),
    });
    await transactionSchema.validate(req.body);
    next();
  } catch (error) {
    res.status(400).json({
      success: false,
      errors: error.errors[0],
    });
  }
};
