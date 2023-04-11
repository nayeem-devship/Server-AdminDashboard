import { Router } from "express";
import { addSubUser, deleteSubUser, getSubUser, updateSubUser } from "../../Controller/AdminController/subUsersController.js";

const router = Router();

router.route("/addSubUser").post(addSubUser);
router.route("/getSubUser").get(getSubUser);
router.route("/deleteSubUser/:id").delete(deleteSubUser);
router.route("/updateSubUser/:id").put(updateSubUser);

export default router;
