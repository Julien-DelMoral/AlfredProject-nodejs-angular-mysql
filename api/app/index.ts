import cors from 'cors'
import express, { Application } from 'express'
import http from 'http'
import morgan from 'morgan'
import path from 'path'
import userRoutes from './routes/userRoutes'
import { Database } from './helpers/database'
import environment  from './environments/environment'
import { Logger, LogStyle } from './helpers/logger'

class Server {

  public app: Application;
  public logger: Logger;

  constructor() {
    this.app = express();
    this.logger = Logger.getInstance();
    this.config();
    this.routes();
  }

  config() {
    this.app.set('port', process.env.PORT || environment.app.port);
    this.logger.config();
    this.app.use(morgan('custom', {
        skip: function (req, res) {
            if (req.method == 'OPTIONS')
                return true;
            return false;
        }
    }));
    this.app.use(cors({
      origin: [environment.app.frontUrl],
      credentials: true
    }));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(express.static(path.join(__dirname, 'public')));
  }

  routes() {
    this.app.use('/api/user', userRoutes);
  }

  async start() {
    var server = http.createServer(this.app);
    server.listen(this.app.get('port'), async () => {
      this.logger.printLog(LogStyle.succes,'Server listening on port ' + this.app.get('port'));
    });
    
    let database =  await Database.getInstance()
    if(await database.checkDatabaseConnection())
      this.logger.printLog(LogStyle.succes,'Database connected to ' + environment.db.host.toUpperCase());
    else
      this.logger.printLog(LogStyle.error,'Database connection to ' + environment.db.host.toUpperCase() + ' failed');
  }
}

const server = new Server();
server.start();