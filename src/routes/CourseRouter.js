import express from "express";
import SessionManager from "../services/SessionManager.js";
import MySQLCourseRepository from "../services/MySQLCourseRepository.js";

const CourseRouter = express.Router();

CourseRouter.get("/professor/:email", listProfessorCoursesHandler);

async function listProfessorCoursesHandler(request, response) {
    try {
        const { usertype } = await SessionManager.verifyToken(
            request.cookies.access_token || "",
        );
        if (usertype !== "professor")
            return response.status(403).send("Unauthorized");

        const { email } = request.params;

        if (!email) return response.status(400).send("Error");

        const courses = await MySQLCourseRepository.listProfessorCourses(email);
        return response.json(courses);
    } catch (error) {
        console.log(error);
        return response.status(400).send("Error");
    }
}

export { CourseRouter };
