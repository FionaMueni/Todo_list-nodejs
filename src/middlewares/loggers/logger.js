const winston = require('winston');

// Defining our security level 
const levels = {
    error: 0, 
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
};

const level = () => {
    const isDevelopment = process.env.NODE_ENV || "development";
    return isDevelopment ? "debug" : "warn"
};


// Define different colors for each level\
const colors = {
    error: "red",
    warn: "yellow",
    info: "green",
    http: "magenta",
    debug: "white",
};

// Tell winstone we want to link the colors
winston.addColors(colors);

// choose the aspect of our log customizing the log format

const format = winston.format.combine(
    winston.format.timestamp({
        format: "YYYY-MM-DDTHH:mm:ss"
    }),

    winston.format.colorize({all: true}),

    winston.format.printf(
        (info)=> `${info.timestamp} ${info.level}: ${info.message}`
    )
);

// Define the transports that logger must use to print out the message
const transports = [
    // Allow the user to console/print the message
    new winston.transports.Console(),
    // Allow to print all error level messages inside the all.log file
    new winston.transports.File({
        filename: "logs/error.log",
        level: "error",
    }), 

    // Allow to print all messages inside the all.log file
    new winston.transports.File({
        filename: "logs/all.log",
    }), 
];

const Logger = winston.createLogger({
    level: level(),
    levels: levels,
    format: format,
    transports: transports,
    exitOnError: false,
});

module.exports = Logger;
