import { Router } from "express";
import { addSubUser, deleteSubUser, getSubUser, updateSubUser } from "../../Controller/AdminController/subUsersController.js";
import { Login } from "../../Controller/LoginController/LoginController.js";

const router = Router();

router.route("/addSubUser").post(addSubUser);
router.route("/getSubUser").get(getSubUser);
router.route("/deleteSubUser/:id").delete(deleteSubUser);
router.route("/updateSubUser/:id").put(updateSubUser);
router.route("/login").post(Login);

export default router;
