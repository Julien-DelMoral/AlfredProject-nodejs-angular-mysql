// imports
import { Request, Response } from 'express';
import config from '../utils/config';
import { Database } from '../helpers/database'
var Bcrypt = require('bcryptjs');

class UserController {

  public async checkIfUserExist(email: string): Promise<boolean> {
    let database = await Database.getInstance()
    let pool = await database.getPool()
    try {
      let result = await pool.query("SELECT * FROM user WHERE email = ?", [email])
      if (result.length)
        return true
      else
        return false
    } catch (error) {
      throw error
    }
  }

  public async Password(req: Request, res: Response) {
    let { password } = req.params;
    let result = Bcrypt.hashSync(password, 10);
    res.send(result);
  }

  public async GenerateToken(req: Request, res: Response) {
    let result = {
      expirationToken: config.expToken.generate(),
      expirationCookie: config.expCookie.generate(),
      token: config.tokenGenerator.generate()
    }
    res.send(result);
  }
}

export const userController = new UserController();