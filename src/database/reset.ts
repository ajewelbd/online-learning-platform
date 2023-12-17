import dotenv from 'dotenv';
import DatabaseController from "../controller/DatabaseController";
import mockData from "../../mock-data.json";

// This file will be run independently to create tables as setup
// So we need the environment variables
dotenv.config();

const dbReset = async () => {
    try {
        const db = new DatabaseController();
        await db.query(`TRUNCATE courses, enrollments RESTART IDENTITY CASCADE`);

        const { courses } = mockData;
        let sql = "INSERT INTO courses(description, instructor, duration, price) VALUES";
        for (let i = 0; i < courses.length; i++) {
            sql += `('${courses[i].description}', '${courses[i].instructor}', ${courses[i].duration}, ${courses[i].price})`;
            if (i < courses.length - 1) sql += ", ";
        }

        await db.query(sql);
        console.log("Course & Enrollments data reset successfull")
    } catch (e: unknown) {
        console.log("Failed to reset the tables");
    }
}

export default dbReset;
