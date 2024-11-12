async function registerProfessor({ email, userRepository }) {
    const dbDirector = await userRepository.getByEmail(email);

    if (!dbDirector) throw new Error("User does not exist");

    await userRepository.registerProfessor(email);
}

export default registerProfessor;
