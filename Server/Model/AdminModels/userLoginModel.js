import mongoose from "mongoose";

const { Schema, model } = mongoose;

const UserLogin = new Schema({
  role: String,
  userName: String,
  email:String,
  password: String,
  userId: mongoose.Schema.Types.ObjectId,
});

UserLogin.set("autoIndex", true);

const UserLoginDb = model("UserLogin", UserLogin);
UserLoginDb.createIndexes();

export default UserLoginDb;
