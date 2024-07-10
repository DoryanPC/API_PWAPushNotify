require("dotenv").config();

module.exports = {
  DBMONGO: process.env.MONGO_DB,
  HOST: process.env.HOST,
  PORT: process.env.PORT,
  VPAID_PU_K: process.env.VAPID_KEYPUBLIC,
  VPAID_PRI_K: process.env.VAPID_KEYPRIVATE
}