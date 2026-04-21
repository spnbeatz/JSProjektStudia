
const User = require('../models/user.js');

// req tutaj tymczasowo do testowania
async function createUser(username, password, req) {
    try {
        if (!username || !password) {
            return { error: "Username and password are required" };
        }
        
        const user = new User(username, password);
        await user.save(req);
        return user;

    } catch (error) {
        return { error: "An error occurred while creating the user" };
    }

}

module.exports = {
    createUser
};