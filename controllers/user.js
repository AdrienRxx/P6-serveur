function login(req, res) {
    res.json({ status: 'ok', url: req.url })
}

module.exports = { login }