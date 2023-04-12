import mongoose from "mongoose";

const { Schema, model } = mongoose;

const UserMenu = new Schema({
  role: String,
  menuName: String,
  menuIcon: String,
  path: String,
  userId: mongoose.Schema.Types.ObjectId,
});

UserMenu.set("autoIndex", true);

const UserMenuDb = model("UserMenu", UserMenu);
UserMenuDb.createIndexes();

export default UserMenuDb;
