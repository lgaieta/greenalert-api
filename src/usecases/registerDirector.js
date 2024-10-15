import "dotenv/config";

async function registerDirector({ email, userRepository }) {
    const [dbDirector] = await userRepository.getByEmail(email);

    if (!dbDirector) throw new Error("User does not exist");

    await userRepository.registerDirector(email);
}

export default registerDirector;
