import { Knex, knex } from 'knex'

// CONFIG
import CONFIG from "../config/config";

const config : Knex.Config = {
    client: CONFIG.MYSQL,
    connection: {
        host: CONFIG.MYSQL_HOST,
        user: CONFIG.MYSQL_USER,
        password: CONFIG.MYSQL_PASS,
        database: CONFIG.MYSQL_DB
    },
    pool: { min: 0, max: 7}
}

export default knex(config)