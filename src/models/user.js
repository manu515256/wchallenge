import {DataTypes} from 'sequelize';
import db from '../db/db';

const User = db.define('users',{
    id:{type:DataTypes.SMALLINT, primaryKey:true,autoIncrement: true},
    username:{type:DataTypes.STRING,allowNull:false, unique:true},
    password:{type:DataTypes.STRING,allowNull:false},
    moneda:{type:DataTypes.STRING,allowNull:false, validate:{isIn:['ars','usd','eur',]}},
    rol:{type:DataTypes.SMALLINT,defaultValue:1}
});

User.sync().then(()=>{console.log("User table created")}).catch((e)=>{console.log(e)})

export default User