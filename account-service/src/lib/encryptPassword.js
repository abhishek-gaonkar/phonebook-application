const crypto = require("crypto");

exports.createHash = (password, salt) => {
  if (!password) {
    return "";
  } else {
    try {
      return crypto.createHmac("sha1", salt).update(password).digest("hex");
    } catch (error) {
      return "";
    }
  }
};
