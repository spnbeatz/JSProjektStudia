

async function index(req, res) {
    res.render('index', { title: 'Express', user: req.session.user });
}

module.exports = {
    index
}