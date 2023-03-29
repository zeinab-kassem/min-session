import express from "express";
// import auth from "../middlewar/auth.middleware.js";
import UserController from "../controllers/adminController.js";

const router = express.Router();

router.route("/").post(UserController.register);
router.route("/login").post(UserController.login);


export default router;











