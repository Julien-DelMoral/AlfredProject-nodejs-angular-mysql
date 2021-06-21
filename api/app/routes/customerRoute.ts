import { Router } from 'express';
import { customerController } from '../controllers/customerController';
import { loginController } from '../controllers/loginController';

class UsersRoutes {

  public router: Router = Router();
  
  constructor() {
    this.config();
  }

  config(): void {
    
    /*  POST  */
                               
    /*  GET  */
    this.router.get('/customers/:id', loginController.isAuthenticated, customerController.getCustomersByUserId);  
  }
}

const usersRoutes = new UsersRoutes();
export default usersRoutes.router;