import {Sequelize} from 'sequelize';
import dotenv from 'dotenv'
dotenv.config()

const sequelize = new Sequelize(
    process.env.DBNAME,
    process.env.DBUSERNAME,
    process.env.DBPASSWORD,
    {
        host:process.env.DBHOST,
        dialect:'mysql',
        logging: false
    }
)

export default sequelize