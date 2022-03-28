const { createLogger, transports, format } = require('winston');
const morgan = require('morgan');
const SlackHook = require("winston-slack-webhook-transport");

require('winston-mongodb');

//TODO maybe we want to remove sensitive headers like authorization later
const obtenerLoggableBody = (req, error) => {
    const { url, method, body, headers } = req;
    const toReturn = { url, method, body, headers };
    if (error) Object.assign(toReturn, { error });

    return toReturn;
};

const logger = (requestId) => createLogger({
    format: format.combine(
        format.label({ label: requestId, message: true }),
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
        format.metadata({ fillExcept: ['message', 'level', 'timestamp', 'label'] })
    ),
    transports: [
        new transports.MongoDB({
            format: format.combine(
                format.json(),
            ),
            db: process.env.MONGODB_URI,
            options: {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            },
            level: 'error',
            collection: 'logs'
        }),
        new SlackHook({
            webhookUrl: process.env.SLACK_HOOK_URL
        })
    ],
    exitOnError: false,
});

const httpLogger = () => {
    const logFormat = format.printf(info => `${info.timestamp} ${info.level} [${info.label}]: ${info.message}`);

    const logger = createLogger({
        format: format.combine(
            format.label({ label: 'HTTPLogger' }),
            format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
            format.metadata({ fillExcept: ['message', 'level', 'timestamp', 'label'] })
        ),
        transports: [
            new transports.Console({
                format: format.combine(
                    format.colorize(),
                    logFormat,
                ),
            })
        ],
        exitOnError: false,
    });

    logger.stream = {
        write: message => logger.info(message.substring(0, message.lastIndexOf('\n')))
    };


    return morgan(
        ':method :url :status :response-time ms - :res[content-length]',
        { stream: logger.stream }
    );
}

module.exports = {
    logger,
    httpLogger: httpLogger(),
    obtenerLoggableBody
};