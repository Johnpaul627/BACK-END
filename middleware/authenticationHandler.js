import jwt from "jsonwebtoken";
import { getUser } from "../models/usermodel";


const checkToken = async(req, res, next) =>{
    const {authorization} = req.headers;
    if(!authorization){
        res.status(401).json({
            succes: false,
            message: [
                {result : "You do not have permission to acces the app."}

            ]

        })
    }

    const token = authorization.split('')[1];

    try{
         const{id} = jwt.verify(token, process.env.SECRET);
         const [user] = await getUser(id);
        //  req.user = user[0].id;
         next();
    }catch(err){
        res.status(401).json({
            succes: false,
            message: [
                {result : "Request is unauthorized"}
            ]
        })
    }

}
export default checkToken; 