import jwt from 'jsonwebtoken';
import models from '../models';

const secretKey = 'test' // TO PUT IN A ENV VARIABLE


export default{
    encode: async (_id)=>{
        const token = await jwt.sign({_id:_id}, secretKey,{expiresIn:'10'});
        return token;
    },
    decode: async (token)=>{
        try{
            const {_id} = await jwt.verify(token, secretKey);
            const user = await models.User.findOne({_id,state:1});
            user ? user : false
        }catch(e){
            return false
        }
    }
}