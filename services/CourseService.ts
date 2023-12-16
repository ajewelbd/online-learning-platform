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

    async createCourse(): Promise<Course[]> {
        try {
            const sql = "SELECT id, description, instructor, duration, price FROM courses";
            const { rows } = await this.db.query(sql);
            return rows;
        } catch (e: unknown) {
            console.log(e)
            return [];
        }
    }
}