const express = require("express");
const verifyToken = require("../middleware/authMiddleware");
const router = express.Router();

//only admin can access this routes
router.post("/admin", (req, res) => {
  return res.json({ message: "Hello Admin" });
});

//manager route
router.post("/manager", (req, res) => {
  return res.json({ message: "Hello Admin" });
});

// users router
router.post("/user", verifyToken, (req, res) => {
  return res.json({ message: "Hello user!" });
});

module.exports = router;
