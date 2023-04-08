import UserDb from "../../Model/AdminModels/userModel.js";
import UserLoginDb from "../../Model/AdminModels/userLoginModel.js";
import bcrypt from "bcryptjs";

export async function addUser(req, res, next) {
  try {
    const data = req.body;
    const userName = data.userName;
    const salt = await bcrypt.genSaltSync(10);
    const password = await data.password;
    const existUser = await UserDb.findOne({ userName: data.userName})
    const details = {
      firstName: data.firstName,
      lastName: data.lastName,
      userName: data.userName,
      password: bcrypt.hashSync(password, salt),
      cnfPassword: data.cnfPassword,
      status: data.status,
    };
    if(existUser){
      res.status(409).json({
        message:"user already exist",
        data:existUser,
      })
    } else{
      const createUser = await UserDb.create(details);
      await UserLoginDb.create({
        userName: data.userName,
        password:bcrypt.hashSync(password, salt),
        userId: createUser._id,
      })
    }
  } catch (err) {
    console.log(err);
    next();
  }
}

export async function getUser(req, res, next) {
  try {
    const getUser = await UserDb.find();
    res.status(200).json({
      message: "get Successfully",
      data: getUser,
    });
  } catch (err) {
    next();
  }
}

export async function deleteUser(req, res, next) {
  try {
    const data = req.params;
    const userId = data.id;
    const deleteUser = await UserDb.findByIdAndDelete(userId);
    res.status(200).json({
      message: "Deleted Successfully",
      data: deleteUser,
    });
  } catch (err) {
    next();
  }
}

export async function updateUser(req, res, next) {
  try {
    const data = req.body;
    const id = req.params.id;
    const details = {
      firstName: data.firstName,
      lastName: data.lastName,
      userName: data.userName,
      password: data.password,
      cnfPassword: data.cnfPassword,
      status: data.status,
    };
    const updateUser = await UserDb.findByIdAndUpdate(id, details, {
      new: true,
    });
    res.status(200).json({
      message: "Updated Successfully",
      data: updateUser,
    });
  } catch (err) {
    next();
  }
}
