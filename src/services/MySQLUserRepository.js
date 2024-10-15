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
            "SELECT email FROM user WHERE usertype = 1",
        );

        return result[0];
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

    static adaptUser(dbUser) {
        return {
            ...dbUser,
            usertype: dbUsertypesMap[dbUser.usertype],
        };
    }
}

export default MySQLUserRepository;
