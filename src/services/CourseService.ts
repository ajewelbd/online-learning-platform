import DatabaseController from "../controller/DatabaseController"
import Course from "../types/course";
import DynamicObjet from "../types/dynamic-objet";
import Paginatation from "../types/pagination";

export default class CourseService extends DatabaseController {
    constructor() {
        super();
    }

    async getCourses(skip: number, take: number): Promise<Paginatation> {
        const total = "SELECT COUNT(id) AS total FROM courses";
        const records = `SELECT id, description, instructor, duration, price FROM courses LIMIT ${take} OFFSET ${skip}`;

        return this.paginate({total, records})
    }

    async filterCourses(filterString: string, skip: number, take: number): Promise<Paginatation> {
        const total = `SELECT COUNT(id) AS total FROM courses WHERE ${filterString}`;
        const records = `SELECT id, description, instructor, duration, price FROM courses WHERE ${filterString} LIMIT ${take} OFFSET ${skip}`;

        return this.paginate({total, records})
    }

    async getCourseById(id: number): Promise<Course | boolean> {
        try {
            const sql = `SELECT id, description, instructor, duration, price FROM courses WHERE id=${id}`;
            const { rows } = await this.db.query(sql);
            return rows[0];
        } catch (e: unknown) {
            return false;
        }
    }

    async createCourse({ description, instructor, duration, price }: Course): Promise<Course> {
        try {
            const sql = `INSERT INTO courses(description, instructor, duration, price) VALUES($1, $2, $3, $4) RETURNING *`;
            const { rows } = await this.db.query(sql, [description, instructor, duration, price]);
            return rows[0];
        } catch (e: unknown) {
            throw new Error("Failed to create course");
        }
    }

    async paginate(queries: DynamicObjet): Promise<Paginatation> {
        const response: Paginatation = {
            total: 0,
            records: []
        }

        try {
            const { rows } = await this.db.query(queries.total);
            response.total = rows[0]?.total;

            const result = await this.db.query(queries.records);
            response.records = result.rows;
        } catch (e: unknown) {
            console.log(e)
        }

        return response
    }
}