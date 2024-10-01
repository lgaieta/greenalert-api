import express from "express";
import MySQLSchoolRepository from "../services/MySQLSchoolRepository.js";

const SchoolRouter = express.Router();

SchoolRouter.post("/", async (request, response) => {
    const { cue, name, locality } = request.body;

    if (!cue || !name || !locality) return response.status(403).send("Error");

    try {
        await MySQLSchoolRepository.save({ cue, name, locality });
        return response.status(200).send("Created successfully!");
    } catch (error) {
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
