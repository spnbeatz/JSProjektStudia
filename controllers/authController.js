const authService = require('../services/authService.js');

async function showLoginPage(req, res) {
    res.render("login");
}

async function login(req, res) {
    const { username, password } = req.body;
    const result = await authService.login(username, password);

    if (result.error) {
        return res.render("login", { error: result.error });
    }

    req.session.user = result;
    res.render("index");
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