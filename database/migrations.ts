import dotenv from 'dotenv';
import DatabaseController from "../controller/DatabaseController";

// This file will be run independently to create tables as setup
// So we need the environment variables
dotenv.config();

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
    const db = new DatabaseController();
    db.query(`${entities.course}${entities.enrollments}`);
    console.log("Course & Enrollments created successfully")
} catch (e: unknown) {
    console.log("Failed to create the tables");
}
