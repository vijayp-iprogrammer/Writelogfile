const app = require('express')();
// const log4js = require('log4js');

const http = require('http').createServer(app);
const io = require('socket.io')(http);

const port = process.env.PORT || 3000;
const winston = require('winston');
const CustomTransport = require('./CustomTransport');
require('winston-daily-rotate-file');

// const transport = new (winston.transports.DailyRotateFile)({
//     filename: 'DebugLog.json',
//     maxSize: '10000',
//     maxFiles: '14d'
//   });

const logger = winston.createLogger({
    format: winston.format.json(),
    transports: [
        new CustomTransport({
            filename: 'DebugLog.json',
            handleExceptions: true
        }),
        // transport
    ],
});

// log4js.configure({
//     appenders: { everything: { type: 'file', filename: 'DebugLog.json', maxLogSize: 5000, backups:5, layout: { type: 'messagePassThrough' } } },
//     categories: { default: { appenders: ['everything'], level: 'info' } }
//   });


// const logger = log4js.getLogger('everything');

app.get('/', function(req, res){
    res.send('Hello World!');
});

io.on('connection', function(socket){
    console.log('client connected');
    socket.on('logmessage', function(msg){
        //console.log('message: ' + msg);
        logger.info(JSON.parse(msg));
        // logger.error(JSON.parse(msg));
    });
});


http.listen(port, function(){
  console.log('server listening on '+ port);
});