import bcrypt from "bcrypt";
import { generateToken } from "../../MiddleWare/auth.js";
import UserLoginDb from "../../Model/AdminModels/userLoginModel.js";

export async function Login(req, res, next) {
  try {
    const data = req.body;
    const existUser = await UserLoginDb.findOne({
      userName: data.userName,
    });
    if (existUser) {
      bcrypt
        .compare(data.password, existUser.password)
        .then((checkPassword) => {
          if (checkPassword) {
            generateToken({ userName: existUser.userName }).then((token) => {
              res.status(200).json({
                message: "user login successfully",
                userName: existUser.userName,
                data: existUser,
                token: token,
                status: "successful",
              });
            });
          } else {
            res.status(400).json({
              message: "password not matched",
              status: "Failed",
            });
          }
        });
    } else {
      res.status(401).json({
        message: "user not found",
        status: "failed",
      });
    }
  } catch (err) {
    console.log(err);
    next();
  }
}
