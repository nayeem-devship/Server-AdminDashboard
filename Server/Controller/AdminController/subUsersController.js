import SubUserDb from "../../Model/AdminModels/subUsersModel.js";
import bcrypt from "bcryptjs";
import UserLoginDb from "../../Model/AdminModels/userLoginModel.js";

export async function addSubUser(req, res, next) {
  try {
    const data = req.body;
    const salt = await bcrypt.genSaltSync(10);
    const password = await data.password;
    const existUser = await SubUserDb.findOne({ userName: data.userName });
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
      const createUser = await SubUserDb.create(details);
      await UserLoginDb.create({
        role: "subUser",
        userName: data.userName,
        password: bcrypt.hashSync(password, salt),
        userId: createUser._id,
      });
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

export async function getSubUser(req, res, next) {
  try {
    const getUser = await SubUserDb.find();
    res.status(200).json({
      message: "get Successfully",
      data: getUser,
    });
  } catch (err) {
    next();
  }
}

export async function deleteSubUser(req, res, next) {
  try {
    const data = req.params;
    const UserListId = data.id;
    const deleteUser = await SubUserDb.findByIdAndDelete(UserListId);
    res.status(200).json({
      message: "Deleted Successfully",
      data: deleteUser,
    });
  } catch (err) {
    next();
  }
}

export async function updateSubUser(req, res, next) {
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
      role: "subUser",
      userName: data.userName,
      password: bcrypt.hashSync(password, salt),
      userId: updateUser._id,
    });
    res.status(200).json({
      message: "Updated Successfully",
      data: updateUser,
    });
  } catch (err) {
    next();
  }
}
