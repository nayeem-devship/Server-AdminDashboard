import mongoose from "mongoose";

const { Schema, model } = mongoose;

const subUsers = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  userName: String,
  password: String,
  cnfPassword: String,
  status: String,
  UserList: {
    type: Boolean,
  },
  SubUserList: {
    type: Boolean,
  },
});

subUsers.set("autoIndex", true);

const SubUserDb = model("subUsers", subUsers);
SubUserDb.createIndexes();

export default SubUserDb;
