import { Router } from "express";
import { createMenu, deleteMenu, getAllMenu, getMenuById, getMenuByRole, updateMenu } from "../../Controller/MenuController/menuController.js";

const router = Router();

router.route("/createMenu").post(createMenu);
router.route("/getAllMenu").get(getAllMenu);
router.route("/getMenuById/:userId").get(getMenuById)
router.route("/getMenuByRole/:role").get(getMenuByRole);
router.route("/deleteUser/:id").delete(deleteMenu);
router.route("/updateUser/:id").put(updateMenu);

export default router;
