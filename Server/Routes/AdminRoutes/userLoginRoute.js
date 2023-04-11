import { Router } from "express";
import { Login } from "../../Controller/LoginController/LoginController.js";

const router = Router();

router.route("/login").post(Login);

export default router;
