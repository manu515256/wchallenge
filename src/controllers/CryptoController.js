import models from '../models';
import axios from 'axios';
import token from '../services/token';
import dotenv from 'dotenv'
dotenv.config()

const URI = process.env.GECKOURI;

const cryptoFilter = arr =>{
    let cryptoData = [];
    arr.forEach(e=>{

        let cryptoElements = new Object;
        cryptoElements.id = e.id;
        cryptoElements.simbolo = e.symbol;
        cryptoElements.precio = e.current_price;
        cryptoElements.nombre = e.name;
        cryptoElements.imagen = e.image;
        cryptoElements.ultimaActualizacion = e.last_updated;

        cryptoData.push(cryptoElements);
    });

    return cryptoData;
}

export default{
    listall: async (req,res,next)=>{
        try{
            let tknDecoded = await token.decode(req.headers.token);
            const regMoneda = await models.User.findOne({where:{id:tknDecoded.dataValues.id}});
            const call = await axios.get(URI,{
                params:{
                    vs_currency: req.query.moneda || regMoneda.moneda,
                    order:`market_cap_${req.query.orden}` || 'desc',
                    per_page:req.query.cantidad || 20,
                }
            });
            res.status(200).send(cryptoFilter(call.data));
        
        }catch(e){
            res.status(500).send("An error ocurred");
            next(e);
        }
    },
    useradd: async(req,res,next)=>{
        try{
            const tkn = await token.decode(req.headers.token);
            let userId = tkn.dataValues.id;
            req.body.user_id = userId
            const reg = await models.UserCrypto.create(req.body)

            res.status(200).send(reg)
        }catch(e){
            res.status(500).send("An error ocurred");
            next(e);
        }
    },
    listbyuser: async(req,res,next)=>{
        try{
            let usersCryptos = [];
            const tkn = await token.decode(req.headers.token);
            let userId = tkn.dataValues.id;
            const cryptos = await models.User.findOne({where:{id:userId},include:[{model:models.UserCrypto,attributes:['crypto_id']}],attributes:["moneda"]})

            if(cryptos != ''){
                cryptos.usercryptos.forEach(e=>{
                    usersCryptos.push(e.crypto_id); 
                });

                 const getcryptos = await axios.get(URI,{
                    params:{
                        vs_currency:cryptos.moneda || 'usd',
                        order:`market_cap_${req.query.orden}` || 'asc',
                        per_page:req.query.cantidad || 25,
                        ids:usersCryptos.join(',')
                    }
                });
                res.status(200).send(cryptoFilter(getcryptos.data))
            }else{
                res.status(404).send("No entries")
            }
        }catch(e){
            res.status(500).send("An error ocurred");
            next(e);
        }
    },
    remove: async (req,res,next)=>{
        try {
            const tkn = await token.decode(req.headers.token);
            const reg = await models.UserCrypto.destroy({where:{crypto_id:req.body.crypto_id,user_id:tkn.id}})
            res.status(200).send({message:"Coin deleted",reg})
        }catch(e){
            res.status(500).send("An error ocurred");
            next(e);
        }
    }
}
