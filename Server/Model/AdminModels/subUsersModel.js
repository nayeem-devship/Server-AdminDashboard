import mongoose from "mongoose";

const { Schema, model } = mongoose;

const subUsers = new Schema({
  firstName: String,
  lastName: String,
  userName: String,
  password: String,
  cnfPassword: String,
  status: String,
},
);

subUsers.set("autoIndex", true);

const SubUserDb = model("subUsers", subUsers);
SubUserDb.createIndexes();

export default SubUserDb;
