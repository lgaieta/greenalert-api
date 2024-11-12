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

        return result.map((course) => ({
            id: course.id,
            name: course.course,
            schoolCue: course.school_CUE,
            schoolName: course.name_school,
            professorEmail: course.professor_email,
            invitationCode: course.inv_code,
        }));
    }
}

export default MySQLCourseRepository;
