const bcrypt = require("bcrypt");
const User = require('../models/user')

const signUp = (req, res) => {
    res.render('auth/sign-up.ejs', {
        title: 'Sign up', 
        msg: ''
    });
}

const addUser = async (req, res) => {
    console.log('request body: ', req.body)
    const userInDatabase = await User.findOne({ username: req.body.username})

    if (userInDatabase) {
        return res.render('auth/sign-up.ejs',{
            title: 'Sign up', 
            msg: 'Username already taken.'
        })
    }

    if (req.body.password !== req.body.confirmPassword) {
        return res.render('auth/sign-up.ejs', {
            title: 'Sign up',
            msg: 'Password and Confirm Password must match.'
        })
    }
    const hashedPassword = bcrypt.hashSync(req.body.password, 10);
    req.body.password = hashedPassword;

// validation logic

const user = await User.create(req.body);
res.send(`Thanks for signing up ${user.username}`);

}


const signInForm = (req, res) => {
    res.render('auth/sign-in.ejs', {
        title: 'Sign up', 
        msg: '',
    });
}

const signIn = async (req, res) => {
    console.log('request body: ', req.body)
    const userInDatabase = await User.findOne({ username: req.body.username})
    console.log('userInDatabase: ', userInDatabase);

    if (!userInDatabase) {
        return res.render("auth/sign-in.ejs", {
            title: 'Sign in',
            msg: "Invalid credintials. Please try again."
        })
        
    }

    //Checking if password is correct
    const validPassword = bcrypt.compareSync(
        req.body.password,
        userInDatabase.password
    )
    if (!validPassword) {
        return res.render('auth/sign-in.ejs', {
            title: 'Sign in',
            msg: 'Invalid credintials. Please try again.'
        })
        
    }

}

module.exports = {
    signUp,
    addUser,
    signInForm,
    signIn,
}