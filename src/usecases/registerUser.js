import NewUser from "../entities/NewUser.js";
import "dotenv/config";

async function registerUser({ user, userRepository }) {
    const newUser = new NewUser(user);

    const [dbUser] = await userRepository.getByEmail(newUser.email);

    if (dbUser) throw new Error("User already exists");

    userRepository.save(newUser);
}

export default registerUser;
