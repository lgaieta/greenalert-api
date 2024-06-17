import NewUser from "../entities/NewUser.js";

function registerUser({ user, userRepository }) {
    const newUser = new NewUser(user);
    userRepository.save(newUser);
}

export default registerUser;
