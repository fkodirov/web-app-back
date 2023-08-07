const Router = require("express");
const router = new Router();
const userController = require("../controllers/UserController");

router.post("/registration", userController.registration);
router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.post("/refresh", userController.refresh);
router.get("/users", userController.getUsers);

module.exports = router;
