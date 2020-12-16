import jwt from 'jsonwebtoken';
import models from '../models';
import dotenv from 'dotenv'
dotenv.config()

const secretKey = process.env.TKNSECRETKEY;

export default{
    encode: async (id)=>{
        const token = await jwt.sign({id:id}, secretKey,{expiresIn:'10d'});
        return token;
    },
    decode: async (token)=>{
        try{
            const {id} = await jwt.verify(token, secretKey);
            const user = await models.User.findOne({where:{id:id}});
            if(user){
                return user
            }else{
                return false
            }
        }catch(e){
            return false
        }
    }
}