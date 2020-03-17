const app = require("express")();
const log4js = require("log4js");
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const port = process.env.PORT || 3000;
// const winston = require('winston');
// const CustomTransport = require('./CustomTransport');
// require('winston-daily-rotate-file');

// const dailyRotateFileTransport = new winston.transports.DailyRotateFile({
//     filename: 'DebugLog.json',
//     maxSize: '2k',
//     maxFiles: '14d',
//     prepend: true,
//     level:'info'
//   });

// const logger = winston.createLogger({
//     format: winston.format.json(),
//     transports: [
//        // dailyRotateFileTransport,
//         new CustomTransport({
//             filename: dailyRotateFileTransport.filename,
//             handleExceptions: true
//         })
//     ],
// });

log4js.addLayout("json", function(config) {
  return function(logEvent) {
    return JSON.stringify(logEvent) + config.separator;
  };
});

log4js.configure({
  appenders: {
    // filetype: {
    //   type: "file",
    //   layout: {
    //     type: "pattern",
    //     pattern: "[{ln}]",
    //     tokens: {
    //       ln: function(data) {
    //         return data;
    //       }
    //     }
    //   }
    // },
    everything: {
      type: "file",
      filename: __dirname + "/DebugLog.json",
      layout: { type: "json", separator: "," },
      maxLogSize: 5000,
      backups: 3,
      keepFileExt: true
    }
  },
  categories: {
    default: { appenders: ["everything"], level: "info" }
  }
});

const logger = log4js.getLogger();

io.on("connection", function(socket) {
  console.log("client connected");
  socket.on("logmessage", function(msg) {
    //console.log('message: ' + msg);
    logger.info(JSON.parse(msg));
    // logger.error(JSON.parse(msg));
  });
});

http.listen(port, function() {
  console.log("server listening on " + port);
});
