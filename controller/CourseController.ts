import CourseService from "../services/CourseService";
import Course from "../types/course";
import Response from "../types/response";

export default class CourseController {
    private courseService: CourseService;

    constructor() {
        this.courseService = new CourseService();
    }

    async get(req: any): Promise<Course[]> {
        const courses = await this.courseService.getCourses();
        return courses;
    }

    async post(req: any): Promise<Course | Response> {
        try {
            let data = await this.courseService.parseBody(req.body);
            const course = JSON.parse(data as string) as Course;
            return course;
        } catch (e: unknown) {
            console.log(e)
            return this.courseService.response("Failed to create new course", 500)
        }
    }
}