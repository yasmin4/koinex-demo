const mongoose = require("mongoose");

const db = function () {
  let initFlag = false;
  return {
    config(DEV_HOST_ADDRESS, dbname, dbUsername, dbPassword,  opts, callback) {
      if (!initFlag) {
        const connectUrl = `mongodb+srv://${dbUsername}:${dbPassword}@${DEV_HOST_ADDRESS}/${dbname}`;

        mongoose.connect(connectUrl, opts || {});

        const dbConnection = mongoose.connection;

        dbConnection.on("error", (err) => {
          // Connection Error
          console.log(`Mongodb error encountered [${err}]`);

          if (callback) {
            callback("ERR-MONGODB", `mongodb - ${err.message}`);
          }
        });

        dbConnection.once("open", () => {
          initFlag = true;
          if (callback) callback(null);
        });
      } else if (callback) callback(null);
    },
  };
};

module.exports = db();
