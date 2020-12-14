import {DataTypes} from 'sequelize';
import db from '../db/db';

const userCrypto = db.define('usercrypto',{
    id:{type:DataTypes.SMALLINT, primaryKey:true,autoIncrement: true},
    user_id:{type:DataTypes.SMALLINT},
    crypto_id:{type:DataTypes.STRING}
});

userCrypto.sync().then(()=>{console.log("usercrypto table created")}).catch(e=>{console.log(e)});


export default userCrypto;