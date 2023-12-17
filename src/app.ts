import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config(); // Load environment variable

import courseRoutes from "./routes/course-routes";
import enrollmentRoutes from "./routes/enrollment-routes";

const app = express();
app.use(express.json())
app.use(cors()) // To apply cross-site accessibility

// app.listen(process.env.PORT, () => console.log(`Server running on http://${process.env.HOST}:${process.env.PORT}`))

app.use("/courses", courseRoutes);
app.use("/enrollments", enrollmentRoutes);

app.use("/", (req: Request, res: Response) => {
    res.json({info: "Welcome to Online Learning Platform"})
})

app.use("/*", (req: Request, res: Response) => {
    res.status(404).json({info: "Endpoint not found"})
})

export default app;