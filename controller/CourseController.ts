import { IncomingMessage } from "http";
import CourseService from "../services/CourseService";
import Course from "../types/course";
import Response from "../types/response";

export default class CourseController {
    private courseService: CourseService;

    constructor() {
        this.courseService = new CourseService();
    }

    async get(req: IncomingMessage): Promise<Response> {
        let response: Response = {
            data: "Failed to create new course",
            status: 500
        };

        try {
            const courses = await this.courseService.getCourses();
            response.data = courses;
            response.status = 200;
        } catch(e: unknown) {}

        return response;
    }

    async post(req: IncomingMessage): Promise<Response> {
        let response: Response = {
            data: "Failed to create new course",
            status: 500
        };

        try {
            let data = await this.courseService.parseBody(req);
            const course = JSON.parse(data as string) as Course;
            const errors = this.validate(course)

            if(errors.length) {
                response.data = errors;
                response.status = 400;
            } else {
                response.data = await this.courseService.createCourse(course);
                response.status = 200;
            }

        } catch (e: unknown) {}

        return response;
    }

    validate(course: Course): Array<string> {
        const errors = [];
        if (!course.description) errors.push("Description is required");

        if (!course.instructor) errors.push("Instructor is required");

        if (!course.duration) errors.push("Duration is required");
        if (course.duration && !Number.isInteger(course.duration)) { // Determine the type of the value valid integre or not.
            errors.push("Duration must be a valid integer value");
        }

        if (!course.price) errors.push("Price is required");
        if (course.price && typeof course.price !== 'number') { // Determine the type of the value valid float or not.
            errors.push("Price must be a valid integer/decimal value");
        }

        return errors;
    }
}