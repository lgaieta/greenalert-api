import { pool } from "./pool.js";

class MySQLReportRepository {
    static async save(report) {
        const result = await pool.query(
            "INSERT INTO report (desc_report, latitude, length) VALUES (?, ?, ?)",
            [report.description, report.lat, report.lng],
        );

        return result[0];
    }
}

export default MySQLReportRepository;
