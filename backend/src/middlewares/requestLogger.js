import pinohttp from "pino-http";
import {appLogger} from "../logger/logger.js";
import {v4 as uuidv4} from "uuid";

const requestLogger = pinohttp({
    logger:appLogger, 
    genReqId:(req) => {
        if(!req.id)req.id = uuidv4();   
        return req.id;
    },
    // customProps:(req) =>({
    //     req_id: req.id
    // }),
    customLogLevel:(req,res,err)=>{
        if(res.statusCode >= 500 || err)return "error";
        if(res.statusCode >= 400)return "warn";
        return "info";
    }
});

export default requestLogger;