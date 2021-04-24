import moment from 'moment'
import morgan from 'morgan'
import chalk from 'chalk'
import environment  from '../environments/environment'

export enum LogStyle{
    succes,
    info,
    warning,
    error
}


export class Logger {

    private static instance: Logger

    constructor() {
        console.log('┌────────────────────────────────────────────┐');
        console.log('|               CONFIGURATION                |');
        console.log('└────────────────────────────────────────────┘');
        if (environment.name == 'development') {
            console.log(' Environment   ' + chalk.yellow(environment.name.toUpperCase()));
            console.log(' Database      ' + chalk.yellow(environment.db.host.toUpperCase()));
            console.log(' Port          ' + chalk.yellow(environment.app.port));
        }
        else {
            console.log(' Environment   ' + environment.name.toUpperCase());
            console.log(' Database      ' + environment.db.host.toUpperCase());
            console.log(' Port          ' + environment.app.port);
        }
        console.log('┌────────────────────────────────────────────┐');
        console.log('|                    LOGS                    |');
        console.log('└────────────────────────────────────────────┘');
    }

    public static getInstance() {
        if (!Logger.instance)
            Logger.instance = new Logger();
        return Logger.instance;
    }

    public printLog(style: LogStyle, log: string) {
        let trimmedLog = log
        if(log.length > 50)
            trimmedLog = log.substring(0,50)+"..."

        if (environment.name !== 'development')
            return console.log(this.getDate() + trimmedLog);    
        if (style == LogStyle.info)
            return console.log(chalk.gray(this.getDate()) + trimmedLog);
        if (style == LogStyle.succes)
            return console.log(chalk.gray(this.getDate()) + chalk.green(trimmedLog));
        if (style == LogStyle.warning)
            return console.log(chalk.gray(this.getDate()) + chalk.yellow(trimmedLog));
        if (style == LogStyle.error)
            return console.log(chalk.gray(this.getDate()) + chalk.red(trimmedLog));
    }

    public config() {
        morgan.token('urlOriginal', function getUrlToken(req) {
            return req.originalUrl;
        });
        if (environment.name == 'development') {
            morgan.token('statusColor', (req, res, args) => {
                var status = res.statusCode;
                var color = status >= 500 ? 31 // red
                    : status >= 400 ? 33 // yellow
                        : status >= 300 ? 36 // cyan
                            : status >= 200 ? 32 // green
                                : 0; // no color
                return '\x1b[' + color + 'm' + status + '\x1b[0m';
            });
            morgan.token('timeColored', () => {
                var time = chalk.gray(this.getDate());
                return time;
            });
            morgan.token('trimedUrl', (req, res, args) => {
                var trimedUrl = req.originalUrl;
                if(trimedUrl.length>50)
                    trimedUrl = trimedUrl.substring(0,50)+"..."
                return trimedUrl;
            });
            morgan.format('custom', ':timeColored\x1b[32m:method\x1b[0m \x1b[0m:trimedUrl\x1b[0m :statusColor - :response-time ms');
        }
        else {
            morgan.token('time', () => {
                var time = this.getDate();
                return time;
            });
            morgan.format('custom', ':time:method :urlOriginal  :status - :response-time ms');
        }
    }
    public getDate() { return '[' + moment().format('DD/MM/YYYY-HH:mm:ss') + '] '; }
}