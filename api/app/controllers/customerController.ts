// imports
import { Request, Response } from 'express';
import { Database } from '../helpers/database'

class CustomerController {

    public async getCustomersByUserId(req: Request, res: Response) {
        let database = await Database.getInstance()
        let pool = await database.getPool()
        let user_id = req.params.id;

        try {
            let result = await pool.query("SELECT customer.name, customer.email, customer.phone FROM customer WHERE user_id = ? ", [user_id] )
            res.send(result);
        } catch (error) {
            return console.log('Impossible de récupérer la liste des clients.', error.stack);
        }    
    }
}

export const customerController = new CustomerController();
