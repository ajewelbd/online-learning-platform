import { IncomingMessage, ServerResponse } from "http";
import CourseController from "../controller/CourseController";
import { Router } from "express";
import EnrollmentController from "../controller/EnrollmentController";

export default async (req: IncomingMessage, res: ServerResponse) => {
    const url = req.url;
    const method = req.method?.toLowerCase();
    // console.log(url, method)

    if (url === "/courses" || url?.match("/courses")) {
        const course = new CourseController();
        
        if ((method === "get" || method === "post") && typeof course[method] === "function") {
            const { data, status} = await course[method](req);
            res.write(JSON.stringify(data))
            res.statusCode = status;
            res.end()
        }

    } else if (url === "/enrollments") {
        if (method === "post") {
            const enroll = new EnrollmentController();
            const { data, status} = await enroll.post(req);
            console.log(data, status)
            res.write(JSON.stringify(data))
            res.statusCode = status;
            res.end()
        } else {
            res.statusCode = 405;
            res.end()
        }
    } else {
        res.statusCode = 404;
        res.end("Route content not defined yet")
    }
}