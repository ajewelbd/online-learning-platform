import { IncomingMessage } from "http";
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
            console.log("Database connection failed")
        }
    }

    async query(sql: string) {
        try {
            return await this.db?.query(sql);
        } catch (e: unknown) {
            throw new Error("Failed");
        }
    }
    
    parseBody(req: IncomingMessage) {
        return new Promise((resolve, _) => {
            let data = "";
            req.on("data", chunk => {
                data += chunk.toString()
            });
    
            req.on('end', () => {
                resolve(data);
            });
        })
    }

    response(data: any, status: number = 200) {
        return {
            data: JSON.stringify(data),
            status,
        }
    }
}