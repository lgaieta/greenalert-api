import express from "express";
import MySQLReportRepository from "../services/MySQLReportRepository.js";

const ReportRouter = express.Router();

ReportRouter.post("/", async (request, response) => {
    const { description, lat, lng } = request.body;

    if (!lat || !lng) return response.status(400).send("Error");
    try {
        await MySQLReportRepository.save({ description, lat, lng });
    } catch (error) {
        console.error(error);
        return response.status(400).send("Error");
    }
});

export { ReportRouter };
