const welcome = (req, res) => {
    if (req.session.user) {
        res.send(`Welcome to the party ${req.session.user.username}`)
    }
    else {
        res.send('Sorry, no guests allowed')
    }
}  


module.exports = {
    welcome,
}