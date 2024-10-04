const express = require("express");
const verifyToken = require("../middleware/authMiddleware");
const autorizeRole = require("../middleware/roleMiddleware");
const router = express.Router();

//only admin can access this routes
router.post("/admin", verifyToken, autorizeRole("admin"), (req, res) => {
  return res.json({ message: "Hello Admin" });
});

//manager route
router.post(
  "/manager",
  verifyToken,
  autorizeRole("admin", "manager"),
  (req, res) => {
    return res.json({ message: "Hello Manager" });
  },
);

// users router
router.post(
  "/user",
  verifyToken,
  autorizeRole("user", "admin", "manager"),
  (req, res) => {
    return res.json({ message: "Hello user!" });
  },
);

module.exports = router;
