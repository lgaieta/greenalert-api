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
        const [result] = await pool.query(
            `
                SELECT report.*, locality.locality_name, report_type.name as report_type_name, school.name_school FROM report 
                LEFT JOIN locality ON report.locality = locality.idlocality
                LEFT JOIN report_type ON report.type_report = report_type.id
                LEFT JOIN course ON report.course_id = course.id
                LEFT JOIN school ON course.school_CUE = school.cue;
                `,
        );

        return result.map((row) => ({
            id: row.idreport,
            email: row.user_email,
            type: row.report_type_name,
            courseId: row.course_id,
            school: row.name_school,
            locality: row.locality_name,
            description: row.desc_report,
            lat: row.latitude,
            lng: row.length,
        }));
    }
}

export default MySQLReportRepository;
