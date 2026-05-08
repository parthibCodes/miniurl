import {v4 as uuidv4} from "uuid";

const requetIdMiddleware = (req,res,next) =>{
    req.id = uuidv4();

    next();
};

export default requetIdMiddleware;