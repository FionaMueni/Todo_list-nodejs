const UserController = require('./../controllers/user.controller');
const router = require("express").Router();

// register
router.post("/register", UserController.Register)

// login
router.post("/login", UserController.Login)

// forgot password
router.post("/forgot/password", UserController.ForgotPassword)

module.exports = router;