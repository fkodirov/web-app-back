const Sequelize = require("sequelize");
// const mysql = require("mysql2");
const dbConfig = {
  host: "localhost",
  user: "root",
  database: "users",
  password: "",
};

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.user,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: "mysql",
  }
);
module.exports = sequelize;
