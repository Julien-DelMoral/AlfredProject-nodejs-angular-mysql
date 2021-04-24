import { Router } from 'express';
import { loginController } from '../controllers/loginController';
import { userController } from '../controllers/userController';
import { customerController } from '../controllers/customerController';

class UsersRoutes {

  public router: Router = Router();
  
  constructor() {
    this.config();
  }

  config(): void {
    
    /*  POST  */
    this.router.post('/login', loginController.authenticate);
    this.router.post('/register', loginController.register);
    this.router.post('/resetPassword', loginController.resetPassword);
    this.router.post('/changePassword', loginController.changePassword);
    this.router.post('/sendConfirmEmail', loginController.sendConfirmEmail);
    
    /*  GET  */
    this.router.get('/customers/:id', loginController.isAuthenticated, customerController.getCustomersByUserId);                               
    this.router.get('/logout', loginController.logout);
    this.router.get('/confirmEmail/:token', loginController.confirmEmail);
    this.router.get('/password/:password', userController.Password);
    this.router.get('/generateToken', userController.GenerateToken);
    
  }
}

const usersRoutes = new UsersRoutes();
export default usersRoutes.router;