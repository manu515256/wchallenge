import models from '../models'
import bcrypt from 'bcryptjs'
import token from '../services/token'


export default {
    add: async (req,res,next) => {
        try {
            req.body.password = await bcrypt.hash(req.body.password,10);
            const reg = await models.User.create(req.body);
            res.status(200).json(reg);
        } catch(e){
            res.status(500).send("Failed to create user");
            next(e);
        }
    },
    update: async (req,res,next) => {
        try {
            let pass = req.body.password;
            const reg0 = await models.User.findOne({_id:req.body._id});
            if(pass != reg0.password)
                req.body.password = await bcrypt.hash(req.body.password,10);

            const reg = await models.User.findByIdAndUpdate({_id:req.body._id},{rol:req.body.rol, name:req.body.name, surname:req.body.surname, username:req.body.username, password:req.body.password});

            res.status(200).send(reg);

        }catch(e){
            res.status(500).send("An error courred");
            next(e);
        }
    },
    remove: async (req,res,next) =>{
        try{
            const reg = await models.User.findByIdAndDelete({_id:req.body._id},{state:1});
            res.status(200).json(reg);
        }catch(e){
            res.status(500).send("An error ocurred");
            next(e);
        }
    },

    login: async (req,res,next) =>{
        try {
            const user = await models.User.findOne({username:req.body.username, state:1});
            if(user){
                let match = bcrypt.compare(req.body.password, user.password);
                if(match){
                    let getToken = await token.encode(user._id)
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