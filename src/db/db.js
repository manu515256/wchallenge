import {Sequelize} from 'sequelize';

const sequelize = new Sequelize(
    'wchallengedb', // ENV
    'root',
    '',
    {
        host:'localhost',
        dialect:'mysql',
        logging: false
    }
)

export default sequelize