import express from "express";
import MySQLReportRepository from "../services/MySQLReportRepository.js";
import SessionManager from "../services/SessionManager.js";

const ReportRouter = express.Router();

ReportRouter.post("/", async (request, response) => {
    const { description, lat, lng } = request.body;

    if (!lat || !lng) return response.status(400).send("Error");
    try {
        const { usertype } = await SessionManager.verifyToken(
            request.cookies.access_token || "",
        );
        if (usertype !== "student")
            return response.status(403).send("Unauthorized");

        await MySQLReportRepository.save({ description, lat, lng });
    } catch (error) {
        console.error(error);
        return response.status(400).send("Error");
    }
});

export { ReportRouter };
