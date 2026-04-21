const userService = require('../services/userService.js');

async function createUser(req, res) {
    const { username, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
        return res.render("register", { error: "Passwords do not match" });
    }

    const result = await userService.createUser(username, password, req);
    if (result.error) {
        return res.render("register", { error: result.error });
    }

    res.render("login", { success: "User created successfully. Please log in." });
}

module.exports = {
    createUser
};