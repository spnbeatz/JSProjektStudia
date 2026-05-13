
const bcrypt = require('../utils/bcrypt.js');
const { exampleUser } = require('../data/example.js');
const User = require('../data/models/user.js');

async function login(email, password) {
    try {
        const user = await User.findOne({ email });
        console.log("User found:", user);
        if (!user) {
            return { error: "User not found" };
        }

        const passwordMatch = await bcrypt.comparePassword(password, user.password_hash);
        
        if (!passwordMatch) {
            return { error: "Invalid password" };
        }

/*         await User.update(user.id, { last_login_at: new Date() }); */
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