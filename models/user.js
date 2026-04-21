class User {
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }

    // req tutaj tymczasowo do testowania
    async save(req) {
        req.user = this;
    }
}

module.exports = User;