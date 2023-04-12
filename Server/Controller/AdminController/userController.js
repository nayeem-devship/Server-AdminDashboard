import UserLoginDb from "../../Model/AdminModels/userLoginModel.js";
import UserDb from "../../Model/AdminModels/userModel.js";
import bcrypt from "bcryptjs";

export async function addUser(req, res, next) {
  try {
    const data = req.body;
    const salt = await bcrypt.genSaltSync(10);
    const password = await data.password;
    const existUser = await UserDb.findOne({ userName: data.userName });
    const details = {
      firstName: data.firstName,
      lastName: data.lastName,
      userName: data.userName,
      password: bcrypt.hashSync(password, salt),
      cnfPassword: data.cnfPassword,
      status: data.status,
    };
    if (existUser) {
      res.status(409).json({
        message: "user already exist",
        data: existUser,
      });
    } else {
      const createUser = await UserDb.create(details);
      await UserLoginDb.create({
        role:"user",
        userName: data.userName,
        password: bcrypt.hashSync(password,salt),
        userId: createUser._id,
      })
      res.status(200).json({
        message: "User Created SuccessFully",
        data: createUser,
      });
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
    const UserListId = data.id;
    const userId = data.userId;
    const deleteUser = await UserDb.findByIdAndDelete(UserListId);
    await UserLoginDb(userId)
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
    const salt = await bcrypt.genSaltSync(10);
    const password = await data.password;
    const details = {
      firstName: data.firstName,
      lastName: data.lastName,
      userName: data.userName,
      password: bcrypt.hashSync(password, salt),
      cnfPassword: data.cnfPassword,
      status: data.status,
    };
    const updateUser = await UserDb.findByIdAndUpdate(id, details, {
      new: true,
    });
    await UserLoginDb.create({
      role:"user",
      userName: data.userName,
      password: bcrypt.hashSync(password,salt),
      userId: updateUser._id,
    })
    res.status(200).json({
      message: "Updated Successfully",
      data: updateUser,
    });
  } catch (err) {
    next();
  }
}
