import express from "express";
import MySQLReportRepository from "../services/MySQLReportRepository.js";
import SessionManager from "../services/SessionManager.js";

const ReportRouter = express.Router();

ReportRouter.post("/", async (request, response) => {
    const { description, lat, lng, email, courseId, type, locality } =
        request.body;

    if (!lat || !lng || !email || !courseId || !type || !locality)
        return response.status(400).send("Error");

    try {
        const { usertype } = await SessionManager.verifyToken(
            request.cookies.access_token || "",
        );

        if (usertype !== "student")
            return response.status(403).send("Unauthorized");

        await MySQLReportRepository.save({
            description,
            lat,
            lng,
            email,
            courseId,
            type,
            locality,
        });

        return response.status(200).send("Created successfully!");
    } catch (error) {
        console.error(error);
        return response.status(400).send("Error");
    }
});

ReportRouter.get("/", async (request, response) => {
    try {
        const reportList = await MySQLReportRepository.list();
        return response.json(reportList);
    } catch (error) {
        console.log(error);
        return response.status(400).send("Error");
    }
});

export { ReportRouter };
