const mongoose = require("mongoose");
const dbConnection = async () => {
  if (!process.env.MONGO_DB) {
    console.log("Database Connection String Missing");
    return;
  }
  try {
    const connect = await mongoose.connect(process.env.MONGO_DB);
    console.log(
      `Database Connected ${connect.connection.host}::${connect.connection.name}`,
    );
  } catch (error) {
    console.log(error);
  }
};

module.exports = dbConnection;
