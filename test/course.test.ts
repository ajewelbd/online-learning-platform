import app from "../src/app";
import supertest from "supertest";
import mockData from "../mock-data.json";


const request = supertest(app);

const courses = mockData.courses;

describe("Test app.ts", () => {
    test("Catch-all route", async () => {
      const res = await request.get("/");
      expect(res.body).toEqual({ info: "Welcome to Online Learning Platform" });
    });
});

describe("Create a courses", () => {
    test("should create a course", async () => {
        const {status, body } = await request.post("/courses").send(mockData.singleCourse);
        expect(status).toEqual(201)
        delete body.id;
        expect(body).toEqual(mockData.singleCourse)
    });
});

describe("GET all course", () => {
    test("should return all course", async () => {
        const res = await request.get("/courses");
        expect(200);
        expect(res.body.total).toEqual(6);
    });
});

describe("GET a courses by id", () => {
    test("should return specific course", async () => {
        const res = await request.get("/courses/1");
        expect(res.body).toEqual(courses[0]);
    });
});

describe("Filter course by Instructor", () => {
    const filteredCourses = courses.filter(course => course.instructor == "Md. Ashraful Alam")
    test("should return filtered courses for a query", async () => {
        const res = await request.get("/courses/?instructor=Md. Ashraful Alam");
        expect(res.body.records).toEqual(filteredCourses);
        expect(res.body.total).toEqual(filteredCourses.length);
    });
});

describe("Filter course by duration", () => {
    const filteredCourses = courses.filter(course => course.duration == "250")
    test("should return filtered courses for a query", async () => {
        const res = await request.get("/courses/?duration=250");
        expect(res.body.records).toEqual(filteredCourses);
        expect(res.body.total).toEqual(filteredCourses.length);
    });
});

describe("Filter course by price", () => {
    const filteredCourses = courses.filter(course => course.price == "100.00")
    test("should return filtered courses for a query", async () => {
        const res = await request.get("/courses/?price=100.00");
        expect(res.body.records).toEqual(filteredCourses);
        expect(res.body.total).toEqual(filteredCourses.length);
    });
});

