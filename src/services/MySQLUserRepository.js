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

    static save() {}
}

export default MySQLUserRepository;
