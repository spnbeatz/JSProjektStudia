
const bcrypt = require('../utils/bcrypt.js');

async function login(username, password, req) {
    try {
        const user = req.user;
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