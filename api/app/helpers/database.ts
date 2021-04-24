import mysql from 'promise-mysql'
import environment  from '../environments/environment'
import { Logger, LogStyle } from './logger'

export class Database {
    private static instance: Database
    private static pool: mysql.Pool
    private  constructor() {}

    public static async getInstance(): Promise<Database> {
        if (!Database.instance) {
            Database.instance = new Database
        }
        return Database.instance
    }

    public async getPool(): Promise<mysql.Pool> {
        if (!Database.pool) {
            Database.pool = await mysql.createPool(environment.db)
        }
        return Database.pool
    }

    public async checkDatabaseConnection(): Promise<boolean>{
        try {
            (await (await this.getPool()).getConnection()).release() 
            return true
        } catch (error) {
            Logger.getInstance().printLog(LogStyle.error,error)
            return false
        }
    }
}