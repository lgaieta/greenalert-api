import { pool } from "./pool.js";

class MySQLSchoolRepository {
    static async list() {
        const result = await pool.query("SELECT * FROM school");
        return result[0].map((row) => ({
            cue: row.cue,
            name: row.name_school,
            locality: row.locality,
        }));
    }

    static async getByCue(cue) {
        const result = await pool.query(
            "SELECT cue FROM school WHERE cue = ?",
            [cue],
        );
        return result[0];
    }
    static async save(school) {
        console.log("Laburando en la bd de escuela");
        const result = await pool.query(
            "INSERT INTO school (cue,name_school,locality) VALUES (?,?,?)",
            [school.cue, school.name, school.locality],
        );

        return result[0];
    }
}

export default MySQLSchoolRepository;
