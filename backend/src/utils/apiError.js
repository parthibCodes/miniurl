export class apiError extends Error{
    constructor(statusCode,message="something went wrong"){
        super(message);
        this.statusCode = statusCode;
        Error.captureStackTrace(this,this.constructor);
    }
}