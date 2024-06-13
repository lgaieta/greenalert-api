import NewUser from "../entities/NewUser";

function registerUser({ user, userStorage }) {
    console.log("Registrando usuario (usecases)");
    const newUser = new NewUser(user);
    /* 
        Lógica de encriptación y validación de usuario no repetido 
    */
    userStorage.save(newUser);
}

export default registerUser;
