const authService = require('../services/authService.js');
const db = require('../data/connect.js');

async function showLoginPage(req, res) {
    res.render("login");
}

async function login(req, res) {
    try {
        const { username, password } = req.body;

        const [users] = await db.query("SELECT * FROM users WHERE username = ?", [username]);
        if (users.length === 0) {
            return res.render("login", { error: "User not found" });
        }
        const result = await authService.login(username, password);



        if (result.error) {
            return res.render("login", { error: result.error });
        }

        req.session.user = result;
        res.render("index");
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