import User from "../entities/User.js";
import "dotenv/config";

async function registerUser({
    userCredentials,
    userRepository,
    generateUsername,
    passwordEncrypter,
}) {
    const dbUser = await userRepository.getByEmail(userCredentials.email);

    if (dbUser) throw new Error("User already exists");

    const hashedPassword = await passwordEncrypter.encrypt(
        userCredentials.password,
    );

    const user = new User({
        email: userCredentials.email,
        password: hashedPassword,
        username: generateUsername(),
        usertype: "student",
    });

    await userRepository.save(user);
}

export default registerUser;
