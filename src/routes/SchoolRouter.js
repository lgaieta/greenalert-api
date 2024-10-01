import express from "express";
import MySQLSchoolRepository from "../services/MySQLSchoolRepository.js";

const SchoolRouter = express.Router();

SchoolRouter.get("/", async (request, response) => {
    const token = request.cookies.access_token;
    if (!token) return response.status(403).send("Error pa");
    console.log(token);
});

SchoolRouter.post("/", async (request, response) => {
    const { cue, locality } = request.body;

    if (!cue || !locality) return response.status(403).send("Error");

    try {
        await MySQLSchoolRepository.save({ cue, locality });
        return response.status(200).send("Created successfully!");
    } catch (error) {
        console.log(error);
        return response.status(400).send("Error");
    }
});

SchoolRouter.get("/", async (request, response) => {
    try {
        schoolList = await MySQLSchoolRepository.list();
        return response.json(schoolList)
    }    
    catch(error){
        console.log(error)
        return response.status(400).send("Error");
    }
})

export { SchoolRouter }