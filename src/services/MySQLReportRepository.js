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

    static async accept(report) {
        const result = await pool.query(
            "UPDATE report SET validated = 'accepted' WHERE idreport = ?",
            [report.id],
        );
        return result[0];
    }

    static async deny(report) {
        const result = await pool.query(
            "UPDATE report SET validated = 'denied' WHERE idreport = ?",
            [report.id],
        );
        return result[0];
    }

    static async list() {
        const [result] = await pool.query(
            `
                SELECT report.*, course.course as course_name, locality.locality_name, report_type.name as report_type_name, school.name_school FROM report 
                LEFT JOIN locality ON report.locality = locality.idlocality
                LEFT JOIN report_type ON report.type_report = report_type.id
                LEFT JOIN course ON report.course_id = course.id
                LEFT JOIN school ON course.school_CUE = school.cue;
            `,
        );

        return result.map(MySQLReportRepository.adaptReport);
    }

    static async listTypes() {
        const [result] = await pool.query(
            `
                SELECT * FROM report_type;
            `,
        );

        return result;
    }

    static async listStatisticsByReportType() {
        const [result] = await pool.query(
            `
            SELECT 
                report_type.id,
                report_type.name,
                COUNT(*) AS amount
            FROM
                report
                    LEFT JOIN
                report_type ON report.type_report = report_type.id
            GROUP BY report_type.id;
            `,
        );

        return result;
    }

    static async listAccepted() {
        const [result] = await pool.query(
            `
                SELECT report.*, course.course as course_name, locality.locality_name, report_type.name as report_type_name, school.name_school FROM report 
                LEFT JOIN locality ON report.locality = locality.idlocality
                LEFT JOIN report_type ON report.type_report = report_type.id
                LEFT JOIN course ON report.course_id = course.id
                LEFT JOIN school ON course.school_CUE = school.cue
                WHERE report.validated = 'accepted';
            `,
        );

        return result.map(MySQLReportRepository.adaptReport);
    }

    static async listUnseenProfessorReports(email) {
        const [result] = await pool.query(
            `
                SELECT report.*, course.course as course_name, locality.locality_name, report_type.name as report_type_name, school.name_school FROM report 
                LEFT JOIN locality ON report.locality = locality.idlocality
                LEFT JOIN report_type ON report.type_report = report_type.id
                LEFT JOIN course ON report.course_id = course.id AND course.teacher = ?
                LEFT JOIN school ON course.school_CUE = school.cue
                WHERE report.validated = 'unseen';
            `,
            [email],
        );

        return result.map(MySQLReportRepository.adaptReport);
    }

    static adaptReport(dbReport) {
        return {
            id: dbReport.idreport,
            email: dbReport.user_email,
            type: dbReport.type_report,
            typeName: dbReport.report_type_name,
            courseId: dbReport.course_id,
            courseName: dbReport.course_name,
            schoolName: dbReport.name_school,
            locality: dbReport.locality,
            localityName: dbReport.locality_name,
            description: dbReport.desc_report,
            lat: dbReport.latitude,
            lng: dbReport.length,
        };
    }
}

export default MySQLReportRepository;
