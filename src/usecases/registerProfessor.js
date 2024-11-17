async function registerProfessor({ email, userRepository, schoolCue }) {
    const dbDirector = await userRepository.getByEmail(email);

    if (!dbDirector) throw new Error("User does not exist");

    await userRepository.registerProfessor(email);
    await userRepository.assignProfessorToSchool(email, schoolCue);
}

export default registerProfessor;
