// imports
import { Request, Response } from 'express';
import config from '../utils/config';
import jwt from "jsonwebtoken";
import { Database } from '../helpers/database'
import { Mailer, Mail } from '../helpers/mail'
import { userController } from '../controllers/userController';
import moment from 'moment';
import environment from '../environments/environment'
import { Logger, LogStyle } from '../helpers/logger'

var Cookies = require("cookies");
var Bcrypt = require('bcryptjs');

const logger = Logger.getInstance();

class LoginController {

  public async authenticate(req: Request, res: Response) {
    let database = await Database.getInstance()
    let pool = await database.getPool()
    let username = req.body.username
    let password = req.body.password

    try {
      let result = await pool.query("SELECT * FROM user WHERE email = ?", [username])
      let user = result[0]

      if (!user)
        return res.status(401).json({ status: 401, message: 'Identifiants incorrect' })

      let passwordIsValid = await Bcrypt.compare(password, user.password)
      if (!passwordIsValid)
        return res.status(401).json({ status: 401, message: 'Identifiants incorrect' })

      if (user.confirmed_at === null || user.confirmed_at === '')
        return res.status(403).json({ status: 403, message: 'Compte non confirmé' })

      let payload = {
        iss: environment.token.issuer,
        sub: user.id,
        exp: config.expToken.generate(),
        iat: Date.now(),
        name: user.username,
        password: user.password,
        csrf_token: config.tokenGenerator.generate()
      };

      let token = jwt.sign(payload, environment.token.secret);

      res.cookie('access_token', token, {
        expires: config.expCookie.generate(),
        httpOnly: true
      });

      return res.status(200).json(payload.csrf_token);

    } catch (error) {
      console.log(error)
      return res.status(501).json(error);
    }
  }

  public async logout(req: Request, res: Response) {
    return res.status(200).json({ message: 'Logout Successfull' })
  }

  public isAuthenticated(req: any, res: any, next: any) {
    let access_token = new Cookies(req).get('access_token');
    let csrf_token = req.headers.authorization.split(' ')[1];
    jwt.verify(access_token, environment.token.secret, { issuer: environment.token.issuer, ignoreExpiration: false }, function (err: any, decoded: any) {
      if (err) {
        console.log('Invalid token');
        return res.status(401).json(err);
      }
      if (decoded.exp <= Date.now()) {
        console.log('Token has expired');
        return res.status(401).json({ message: 'Token has expired.' });
      }
      if (JSON.stringify(decoded.csrf_token) != csrf_token) {
        console.log('CSRF attack detected.');
        return res.status(401).json({ message: 'CSRF attack detected.' });
      }
      next();
    });
  }

  public async register(req: Request, res: Response) {
    let logger = Logger.getInstance()
    let database = await Database.getInstance()
    let pool = await database.getPool()
    let email = req.body.email;
    let name = req.body.name;
    let password = req.body.password;
    let passwordHash = Bcrypt.hashSync(password, Bcrypt.genSaltSync(10));

    try {
      let userExist = await userController.checkIfUserExist(email);
      if (userExist) {
        console.log('Username ' + email + ' already exist.')
        return res.status(409).json({ status: 409, message: 'Cette adresse mail est déja utilisée.' });
      }

      await pool.query(`INSERT INTO user (email, password, name) VALUES('${email}','${passwordHash}','${name}')`)
      console.log("User " + email + " registered.")
      res.status(201).json({ status: 201, message: "Votre compte à été crée" })

      let payload = {
        iss: environment.token.issuer,
        sub: email,
        exp: config.expTokenMail.generate(),
        iat: Date.now(),
        aud: "emailConfirmation",
      };

      let token = jwt.sign(payload, environment.token.secret);

      let mailer = Mailer.getInstance()
      let mail: Mail = {
        from: `${environment.mail.from_name}<${environment.mail.from_adresse}>`,
        to: email,
        subject: 'Alfred : Finalisez votre inscription !',
        templatePath: 'app/templates/confirm-email.min.html',
        templateValues: {
          username: name,
          confirm_email_link: `${environment.app.apiUrl}/user/confirmEmail/` + token
        }
      }

      
      try {
        await mailer.sendMail(mail);
        logger.printLog(LogStyle.succes,'Email sent to : ' + email);
      } catch (error) {
        logger.printLog(LogStyle.error,error);
      }
      

    } catch (error) {
      logger.printLog(LogStyle.error,error.code);
      return res.status(501).json(error.code);
    }
  }

