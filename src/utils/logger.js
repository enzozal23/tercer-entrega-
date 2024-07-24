import winston from "winston";
import { objectConfig } from '../config/index.js'

const { modo } = objectConfig

const customLevels = {
    levels: {
        fatal: 0,
        error: 1,
        warning: 2,
        info: 3,
        http: 4,
        debug: 5
    },

    colors: {
        fatal: 'red',
        error: 'red',
        warning: 'yellow',
        info: 'green',
        http: 'magenta',
        debug: 'blue'
    }
}
let level

if (modo === 'development') {
    level = 'debug'
}
if (modo === 'production') {
    level = 'info'
}

export const logger = winston.createLogger({
    levels: customLevels.levels,

    transports:
        [
            new winston.transports.Console({
                level: level,
                format: winston.format.combine(
                    winston.format.colorize({ colors: customLevels.colors }),
                    winston.format.simple()
                )
            }),
            new winston.transports.File({
                filename: './errors.log',
                level: 'error',
                format: winston.format.simple()
            })
        ]
})

logger.info(modo)
export const addLogger = (req, res, next) => {
    req.logger = logger
    req.logger.http(`${req.method} en ${req.url} - ${new Date().toLocaleTimeString()}`)
    next()
}