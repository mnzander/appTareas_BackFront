const crypto = require("crypto"); //Traemos crypto

const secret = "Token";

const hash = crypto
  .createHmac("sha256", secret)
  .update("soy otro campo")
  .digest("hex");

console.log(hash);