  public async sendConfirmEmail(req: Request, res: Response) {
    let database = await Database.getInstance()
    let pool = await database.getPool()
    let email = req.body.email;

    try {
      let result = await pool.query("SELECT * FROM user WHERE email = ?", [email])
      let user = result[0]

      if (!user)
        return res.status(401).json({ status: 401, message: 'Identifiants incorrect' })
      if (user.confirmed_at !== null && user.confirmed_at !== '')
        return res.status(401).json({ status: 401, message: 'Your email is already verified. Please login.' })

      let payload = {
        iss: environment.token.issuer,
        sub: email,
        exp: config.expTokenMail.generate(),
        iat: Date.now(),
        aud: "emailConfirmation",
      };

      let token = jwt.sign(payload, environment.token.secret);

      let mailer = Mailer.getInstance()
      let mail: Mail = {
        from: `"${environment.mail.from_name}" <${environment.mail.from_adresse}>`,
        to: email,
        subject: 'Alfred : Finalisez votre inscription !',
        templatePath: 'app/templates/confirm-email.min.html',
        templateValues: {
          username: user.name,
          confirm_email_link: environment.app.apiUrl + '/user/confirmEmail/' + token
        }
      }
      
      await mailer.sendMail(mail);
      res.status(200).json({ status: 200, message: 'Email envoyé' });
      Logger.getInstance().printLog(LogStyle.succes, 'Email sent to : ' + email);
     
      

    } catch (error) {
      res.status(501).json({status: 501, message:"L'envoi de mail a échoué"});
      Logger.getInstance().printLog(LogStyle.error, error.message);
    }
  }

  public async confirmEmail(req: Request, res: Response) {
    let database = await Database.getInstance()
    let pool = await database.getPool()
    let token = req.params.token;

    jwt.verify(token, environment.token.secret, { issuer: environment.token.issuer, ignoreExpiration: false }, async function (err: any, decoded: any) {
      if (err) {
        logger.printLog(LogStyle.warning,'Invalid token');
        return res.redirect(environment.app.frontUrl+'/login')
      }
      if (decoded.exp <= Date.now()) {
        logger.printLog(LogStyle.warning,'Token has expired')
        return res.redirect(environment.app.frontUrl+'/login')
      }

      let confirmed_at = moment().format('YYYY-MM-DD HH:mm:ss')

      try {
        pool.query(`UPDATE user SET confirmed_at = '${confirmed_at}'  WHERE email = '${decoded.sub}'`)
        return res.redirect(environment.app.frontUrl+'/login')
      } catch (error) {
        console.log(error);
        return res.redirect(environment.app.frontUrl+'/login')
      }
    });
  }

  public async resetPassword(req: Request, res: Response) {
    let database = await Database.getInstance()
    let pool = await database.getPool()
    let username: string = req.body.username;

    try {
      let result = await pool.query("SELECT * FROM user WHERE email = ?", [username])
      let user = result[0]

      if (!user)
        return res.status(401).json({ status: 401, message: 'Identifiants incorrect' })
      if (user.confirmed_at === null || user.confirmed_at === '')
        return res.status(401).json({ status: 401, message: 'Your email is not verified. Please verify your email and try again.' })
      else {
        let payload = {
          iss: environment.token.issuer,
          sub: username,
          exp: config.expTokenMail.generate(),
          iat: Date.now(),
          aud: "resetPassword",
        };

        let token = jwt.sign(payload, environment.token.secret);

        let mailer = Mailer.getInstance()
        let mail: Mail = {
          from: `"${environment.mail.from_name}" <${environment.mail.from_adresse}>`,
          to: username,
          subject: 'Alfred : Mot de passe oublié',
          templatePath: 'app/templates/reset-password.min.html',
          templateValues: {
            username: result[0].name,
            password_reset_link: environment.app.frontUrl+'/changePassword?username=' + username + '&token=' + token
          }
        }
        try {
          await mailer.sendMail(mail);
          console.log('Email sent to : ' + username);
          res.status(200).json({ status: 200, message: 'Email envoyé' });
        } catch (error) {
          console.log(error.message);
          res.status(500).json({ status: 500, message: error.message });
        }
      }
    } catch (error) {
      console.log(error);
      return res.status(501).json(error);
    }
  }

  public async changePassword(req: Request, res: Response) {
    let database = await Database.getInstance()
    let pool = await database.getPool()
    let username = req.body.username;
    let password = req.body.password;
    let passwordHash = Bcrypt.hashSync(password, Bcrypt.genSaltSync(10));
    let token = req.body.token;

    jwt.verify(token, environment.token.secret, { issuer: environment.token.issuer, ignoreExpiration: false }, async function (err: any, decoded: any) {
      if (err) {
        console.log('Invalid token');
        return res.status(401).json(err);
      }
      if (decoded.exp <= Date.now()) {
        console.log('Token has expired');
        return res.status(401).json({ message: 'Token has expired.' });
      }
      if (decoded.sub != username) {
        console.log('Invalid username');
        return res.status(401).json({ message: 'Username is not valid.' });
      }
      try {
        pool.query(`UPDATE user SET password = '${passwordHash}'  WHERE email = '${username}'`)
        return res.send({ message: 'Mot de passe modifié' })
      } catch (error) {
        console.log(error);
        return res.status(501).json(error);
      }
    });
  }
}

export const loginController = new LoginController();