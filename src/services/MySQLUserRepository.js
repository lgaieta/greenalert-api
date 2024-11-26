import { pool } from "./pool.js";

const usertypesMap = {
    student: 0,
    professor: 1,
    director: 2,
};

const dbUsertypesMap = ["student", "professor", "director"];

class MySQLUserRepository {
    static async listDirectors() {
        const result = await pool.query(
            "SELECT * FROM user WHERE usertype = ?",
            [usertypesMap["director"]],
        );

        return result[0].map(MySQLUserRepository.adaptUserWithoutPassword);
    }

    static async listProfessors() {
        const result = await pool.query(
            "SELECT * FROM user WHERE usertype = ?",
            [usertypesMap["professor"]],
        );

        return result[0].map(MySQLUserRepository.adaptUserWithoutPassword);
    }

    static async listProfessorsBySchoolCue(schoolCue) {
        const [results] = await pool.query(
            `
                SELECT user.*
                FROM user
                JOIN teacher_school
                    ON user.email = teacher_school.teacher_email
                WHERE teacher_school.school_CUE = ?
            `,
            [schoolCue],
        );

        return results.map(MySQLUserRepository.adaptUserWithoutPassword);
    }

    static async getByEmail(email) {
        const [result] = await pool.query(
            "SELECT email, password, usertype FROM user WHERE email = ?",
            [email],
        );

        const foundUser = result[0];

        if (!foundUser) return null;

        return MySQLUserRepository.adaptUser(foundUser);
    }

    static async save(user) {
        const result = await pool.query(
            "INSERT INTO user (email, password, username, usertype) VALUES (?, ?, ?, ?)",
            [
                user.email,
                user.password,
                user.username,
                usertypesMap[user.usertype],
            ],
        );

        return result[0];
    }
    static async registerDirector(email) {
        const result = await pool.query(
            "UPDATE user SET usertype = ? WHERE email = ?",
            [usertypesMap["director"], email],
        );

        return result[0];
    }

    static async registerProfessor(email) {
        const result = await pool.query(
            "UPDATE user SET usertype = ? WHERE email = ?",
            [usertypesMap["professor"], email],
        );

        return result[0];
    }
    static async assignProfessorToSchool(email, schoolCue) {
        const result = await pool.query(
            "INSERT INTO teacher_school (school_CUE, teacher_email) VALUES (?, ?)",
            [schoolCue, email],
        );

        return result[0];
    }

    static adaptUser(dbUser) {
        return {
            ...dbUser,
            usertype: dbUsertypesMap[dbUser.usertype],
        };
    }

    static adaptUserWithoutPassword(dbUser) {
        // eslint-disable-next-line no-unused-vars
        const { _password, ...user } = MySQLUserRepository.adaptUser(dbUser);
        return user;
    }

    static async getDirectorByCue(cue) {
        const [result] = await pool.query(
            "SELECT user.* FROM school JOIN user ON school.CUE = ? WHERE usertype = ? AND user.email = school.director_email",
            [cue, usertypesMap["director"]],
        );

        return result.length > 0
            ? MySQLUserRepository.adaptUserWithoutPassword(result[0])
            : null;
    }

    static async setSchoolDirector(cue, email) {
        const result = await pool.query(
            "UPDATE school SET director_email = ? WHERE CUE = ?",
            [email, cue],
        );

        return result[0];
    }
}

export default MySQLUserRepository;
