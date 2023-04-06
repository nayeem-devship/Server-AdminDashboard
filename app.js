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

import User from "./Server/Routes/AdminRoutes/userRoutes.js"

app.use("/user", User)

export default app;
