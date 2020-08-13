const DotEnv = require("dotenv");

module.exports = function() {
  return DotEnv.config().parsed;
};
