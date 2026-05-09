import swaggerAutoGen from "swagger-autogen";

const doc = {
    info:{
        title:"URL shortner API",
        description:"API for URL shortner service",
    },
    host:"localhost:5000",
    basePath:"/api/v0"
}

const outputFile = "../../swagger-output.json";
const routes = ["../routes/longtoshorturl.routes.js","../routes/shorttolongurl.routes.js"];

swaggerAutoGen()(outputFile,routes,doc);