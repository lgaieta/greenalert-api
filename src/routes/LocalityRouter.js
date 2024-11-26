import { Router } from "express";
import { pool } from "../services/pool.js";

const LocalityRouter = Router();

LocalityRouter.get("/", async (request, response) => {
    const [rows] = await pool.query("SELECT * FROM locality");
    return response.json(
        rows.map((row) => ({ id: row.idlocality, name: row.locality_name })),
    );
});

LocalityRouter.get("/id/:id", async (request, response) => {
    const id = request.params.id;
    const [rows] = await pool.query(
        "SELECT * FROM locality WHERE idlocality = ?",
        [id],
    );
    return response.json(
        rows.map((row) => ({ id: row.idlocality, name: row.locality_name }))[0],
    );
});

export { LocalityRouter };
