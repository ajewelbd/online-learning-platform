import { Request, Response, Router } from 'express';
import CourseController from "../controller/CourseController";

const router = Router();
const course = new CourseController();

router.get("/", async (req: Request, res: Response) => {
    const { data, status} = await course.get(req.query);
    res.status(status);
    res.json(data)
})

router.get("/:id", async (req: Request, res: Response) => {
    const { data, status} = await course.getById(Number(req.params.id));
    console.log(status)
    res.status(status);
    res.json(data)
})

router.post("/", async (req: Request, res: Response) => {
    const { data, status} = await course.create(req.body);
    res.status(status);
    res.json(data)
})

export default router;