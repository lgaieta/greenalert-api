import NewUser from "../entities/NewUser.js";

function registerUser({ user, userRepository }) {
    console.log("Registrando usuario (usecases)");
    const newUser = new NewUser(user);
    /* 
        Lógica de encriptación y validación de usuario no repetido 
    */
    userRepository.save(newUser);
}

export default registerUser;
