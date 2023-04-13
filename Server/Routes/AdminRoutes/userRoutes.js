import { Router } from "express";
import {
  addUser,
  deleteUser,
  getUser,
  updateUser,
} from "../../Controller/AdminController/userController.js";

const router = Router();

router.route("/addUser").post(addUser);
router.route("/getUser").get(getUser);
router.route("/deleteUser/:id").delete(deleteUser);
router.route("/updateUser/:id").put(updateUser);

export default router;
