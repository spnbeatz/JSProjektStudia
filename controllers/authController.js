const authService = require('../services/authService.js');
const db = require('../data/connect.js');
const User = require('../data/models/user.js');

async function showLoginPage(req, res) {
    try {
        res.render("login");
    } catch (error) {
        console.error(error);
        return res.render("login", { error: "An error occurred. Please try again." });
    }

}

async function login(req, res) {
    try {
        const { email, password } = req.body;

        const result = await authService.login(email, password);

        if (result.error) {
            return res.render("login", { error: result.error });
        }

        req.session.user = {
            id: result.id,
            email: result.email,
            role_id: result.role_id, // Tutaj mozna pobrac z bazy konkretna role
            name: result.name,
            surname: result.surname,
        };
        res.redirect("/");
    } catch (error) {
        console.error(error);
        res.render("login", { error: "An error occurred. Please try again." });
    }

}

async function logout(req, res) {
    req.session.destroy();
    res.redirect("/login");
}

module.exports = {
    showLoginPage,
    login,
    logout
};