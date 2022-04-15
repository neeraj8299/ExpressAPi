var express = require("express");
const UserController = require("../controllers/UserController");
var router = express.Router();
const jwt = require("jsonwebtoken");

var userController = new UserController();

/** Authenticate User */
router.post("/login", userController.login);

router.use((req, res, next) => {
  try {
    const token = req.headers.auth;
    jwt.verify(token, "abcd");
    next();
  } catch (e) {
    res.status(401).json({
      data: {
        message: "Invalid Token",
      },
    });
  }
});

/* GET user listing */
router.get("/list", userController.index);
/* Save User Data */
router.post("/save", userController.store);
/* Update User data */
router.put("/update", userController.update);
/* Delete User Data */
router.delete("/delete", userController.destroy);

module.exports = router;
