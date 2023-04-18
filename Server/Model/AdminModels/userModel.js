import mongoose from "mongoose";

const { Schema, model } = mongoose;

const addUser = new Schema({
  firstName: String,
  lastName: String,
  email:String,
  userName: String,
  password: String,
  cnfPassword: String,
  status: String,
},
);

addUser.set("autoIndex", true);

const UserDb = model("addUser", addUser);
UserDb.createIndexes();

export default UserDb;
