const Transport = require('winston-transport');
const util = require('util');
const fs = require('fs');

module.exports = class CustomTransport extends Transport {
    constructor(opts) {
        super(opts);
        this.filename = opts.filename;
        this.setup();
        this.fileCount = 1;
    }

    initialize() {
        try {
            fs.writeFileSync(this.filename, [], 'utf8');
        } catch (error) {
            console.log(error);
        }
    }

    setup() {
        // This checks if the file exists
        if (fs.existsSync(this.filename)) {
            // The content of the file is checked to know if it is necessary to adapt the array
            try {
                const data = fs.readFileSync(this.filename, 'utf8');
                // If the content of the file is not an array, it is set
                const content = JSON.parse(data);
                if (!Array.isArray(content)) {
                    this.initialize();
                }
            } catch (error) {
                this.initialize();
                console.log(error);
            }
        }
        // Otherwise create the file with the desired format
        else {
            this.initialize();
        }
    }

    readLog() {
        let data = null;
        try {
            data = fs.readFileSync(this.filename, 'utf8');
        } catch (error) {

            console.log(error);
        }
        return data;
    }
    getFilesizeInBytes() {
        const stats = fs.statSync(this.filename);
        const fileSizeInBytes = stats.size;
        return fileSizeInBytes;
    }
    writeLog(info) {
        
        if(this.getFilesizeInBytes() > 5000){
           // fs.renameSync(`${this.filename-this.fileCount}`, this.filename);            
            this.initialize();
        }
        const data = this.readLog();
        let arr = [];
        if (data) {
            arr = JSON.parse(data);
        }
        //add data
        arr.push(info);
        //convert it back to json
        const json = JSON.stringify(arr);
        try {
            // Writing the array again
            fs.writeFileSync(this.filename, json, 'utf8');
        } catch (error) {
            console.log(error);
        }
    }

    log(info, callback) {
        setImmediate(() => {
            this.emit('logged', info);
        });
        // Perform the writing
        this.writeLog(info);

        callback();
    }
};