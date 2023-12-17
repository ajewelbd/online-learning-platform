import DatabaseController from "../controller/DatabaseController"
import Enrollment from "../types/enrollment";

export default class EnrollmentService extends DatabaseController {
    constructor() {
        super();
    }

    async validateEnrollment(id: number): Promise<Number> {
        try {
            const sql = `SELECT id FROM courses WHERE id=${id}`;
            const { rows } = await this.db.query(sql);
            return rows.length;
        } catch (e: unknown) {
            console.log(e)
            return 0;
        }
    }

    async enrollStudent({ studentName, courseId, enrollmentDate }: Enrollment): Promise<Enrollment> {
        try {
            const sql = `INSERT INTO enrollments(student_name, course_id, enrollment_date) VALUES($1, $2, $3) RETURNING *`;
            const { rows } = await this.db.query(sql, [studentName, courseId, enrollmentDate]);
            return rows[0];
        } catch (e: unknown) {
            console.log(e)
            throw new Error("Failed to enroll the course");
        }
    }
}