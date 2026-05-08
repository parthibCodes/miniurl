import {redirectLogger,db_lookup_logger,errorLogger,cacheLogger} from "./logger.js";

export const logRedirect = (req,data) =>{
    redirectLogger.info({
        event:"redirect",
        reqId:req.id,
        ...data
    });
};

export const logCache = (req,data) =>{
    cacheLogger.info({
        event:"cache",
        reqId:req.id,
        ...data
    });
};

export const logDB = (req,data) =>{
    db_lookup_logger.info({
        event:"url_created",
        reqId:req.id,
        ...data
    });
};

export const logError = (req,data) =>{
    errorLogger.error({
        event:"error",
        reqId:req.id,
        ...data
    });
};