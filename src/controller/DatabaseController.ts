import { Pool } from "pg";

export default class DatabaseController {
    db: any;

    constructor() {
        this.connect();
    }

    connect() {
        try {
            const { DB_HOST, DB_USER, DB_PASSWORD, DB_PORT, DB } = process.env;
            this.db = new Pool({
                host: DB_HOST,
                user: DB_USER,
                password: DB_PASSWORD,
                port: Number(DB_PORT),
                database: DB
            })
        } catch (e: unknown) {
            throw new Error("Database connection failed")
        }
    }

    async query(sql: string, data?: any) {
        try {
            return await this.db?.query(sql, data);
        } catch (e: unknown) {
            throw new Error(e as string);
        }
    }
}