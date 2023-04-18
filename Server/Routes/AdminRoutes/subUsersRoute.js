import { Router } from "express";
import { addSubUser, deleteSubUser, getSubUser, getSubUserById, updateSubUser } from "../../Controller/AdminController/subUsersController.js";

const router = Router();

router.route("/addSubUser").post(addSubUser);
router.route("/getSubUser").get(getSubUser);
router.route("/deleteSubUser/:id").delete(deleteSubUser);
router.route("/updateSubUser/:id").put(updateSubUser);

router.route("/getSubUserById/:id").get(getSubUserById);

export default router;
