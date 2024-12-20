import express from "express";
import SessionManager from "../services/SessionManager.js";
import MySQLCourseRepository from "../services/MySQLCourseRepository.js";

const CourseRouter = express.Router();

CourseRouter.get("/professor/:email", listProfessorCoursesHandler);
CourseRouter.get("/student/:email", getStudentCourseHandler);
CourseRouter.post("/join", joinCourseHandler);
CourseRouter.post("/leave", leaveCourseHandler);
CourseRouter.post("/", createCourseHandler);

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

async function getStudentCourseHandler(request, response) {
    try {
        const { usertype } = await SessionManager.verifyToken(
            request.cookies.access_token || "",
        );
        if (usertype !== "student")
            return response.status(403).send("Unauthorized");

        const { email } = request.params;

        if (!email) return response.status(400).send("No email provided");

        const courses = await MySQLCourseRepository.getStudentCourse(email);
        return response.json(courses);
    } catch (error) {
        console.log(error);
        return response.status(400).send("Error");
    }
}

function generateCode(length = 6) {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let code = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        code += characters[randomIndex];
    }
    return code;
}

async function createCourseHandler(request, response) {
    try {
        const { usertype } = await SessionManager.verifyToken(
            request.cookies.access_token || "",
        );
        if (usertype !== "professor")
            return response.status(403).send("Unauthorized");

        const { name, professorEmail, schoolCue } = request.body;
        if (!name || !professorEmail || !schoolCue)
            return response.status(400).send("Error");

        let code = "";

        do {
            code = generateCode(9);
        } while (
            (await MySQLCourseRepository.getByInvitationCode(code)) !== null
        );
        const course = await MySQLCourseRepository.create({
            name,
            professorEmail,
            schoolCue,
            invitationCode: code,
        });

        return response.json(course);
    } catch (error) {
        console.log(error);
        return response.status(400).send("Error");
    }
}

async function joinCourseHandler(request, response) {
    try {
        const { usertype } = await SessionManager.verifyToken(
            request.cookies.access_token || "",
        );
        if (usertype !== "student")
            return response.status(403).send("Unauthorized");

        const { invitationCode, email } = request.body;
        if (!invitationCode || !email)
            return response.status(400).send("Error");

        const result = await MySQLCourseRepository.joinStudent(
            invitationCode,
            email,
        );

        return response.json(result);
    } catch (error) {
        console.log(error);
        return response.status(400).send("Error");
    }
}

async function leaveCourseHandler(request, response) {
    try {
        const { usertype } = await SessionManager.verifyToken(
            request.cookies.access_token || "",
        );
        if (usertype !== "student")
            return response.status(403).send("Unauthorized");

        const { email } = request.body;
        if (!email) return response.status(400).send("Error");

        const result = await MySQLCourseRepository.leaveStudent(email);

        return response.json(result);
    } catch (error) {
        console.log(error);
        return response.status(400).send("Error");
    }
}

export { CourseRouter };
