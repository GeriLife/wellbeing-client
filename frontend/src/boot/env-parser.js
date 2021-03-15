const DotEnv = require("dotenv");
const execSync = require("child_process").execSync;
let is3000On = false;

try {
  is3000On = execSync("lsof -t -i :3000 -s TCP:LISTEN").toString();
} catch (e) {
  // not running throws error
}

module.exports = function() {
  if (!!is3000On) {
    return { ...DotEnv.config().parsed, BASE_URL: "http://127.0.0.1:3000" };
  }
  return DotEnv.config().parsed;
};
