import User from "../entities/User.js";
import "dotenv/config";

async function registerUser({
    userCredentials,
    userRepository,
    generateUsername,
}) {
    const [dbUser] = await userRepository.getByEmail(userCredentials.email);

    if (dbUser) throw new Error("User already exists");

    const user = new User({
        email: userCredentials.email,
        password: userCredentials.password,
        username: generateUsername(),
        usertype: 0,
    });

    await userRepository.save(user);
}

export default registerUser;
