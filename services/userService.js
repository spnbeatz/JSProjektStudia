
const User = require('../data/models/user.js');

// req tutaj tymczasowo do testowania
async function createUser(username, password) {
    try {
        if (!username || !password) {
            return { error: "Username and password are required" };
        }
        
        const user = new User(username, password);
        await user.create();
        return user;

    } catch (error) {
        return { error: "An error occurred while creating the user" };
    }

}

async function updateUser(data) {
    try {
        const user = new User(data.username, data.password);
        user.id = data.id;
        await user.update();
        return user;
    } catch (error) {
        return { error: "An error occurred while updating the user" };
    }
}

module.exports = {
    createUser,
    updateUser  
};