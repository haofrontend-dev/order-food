import { Sequelize } from "sequelize";
import CONFIG from '../config/config';
const sequelize = new Sequelize(CONFIG.MYSQL_DB, CONFIG.MYSQL_USER, CONFIG.MYSQL_PASS,{
    host: CONFIG.MYSQL_HOST,
    dialect: 'mysql',
})

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
 }).catch((error) => {
    console.error('Unable to connect to the database: ', error);
 });

const db = {Sequelize, sequelize}
db.Sequelize = Sequelize
db.sequelize = sequelize

export default db;