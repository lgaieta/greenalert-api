import { pool } from "./pool.js";

class MySQLReportRepository {
    static async save(report) {
        const result = await pool.query(
            "INSERT INTO report (desc_report, latitude, length, user_email, course_id, type_report, locality) VALUES (?, ?, ?, ?, ?, ?, ?)",
            [
                report.description,
                report.lat,
                report.lng,
                report.email,
                report.courseId,
                report.type,
                report.locality,
            ],
        );
        return result[0];
    }

    static async list() {
        const [result] = await pool.query("SELECT * FROM report");
        console.log(result);
        return result.map((row) => ({
            description: row.desc_report,
            lat: row.latitude,
            lng: row.length,
        }));
    }
}

export default MySQLReportRepository;
