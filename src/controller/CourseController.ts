import CourseService from "../services/CourseService";
import Course from "../types/course";
import Response from "../types/response";
import DynamicObjet from "../types/dynamic-objet";

export default class CourseController {
    private courseService: CourseService;
    private state = {
        skip: 0,
        take: 100
    }

    constructor() {
        this.courseService = new CourseService();
    }

    async get(query: any): Promise<Response> {
        let response: Response = {
            data: "Failed to get course information",
            status: 500
        };

        const filterQuery = this.processQuery(query); // extract skip and take value, after that remove those property.

        if (Object.keys(filterQuery).length) {
            const filter = this.prepareFilterFields(query);
            response.data = await this.courseService.filterCourses(filter, this.state.skip, this.state.take);
            response.status = 200;
        } else {
            response.data = await this.courseService.getCourses(this.state.skip, this.state.take);
            response.status = 200;
        }

        return response;
    }

    async getById(id: number): Promise<Response> {
        let response: Response = {
            data: "Course not found",
            status: 404
        };

        const course = await this.courseService.getCourseById(id) as Course;

        if (course) {
            response.data = course;
            response.status = 200;
        }

        return response;
    }

    async create(course: Course): Promise<Response> {
        let response: Response = {
            data: "Bad Request",
            status: 400
        };

        if (course) {
            const errors = this.validate(course)
            if (errors.length) {
                response.data = errors;
            } else {
                try {
                    response.data = await this.courseService.createCourse(course);
                    response.status = 201;
                } catch (e: unknown) {
                    response.data = e;
                    response.status = 500;
                }
            }
        }

        return response;
    }

    validate(course: Course): Array<string> {
        const { description, instructor, duration, price } = course;
        const errors = [];

        if (!description) errors.push("Description is required");

        if (!instructor) errors.push("Instructor is required");

        if (!duration) errors.push("Duration is required");
        if (duration && Number(duration) != duration) {
            errors.push("Duration must be a valid integer value");
        }

        if (!price) errors.push("Price is required");
        if (price && Number(price) != price) {
            errors.push("Price must be a valid integer/decimal value");
        }

        return errors;
    }

    processQuery(query: DynamicObjet) {
        if (query.skip) {
            this.state.skip = Number(query.skip);
            delete query.skip;
        }

        if (query.take) {
            const take = Number(query.take)
            this.state.take = take > 0 ? take : this.state.take;
            delete query.take;
        }

        return query;
    }

    prepareFilterFields(query: DynamicObjet) {
        const validFields = ["instructor", "duration", "price"];

        let filter = "";
        for(const key in query) {
            if (validFields.includes(key)) {
                filter += `CAST(${key} AS TEXT) ILIKE '%${query[key]}%' OR `
            }
        }

        filter = filter.slice(0, -4); // Remove last four ' OR ' from filter string

        return filter;
    }

    // processNumericValue() {

    // }
}