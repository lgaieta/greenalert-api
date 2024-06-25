import { promisify } from "util";
import bcrypt from "bcryptjs";

const hashAsync = promisify(bcrypt.hash);
const genSaltAsync = promisify(bcrypt.genSalt);
const compareAsync = promisify(bcrypt.compare);

class PasswordEncrypter {
    static async encrypt(rawPassword) {
        try {
            const saltRounds = 10;
            const salt = await genSaltAsync(saltRounds);
            const hashedPassword = await hashAsync(rawPassword, salt);
            return hashedPassword;
        } catch (error) {
            console.error(error);
            throw new Error("Error encrypting password");
        }
    }

    static async compare(rawPassword, hashedPassword) {
        return await compareAsync(rawPassword, hashedPassword);
    }
}

export default PasswordEncrypter;
