import User from "../entities/User.js"
import "dotenv/config"
import mysql from 'mysql2/promise';

async function registerUser({
    userCredentials,
    userRepository,
    generateUsername,
    passwordEncrypter,
}) {
    const [dbUser] = await userRepository.getByEmail(userCredentials.email);

    if (dbUser) throw new Error("User already exists");

    const hashedPassword = await passwordEncrypter.encrypt(
        userCredentials.password,
    );

    const user = new User({
        email: userCredentials.email,
        password: hashedPassword,
        username: generateUsername(),
        usertype: 0,
    });

    await userRepository.save(user);
}

export default registerUser;
