const bcrypt = require("bcryptjs/dist/bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/userModels");
//register user functionality
const register = async (req, res) => {
  const { username, password, role } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({
      username: username,
      password: hashedPassword,
      role,
    });
    await newUser.save();

    return res
      .status(201)
      .json({ message: "User Registerd Sucessfuly!", status: 1 });
  } catch (error) {
    console.log(error.message || error);
    return res.status(500).json({ message: error.message || error, status: 0 });
  }
};

//login functionality
const login = async (req, res) => {
  const { username, password } = req.body;
  console.log(username, password);
  try {
    const user = await UserModel.findOne({ username });
    if (!user) {
      console.log("User Does't exits!");
      return res.json({ message: "User Does't Exsist!", notFound: true });
    }
    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) {
      console.log("Password Incorrect!");
      return res
        .status(409)
        .json({ message: "Password Incorrect!", IncorrectPass: true });
    }
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );
    return res.json({ token });
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || error, serverError: true });
  }
};
module.exports = { register, login };
