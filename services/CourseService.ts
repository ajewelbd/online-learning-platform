import DatabaseController from "../controller/DatabaseController"
import Course from "../types/course";

export default class CourseService extends DatabaseController {
    constructor() {
        super();
    }

    async getCourses(): Promise<Course[]> {
        try {
            const sql = "SELECT id, description, instructor, duration, price FROM courses";
            const { rows } = await this.db.query(sql);
            return rows;
        } catch (e: unknown) {
            console.log(e)
            return [];
        }
    }

    async getCourseById(id: number): Promise<Course[]> {
        try {
            const sql = "SELECT id, description, instructor, duration, price FROM courses";
            const { rows } = await this.db.query(sql);
            return rows;
        } catch (e: unknown) {
            console.log(e)
            return [];
        }
    }

    async filterCourses(): Promise<Course[]> {
        try {
            const sql = "SELECT id, description, instructor, duration, price FROM courses";
            const { rows } = await this.db.query(sql);
            return rows;
        } catch (e: unknown) {
            console.log(e)
            return [];
        }
    }

    async createCourse(course: Course): Promise<Course> {
        try {
            const sql = `INSERT INTO courses(description, instructor, duration, price) VALUES('${course.description}', '${course.instructor}', ${course.duration}, ${course.price}) RETURNING *`;
            const { rows } = await this.db.query(sql);
            return rows[0];
        } catch (e: unknown) {
            console.log(e)
            throw new Error("Failed to create course");
        }
    }
}