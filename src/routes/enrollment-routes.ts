import { Request, Response, Router } from 'express';
import EnrollmentController from "../controller/EnrollmentController";

const router = Router();
const enroll = new EnrollmentController();

router.post("/", async (req: Request, res: Response) => {
    const { data, status} = await enroll.post(req.body);
    res.status(status);
    res.json(data)
})

router.use("*", (req: Request, res: Response) => {
    res.status(404).json({info: "Endpoint not found"})
})

export default router;