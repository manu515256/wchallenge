import {Sequelize} from 'sequelize';

const sequelize = new Sequelize(
    'wchallenge3', // ENV
    'root',
    '',
    {
        host:'localhost',
        dialect:'mysql',
        logging: false
    }
)

export default sequelize