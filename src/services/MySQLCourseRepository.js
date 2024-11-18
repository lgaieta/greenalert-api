import { pool } from "./pool.js";

class MySQLCourseRepository {
    static async listProfessorCourses(email) {
        const [result] = await pool.query(
            `
                SELECT course.*, school.name_school
                FROM course
                JOIN school ON course.school_CUE = school.CUE
                WHERE course.teacher = ?
            `,
            [email],
        );

        return result.map(MySQLCourseRepository.adaptCourse);
    }

    static async getStudentCourse(email) {
        const [result] = await pool.query(
            `
                SELECT course.*, school.name_school
                FROM user
                JOIN course ON user.course_id = course.id
                JOIN school ON course.school_CUE = school.CUE
                WHERE user.email = ?
            `,
            [email],
        );

        return result.length > 0
            ? MySQLCourseRepository.adaptCourse(result[0])
            : null;
    }

    static async create(course) {
        const [result] = await pool.query(
            "INSERT INTO course (course, school_CUE, teacher, inv_code) VALUES (?, ?, ?, ?)",
            [
                course.name,
                course.schoolCue,
                course.professorEmail,
                course.invitationCode,
            ],
        );
        return result;
    }

    static async getByInvitationCode(invitationCode) {
        const [result] = await pool.query(
            `
                SELECT course.*, school.name_school 
                FROM course 
                JOIN school 
                    ON course.school_CUE = school.CUE 
                WHERE course.inv_code = ? 
            `,
            [invitationCode],
        );

        return result.length > 0
            ? MySQLCourseRepository.adaptCourse(result[0])
            : null;
    }

    static async joinStudent(invitationCode, studentEmail) {
        const [result] = await pool.query(
            "UPDATE user SET course_id = (SELECT id FROM course WHERE inv_code = ?) WHERE email = ?",
            [invitationCode, studentEmail],
        );
        return result;
    }

    static adaptCourse(course) {
        return {
            id: course.id,
            name: course.course,
            schoolCue: course.school_CUE,
            schoolName: course.name_school,
            professorEmail: course.teacher,
            invitationCode: course.inv_code,
        };
    }
}

export default MySQLCourseRepository;
