
// This file will be run independently to create tables as setup
// So we need the environment variables
const dotenv = require("dotenv");
dotenv.config();

const Pool = require("pg").Pool;

const entities = {
    course: `
        CREATE TABLE IF NOT EXISTS courses
        (
            id SERIAL PRIMARY KEY,
            description TEXT NOT NULL,
            instructor VARCHAR(255) NOT NULL,
            duration NUMERIC(10, 0),
            price NUMERIC(10, 2)
        );
    `,
    enrollments: `
        CREATE TABLE IF NOT EXISTS enrollments
        (
            id SERIAL PRIMARY KEY,
            student_name VARCHAR(255) NOT NULL,
            course_id INTEGER REFERENCES courses(id) ON DELETE CASCADE,
            enrollment_date DATE DEFAULT 'now'
        );
    `
}

try {
    const { DB_HOST, DB_USER, DB_PASSWORD, DB_PORT, DB } = process.env;
    const db = new Pool({
        host: DB_HOST,
        user: DB_USER,
        password: DB_PASSWORD,
        port: Number(DB_PORT),
        database: DB
    })
    db.query(`${entities.course}${entities.enrollments}`);
    console.log("Course & Enrollments created successfully")
} catch (e) {
    console.log(e, "Failed to create the tables");
}
