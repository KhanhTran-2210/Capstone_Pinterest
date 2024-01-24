import { Sequelize } from "sequelize";
import dbConfig from "../config/db.Config.js";

let { dbHost, dbUser, dbPass, dbPort, dbDialect, dbName } = dbConfig;
const sequelize = new Sequelize(dbName, dbUser, dbPass, {
  host: dbHost,
  port: dbPort,
  dialect: dbDialect,
});

export default sequelize;
