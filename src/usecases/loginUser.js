async function loginUser({
    userCredentials,
    userRepository,
    passwordEncrypter,
}) {
    const dbUser = await userRepository.getByEmail(userCredentials.email);
    if (!dbUser) throw new Error("User does not exist");

    const isValid = await passwordEncrypter.compare(
        userCredentials.password,
        dbUser.password,
    );

    if (!isValid) throw new Error("Password is invalid");

    // eslint-disable-next-line no-unused-vars
    const { _password, ...user } = dbUser;

    return user;
}

export default loginUser;
