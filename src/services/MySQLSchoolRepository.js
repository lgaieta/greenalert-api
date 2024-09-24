import { pool } from "./pool.js";

class MySQLSchoolRepository{
    static list() {}

    static async getByCue(cue){
        const result = await pool.query(
            "SELECT cue FROM school WHERE cue = ?", [cue],
        );
        return result[0]
    }
    static async save(school) {
        const result = await pool.query(
            "INSERT INTO school (cue,locality) VALUES (?, ?,)",
            [school.cue, school.locality],
        );

        return result[0];
    }
}

export default MySQLSchoolRepository;