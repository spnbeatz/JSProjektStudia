const userService = require('../services/userService.js');

async function index(req, res) {
    try {
        const users = await userService.getAllUsers();
        res.render("users/index", { users, user: req.session.user });
    } catch (error) {
        res.render("users/index", { error: "An error occurred while fetching users.", user: req.session.user });
    }
}

async function createUser(req, res) {
    
    const { username, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
        return res.render("register", { error: "Passwords do not match" });
    }

    const result = await userService.createUser(username, password);
    if (result.error) {
        return res.render("register", { error: result.error });
    }

    res.render("login", { success: "User created successfully. Please log in." });
}

async function updateUser(req, res) {
    try {
        const data = req.body;
        const result = await userService.updateUser(data);
        if (result.error) {
            return res.render("editUser", { error: result.error });
        }
        res.render("editUser", { success: "User updated successfully." });
    } catch (error) {
        res.render("editUser", { error: "An error occurred while updating the user." });
    }
}

module.exports = {
    createUser,
    index,
    updateUser
};