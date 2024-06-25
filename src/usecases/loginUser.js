
 async function loginUser ({
    userCredentials,
    userRepository,
    userPassword,}){
        
    const [dbEmail] = await userRepository.getByEmail(userCredentials.email);
    if (!dbEmail) throw new Error("User does not exist");

    const hashedPassword = await userPassword.encrypt(
        userCredentials.password,
    );
    const isValid = await bcrypt.compare(userCredentials.password, hashedPassword);
    if(!isValid) throw new Error('password is invalid')
    
        
}
export default loginUser;