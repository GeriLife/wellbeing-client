const DotEnv = require("dotenv");
var shell = require("shelljs");
var is3000On = shell.exec("lsof -t -i :3000 -s TCP:LISTEN").stdout;

module.exports = function() {
  if (!!is3000On) {
    return { ...DotEnv.config().parsed, BASE_URL: "http://127.0.0.1:3000" };
  }
  return DotEnv.config().parsed;
};
