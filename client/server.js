const io = require('socket.io-client');
const socket = io.connect('http://localhost:3000');
const obj = {
    "executionBeginAt":"2020-03-12 17:07:43.640",
    "debugMessages":[],
    "executionCompletedAt":"2020-03-12 17:07:43.642",
    "message":" The actual string 'Qualitia' and the expected string 'qualitia' are equal. With CaseSensitive comparison as : FALSE",
    "debugLogFileName":"DebugLog-1.json",
    "errorMessages":[],
    "infoLogFileName":"InfoLog-1.json",
    "errorLogFileName":"ErrorLog-1.json",
    "stepItinerary":"Iterations >> Iterations >> Simple_TaskIterations >> 395415aeefc24d518efb809733f20bf4",
    "reportItinerary":"Iterations >> Iterations >> Simple_TaskIterations >> 395415aeefc24d518efb809733f20bf4",
    "action":"CompareString",
    "messages":[],
    "logId":"Simple_TaskIterationsþ2þ1þ395415aeefc24d518efb809733f20bf4þ1þ1þ395415aeefc24d518efb809733f20bf4þCompareString",
    "status":"PASSED"
};

socket.on('connect', function () {
    setInterval(() => {
        socket.emit('logmessage', JSON.stringify(obj));
        console.log('new mwssage');
    }, 2000);

  
});
