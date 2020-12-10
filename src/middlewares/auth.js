import tokenService from '../services/token'

export default{
    verifyUser: async (req,res,next) =>{
        if(!req.headers.token){
            return res.status(404).send("No token found");
        }
        const response = await tokenService.decode(req.headers.token);
        if(response.rol == 1){
            next();
        }else{
            return res.status(403).send("Not authorized")
        }
    }
}