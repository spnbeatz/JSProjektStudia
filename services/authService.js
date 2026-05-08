
const bcrypt = require('../utils/bcrypt.js');
const { exampleUser } = require('../data/example.js');

async function login(username, password) {
    try {
        const user = exampleUser; // wyszukanie użytkownika w bazie danych na podstawie username
        if (!user) {
            return { error: "User not found" };
        }

        const passwordMatch = await bcrypt.comparePassword(password, user.password);
        
        if (!passwordMatch) {
            return { error: "Invalid password" };
        }
        return user;

    } catch (error) {
        throw error;
    }
    
}

async function logout() {
    // Implement logout logic if needed
}

module.exports = {
    login
};