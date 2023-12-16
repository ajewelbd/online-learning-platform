import { IncomingMessage, ServerResponse } from "http";
import CourseController from "../controller/CourseController";

export default async (req: IncomingMessage, res: ServerResponse) => {
    const url = req.url;
    const method = req.method?.toLowerCase();

    if (url === "/courses" || url?.match("/courses")) {
        const course = new CourseController();
        
        if ((method === "get" || method === "post") && typeof course[method] === "function") {
            const response = await course[method](req);
            res.write(JSON.stringify(response))
            res.statusCode = 200;
            res.end()
        }

    } else if (url === "/enrollments") {
        if (method === "POST") {
            res.statusCode = 200;
            res.end("Found")
        } else {
            res.statusCode = 405;
            res.end()
        }
    } else {
        res.statusCode = 404;
        res.end("Route content not defined yet")
    }
}