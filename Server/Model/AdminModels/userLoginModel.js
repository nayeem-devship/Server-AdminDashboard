import mongoose from "mongoose";

const { Schema, model } = mongoose;

const UserLogin = new Schema({
  userName: String,
  password: String,
  userId: mongoose.Schema.Types.ObjectId,
},
);

UserLogin.set("autoIndex", true);

const UserLoginDb = model("UserLogin", UserLogin);
UserLoginDb.createIndexes();

export default UserLoginDb;
