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
    const userId = data.userId;
    const deleteUser = await SubUserDb.findByIdAndDelete(UserListId);
    await UserLoginDb(userId);
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
    const userId = req.params.userId;
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
    const LoginDetails = {
      userName: data.userName,
      password: bcrypt.hashSync(password, salt),
    };
    const updateUser = await SubUserDb.findByIdAndUpdate(id, details, {
      new: true,
    });
    await UserLoginDb.findByIdAndUpdate(userId, LoginDetails, {
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
