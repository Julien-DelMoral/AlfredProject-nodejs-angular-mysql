import { Router } from 'express';
import { customerController } from '../controllers/customerController';

class UsersRoutes {

  public router: Router = Router();
  
  constructor() {
    this.config();
  }

  config(): void {
    
    /*  POST  */
    
    
    /*  GET  */                               
    
  }
}

const usersRoutes = new UsersRoutes();
export default usersRoutes.router;