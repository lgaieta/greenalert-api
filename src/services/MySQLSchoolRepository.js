import { pool } from "./pool.js";

class MySQLSchoolRepository {
    static async list() {
        const [rows] = await pool.query("SELECT * FROM school");
        return rows.map(MySQLSchoolRepository.adaptSchool);
    }

    static async getByCue(cue) {
        const [rows] = await pool.query("SELECT * FROM school WHERE CUE = ?", [
            cue,
        ]);

        if (rows.length === 0) return null;

        const school = rows[0];
        return MySQLSchoolRepository.adaptSchool(school);
    }

    static async save(school) {
        const [result] = await pool.query(
            "INSERT INTO school (CUE, name_school, locality) VALUES (?, ?, ?)",
            [school.cue, school.name, school.locality],
        );
        return result;
    }

    static async getByProfessorEmail(email) {
        const [rows] = await pool.query(
            `
            SELECT school.* 
            FROM teacher_school 
            JOIN school ON teacher_school.school_CUE = school.CUE 
            WHERE teacher_school.teacher_email = ?
            `,
            [email],
        );
        return rows.map(MySQLSchoolRepository.adaptSchool)[0];
    }

    static async getByDirectorEmail(email) {
        const [rows] = await pool.query(
            `
            SELECT * 
            FROM school 
            WHERE director_email = ?
            `,
            [email],
        );
        return rows.map(MySQLSchoolRepository.adaptSchool)[0];
    }

    static adaptSchool(school) {
        return {
            cue: school.CUE,
            name: school.name_school,
            locality: school.locality,
        };
    }
}

export default MySQLSchoolRepository;
