import express from "express";
import Cors from "cors";
import path from "path";

const app = express();

app.use(Cors());

app.use(
  express.json({
    limit: "25MB",
  })
);

app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join("./", "/public")));

import User from "./Server/Routes/AdminRoutes/userRoutes.js";
import SubUser from "./Server/Routes/AdminRoutes/subUsersRoute.js";
import userLogin from "./Server/Routes/AdminRoutes/userLoginRoute.js";
import userMenu from "./Server/Routes/MenuRoutes/menuRoutes.js";

app.use("/user", User);
app.use("/subUser", SubUser);
app.use("/auth", userLogin);
app.use("/menu", userMenu)

export default app;
