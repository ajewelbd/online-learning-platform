import DatabaseController from "../controller/DatabaseController"
import Enrollment from "../types/enrollment";

export default class EnrollmentService extends DatabaseController {
    constructor() {
        super();
    }

    async validateEnrollment(id: number): Promise<Number> {
        try {
            const sql = `SELECT id FROM enrollments WHERE course_id=${id}`;
            const { rows } = await this.db.query(sql);
            return rows.length;
        } catch (e: unknown) {
            console.log(e)
            return 0;
        }
    }

    async enrollStudent(enroll: Enrollment): Promise<Enrollment> {
        try {
            const sql = `INSERT INTO enrollments(student_name, course_id, date) VALUES('${enroll.studentName}', '${enroll.courseId}', ${enroll.date}) RETURNING *`;
            const { rows } = await this.db.query(sql);
            return rows[0];
        } catch (e: unknown) {
            console.log(e)
            throw new Error("Failed to enroll the course");
        }
    }
}