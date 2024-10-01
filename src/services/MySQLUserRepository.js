import { pool } from "./pool.js";

class MySQLUserRepository {
    static list() {}

    static async getByEmail(email) {
        const result = await pool.query(
            "SELECT email, password FROM user WHERE email = ?",
            [email],
        );

        return result[0];
    }

    static async save(user) {
        const result = await pool.query(
            "INSERT INTO user (email, password, username, usertype) VALUES (?, ?, ?, ?)",
            [user.email, user.password, user.username, user.usertype],
        );

        return result[0];
    }
     static async registerDirector(email) {
        const result = await pool.query(
            "UPDATE user SET usertype = ? WHERE email = ?",
            [1, email],
        );

        return result[0];
    }
   
}

export default MySQLUserRepository;
