import express from "express";
import MySQLSchoolRepository from "../services/MySQLSchoolRepository.js";
import SessionManager from "../services/SessionManager.js";
import jwt from "jsonwebtoken";
const { JsonWebTokenError } = jwt;

const SchoolRouter = express.Router();

SchoolRouter.post("/", async (request, response) => {
    const { cue, name, locality } = request.body;
    if (!cue || !name || !locality) return response.status(400).send("Error");
    const { access_token } = request.cookies;

    try {
        const { usertype } = await SessionManager.verifyToken(
            access_token || "",
        );

        if (usertype !== "admin")
            return response.status(403).send("Unauthorized");

        await MySQLSchoolRepository.save({ cue, name, locality });
        return response.status(200).send("Created successfully!");
    } catch (error) {
        if (error instanceof JsonWebTokenError)
            return response.status(403).send("Unauthorized");
        console.log(error);
        return response.status(400).send("Error");
    }
});

SchoolRouter.get("/", async (request, response) => {
    try {
        const schoolList = await MySQLSchoolRepository.list();
        return response.json(schoolList);
    } catch (error) {
        console.log(error);
        return response.status(400).send("Error");
    }
});

export { SchoolRouter };
