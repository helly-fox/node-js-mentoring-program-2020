import winston from 'winston';

const options = {
    file: {
        level: 'info',
        filename: `${__dirname}/../logs/app.log`,
        handleExceptions: true,
        json: true,
        maxsize: 5242880, // 5MB
        maxFiles: 1,
    },
    console: {
        level: 'info',
        handleExceptions: true,
        json: false,
        colorize: true,
    },
};

const logger = winston.createLogger({
    transports: [
        new winston.transports.File(options.file),
        new winston.transports.Console(options.console),
    ],
    format:
        winston.format.combine(winston.format.colorize(),winston.format.simple(),
            winston.format.timestamp(),
            winston.format.printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`)),
    exitOnError: false,
});

export default logger;
