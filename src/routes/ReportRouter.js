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

ReportRouter.post("/accept", async (request, response) => {
    const { report } = request.body;

    if (!report) return response.status(400).send("Missing report");

    try {
        const { usertype } = await SessionManager.verifyToken(
            request.cookies.access_token || "",
        );

        if (usertype !== "professor")
            return response.status(403).send("Unauthorized");

        await MySQLReportRepository.accept(report);

        return response.status(200).send("Accepted successfully!");
    } catch (error) {
        console.error(error);
        return response.status(400).send("Error");
    }
});

ReportRouter.post("/deny", async (request, response) => {
    const { report } = request.body;

    if (!report) return response.status(400).send("Missing report");

    try {
        const { usertype } = await SessionManager.verifyToken(
            request.cookies.access_token || "",
        );

        if (usertype !== "professor")
            return response.status(403).send("Unauthorized");

        await MySQLReportRepository.deny(report);

        return response.status(200).send("Denied successfully!");
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

ReportRouter.get("/types", async (request, response) => {
    try {
        const reportList = await MySQLReportRepository.listTypes();
        return response.json(reportList);
    } catch (error) {
        console.log(error);
        return response.status(400).send("Error");
    }
});

ReportRouter.get("/accepted", async (request, response) => {
    try {
        const reportList = await MySQLReportRepository.listAccepted();
        return response.json(reportList);
    } catch (error) {
        console.log(error);
        return response.status(400).send("Error");
    }
});

ReportRouter.get("/unseen/professor/:email", async (request, response) => {
    try {
        const { usertype } = await SessionManager.verifyToken(
            request.cookies.access_token || "",
        );
        if (usertype !== "professor")
            return response.status(403).send("Unauthorized");

        const { email } = request.params;
        if (!email) return response.status(400).send("No email provided");

        const reportList =
            await MySQLReportRepository.listUnseenProfessorReports(email);

        return response.json(reportList);
    } catch (error) {
        console.log(error);
        return response.status(400).send("Error");
    }
});

ReportRouter.get("/unit/:id", async (request, response) => {
    const { id } = request.params;
    try {
        const report = await MySQLReportRepository.get(id);
        return response.json(report);
    } catch (error) {
        console.log(error);
        return response.status(400).send("Error");
    }
});

export { ReportRouter };
