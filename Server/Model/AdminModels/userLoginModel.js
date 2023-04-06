import mongoose from "mongoose";

const { Schema, model } = mongoose;

const userLogin = new Schema({
  userName: String,
  password: String,
  userId: mongoose.Schema.Types.ObjectId
});

userLogin.set("autoIndex", true);

const UserLoginDb = model("userLogin", userLogin);
UserLoginDb.createIndexes();

export default UserLoginDb;
