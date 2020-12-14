import models from '../models';
import axios from 'axios';
import token from '../services/token';

const URI = 'https://api.coingecko.com/api/v3/coins/markets' // ENV

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
    list: async (req,res,next)=>{
        try{
            let tknDecoded = await token.decode(req.headers.token);
            const regMoneda = await models.User.findOne({where:{id:tknDecoded.dataValues.id}});
            
            const call = await axios.get(URI,{
                params:{
                    vs_currency:regMoneda.moneda,
                    order:`market_cap_${req.query.orden}`,
                    per_page:req.query.porpagina,
                    page:req.query.pagina,
                }
            });
            res.status(200).send(cryptoFilter(call.data));
        
        }catch(e){
            next(e)
            res.status(500).send("An error ocurred");
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
            const cryptos = await models.UserCrypto.findAll({where:{user_id:userId},include:[{model:models.User,attributes:['moneda']}],attributes:["crypto_id"]},)
           //MEJORAR SI NO CARGO CRYPTO
             cryptos.forEach(e=>{
                usersCryptos.push(e.crypto_id); 
            });

             const getcryptos = await axios.get(URI,{
                params:{
                    vs_currency:cryptos[0].user.moneda,
                    order:`market_cap_${req.query.orden}`,
                    per_page:req.query.porpagina,
                    page:req.query.pagina,
                    ids:usersCryptos.join(',')
                }
            });
            res.status(200).send(cryptoFilter(getcryptos.data))
            
        }catch(e){
            res.status(500).send("An error ocurred");
            next(e);
        }
    },

}
