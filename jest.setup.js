require("dotenv").config();
const Pool = require("pg").Pool;
const mockData = require("./mock-data.json");

module.exports = async () => {
  try {
    const { DB_HOST, DB_USER, DB_PASSWORD, DB_PORT, DB } = process.env;
    const db = new Pool({
      host: DB_HOST,
      user: DB_USER,
      password: DB_PASSWORD,
      port: Number(DB_PORT),
      database: DB,
    });

    await db.query(`TRUNCATE courses, enrollments RESTART IDENTITY CASCADE`);

    const { courses } = mockData;
    let sql =
      "INSERT INTO courses(description, instructor, duration, price) VALUES";
    for (let i = 0; i < courses.length; i++) {
      sql += `('${courses[i].description}', '${courses[i].instructor}', ${courses[i].duration}, ${courses[i].price})`;
      if (i < courses.length - 1) sql += ", ";
    }

    await db.query(sql);
    console.log("Course & Enrollments data reset successfull");
  } catch (e) {
    console.log("Failed to reset the tables");
  }
};
