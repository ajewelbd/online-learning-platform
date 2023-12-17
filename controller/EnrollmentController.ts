import { IncomingMessage } from "http";
import Course from "../types/course";
import Response from "../types/response";
import EnrollmentService from "../services/EnrollmentService";
import Enrollment from "../types/enrollment";

export default class EnrollmentController {
    private enrollmentService: EnrollmentService;

    constructor() {
        this.enrollmentService = new EnrollmentService();
    }

    async post(req: IncomingMessage): Promise<Response> {
        let response: Response = {
            data: "Failed to create new course",
            status: 500
        };

        let enroll: Enrollment | undefined;

        try {
            let data = await this.enrollmentService.parseBody(req);
            enroll = JSON.parse(data as string) as Enrollment;
            const errors = await this.validate(enroll)

            if (errors.length) {
                response.data = errors;
                response.status = 400;
                return response;
            }

        } catch (e: unknown) {
            response.data = "Bad Request";
            response.status = 400;
            return response;
        }

        try {
            response.data = await this.enrollmentService.enrollStudent(enroll!);
            response.status = 200;
        } catch (e: unknown) {
            console.log(e)
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

        if (!enroll.date) errors.push("Date is required");

        return errors;
    }
}