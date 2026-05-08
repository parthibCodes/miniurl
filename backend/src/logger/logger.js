import pino from "pino";

// const transport = pino.transport({
//   targets: [
//     {
//       target: "pino-pretty",
//       options: {
//         destination: 1,
//       },
//     },
//     {
//       target: "pino/file",
//       level: "info",
//       options: {
//         destination: "./logs/app.log",
//       },
//     },
//     {
//       target: "pino/file",
//       level: "error",
//       options: {
//         destination: "./logs/error.log",
//       },
//     },
//     {
//       target: "pino/file",
//       level: "info",
//       options: {
//         destination: "./logs/redirect.log",
//       },
//     },
//   ],
// });

// const logger = pino(
//   {
//     level: "info",
//     timestamp: pino.stdTimeFunctions.isoTime,
//     base: null,
//   },
//   transport,
// );


const appLogger = pino({
  level:"info",
  timestamp:pino.stdTimeFunctions.isoTime,
  base:null
},pino.destination("./logs/app.log"));

const redirectLogger = pino({
  level:"info",
  timestamp:pino.stdTimeFunctions.isoTime,
  base:null
},pino.destination("./logs/redirect.log"));

const errorLogger = pino({
  level:"error",
  timestamp:pino.stdTimeFunctions.isoTime,
  base:null
},pino.destination("./logs/error.log"));

const db_lookup_logger = pino({
  level:"info",
  timestamp:pino.stdTimeFunctions.isoTime,
  base:null
},pino.destination("./logs/url_create.log"));

const cacheLogger = pino({
  level:"info",
  timestamp:pino.stdTimeFunctions.isoTime,
  base:null
},pino.destination("./logs/cache.log"));

export {appLogger,redirectLogger,errorLogger,db_lookup_logger,cacheLogger};
