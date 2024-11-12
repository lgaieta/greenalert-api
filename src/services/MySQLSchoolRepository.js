import { pool } from "./pool.js";

class MySQLSchoolRepository {
    static async list() {
        const result = await pool.query("SELECT * FROM school");
        return result[0].map((row) => ({
            cue: row.CUE,
            name: row.name_school,
            locality: row.locality,
        }));
    }

    static async getByCue(cue) {
        const [result] = await pool.query(
            "SELECT * FROM school WHERE CUE = ?",
            [cue],
        );

        const found = result[0];

        if (!found) return null;

        return {
            cue: found.CUE,
            name: found.name_school,
            locality: found.locality,
        };
    }
    static async save(school) {
        const result = await pool.query(
            "INSERT INTO school (CUE,name_school,locality) VALUES (?,?,?)",
            [school.cue, school.name, school.locality],
        );

        return result[0];
    }
}

export default MySQLSchoolRepository;
