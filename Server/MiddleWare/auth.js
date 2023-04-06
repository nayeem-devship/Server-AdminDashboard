import _ from "lodash";
import jwt_Decode from "jwt-decode";
import Jwt from "jsonwebtoken";

export async function authenticateToken(req, res, next) {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split("")[1];
    const user = Jwt.verify(token, "secretkey#6^&6");
    req.user = user;
    const data = jwt_Decode(token);
    console.log(data, "data@");
  } else {
    return res.status(400).json({ message: "Authorization required" });
  }
  next();
}

export async function generateToken(payload) {
  var token;
  if (!_.isNull(payload)) {
    token = Jwt.sign(payload, "secretkey#6^&6");
  }
  return token;
}

export async function bcryptEncrypt(password) {
  var salt = 10;
  var pass;
  if (!_.isNull(password)) {
    pass = bcrypt.hashSync(password, salt);
  }
  return pass;
}
