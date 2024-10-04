const express = require("express");
const dotenv = require("dotenv");
const dbConnection = require("./config/dbConfig");
const authRoutes = require("./routers/authRoutes");
const userRoutes = require("./routers/userRoutes");
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

//connec to database
dbConnection();

//middleware
app.use(express.json());

//autentication routes
app.use("/api/auth", authRoutes);

//routes based on role
app.use("/api/user", userRoutes);

// start the serve:
app.listen(PORT, () => {
  console.log("Server Running On PORT: ", PORT);
});
