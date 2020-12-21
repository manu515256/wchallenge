import models from '../models'
import bcrypt from 'bcryptjs'
import token from '../services/token'


export default {
    add: async (req,res,next) =>{
        try{
            req.body.password = await bcrypt.hash(req.body.password,10);
            const reg = await models.User.create(req.body)
            res.status(200).send(reg)
        }
        catch(e){
            if(e.name == "SequelizeUniqueConstraintError"){
                res.status(500).send({error:"Username already exist"});
                next(e);
            }else if(e.message == "Validation error: Validation isIn on moneda failed"){
                res.status(500).send({error:"Invalid courrency"});
                next(e);
            }
            else{
                res.status(500).send("An error ocurred");
                next(e);
            }
        }
    },
    remove: async (req,res,next)=>{
        try {
            const tkn = await token.decode(req.headers.token);

            const reg0 = await models.UserCrypto.destroy({where:{user_id:tkn.id}})
            const reg = await models.User.destroy({where:{id:tkn.id}})

            res.status(200).send({message:"User deleted",reg})
        }catch(e){
            res.status(500).send("An error ocurred");
            next(e);
        }
    },
    login: async (req,res,next) =>{
        try{
             const user = await models.User.findOne({where:{username:req.body.username}});
            if(user){
                let match = await bcrypt.compare(req.body.password, user.dataValues.password);
                if(match){
                    let getToken = await token.encode(user.id);
                    res.status(200).json({'token':getToken, user});
                }else{
                    res.status(404).send("Wrong password");
                }
            }else{
            res.status(404).send("Wrong username");
            }
        }catch(e){
            res.status(500).send("An error ocurred");
            next(e);
        }
    }
}