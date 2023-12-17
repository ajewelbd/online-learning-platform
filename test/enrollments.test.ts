import app from "../src/app";
import supertest from "supertest";
import mockData from "../mock-data.json";


const request = supertest(app);

describe("Test app.ts", () => {
    test("Catch-all route", async () => {
      const res = await request.get("/");
      expect(res.body).toEqual({ info: "Welcome to Online Learning Platform" });
    });
});

describe("Student enrollments", () => {
    test("should enroll a student", async () => {
        const enroll = mockData.enrollemnts[0];
        return request
            .post("/enrollments")
            .send(enroll)
            .expect(201)
            .then(({ body }) => {
                expect(body.student_name).toEqual(enroll.studentName)
                expect(body.course_id).toEqual(enroll.courseId)
            })
    });
});

describe("Failed Student enrollments", () => {
    test("should failed to enroll a student", async () => {
        const enroll = {
            studentName: "Shaleha Begum",
            courseId: 1000000
        };
        return request
            .post("/enrollments")
            .send(enroll)
            .expect(400)
    });
});

