import Response from "../types/response";
import EnrollmentService from "../services/EnrollmentService";
import Enrollment from "../types/enrollment";

export default class EnrollmentController {
    private enrollmentService: EnrollmentService;

    constructor() {
        this.enrollmentService = new EnrollmentService();
    }

    async post(enroll: Enrollment): Promise<Response> {
        let response: Response = {
            data: "Bad Request",
            status: 400
        };

        if (enroll) {
            const errors = await this.validate(enroll)
            if (errors.length) {
                response.data = errors;
            } else {
                try {
                    response.data = await this.enrollmentService.enrollStudent(enroll);
                    response.status = 201;
                } catch (e: unknown) {
                    response.data = e;
                    response.status = 500;
                }
            }
        }

        return response;
    }

    async validate(enroll: Enrollment): Promise<Array<string>> {
        const errors = [];
        if (!enroll.studentName) errors.push("Student Name is required");

        if (!enroll.courseId) errors.push("Course ID is required");
        if (enroll.courseId) {
            const isValidCourse = await this.enrollmentService.validateEnrollment(enroll.courseId);
            if (!isValidCourse) errors.push("Course not found!");
        }

        if (!enroll.enrollmentDate) errors.push("Date is required");

        return errors;
    }
}