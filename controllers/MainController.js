const UserModel = require('../models/User');
const bcrypt = require('bcryptjs')

const MainController = {
    index(req, res) {
        res.render('welcome', {title: 'Homepage'});
    },
    register(req, res) {
        res.render('auth/register', {title: 'Create new account'});
    },
    login(req, res) {
        res.render('auth/login', {title: 'Login to account'});
    },
    postRegister(req, res) {
        const {email, password, password2} = req.body
        const errors = [];

        if(!email || !password || !password2) {
            errors.push({message: 'All fields are required'})
        }

        if(password.length < 4) {
            errors.push({message: 'Password must be atleast 4 characters'})
        }

        if(password !== password2) {
            errors.push({message: 'Password do not match'})
        }

        if(errors.length > 0) {
            res.render('auth/register', {errors, email, password, password2, title: 'Create new account'});
        } else {
            UserModel.findOne({email: email})
                .then((user) => {
                    if(user) {
                        errors.push({message: 'Email already registered'})
                        res.render('auth/register', {errors, email, password, password2, title: 'Create new account'});
                    } else {
                        const newUser = new UserModel({email, password})
                        bcrypt.genSalt(10, (err, salt) => {
                            bcrypt.hash(newUser.password, salt, (err, hash) => {
                                if(err) throw err;
        
                                newUser.password = hash
        
                                newUser.save()
                                    .then(() => {
                                        req.flash('success_msg', 'Your registration was successful')
                                        res.redirect('/login')
                                    })
                                    .catch(err => console.log(err))
                            })
                        })
                    }
                }).catch((err) => {
                    
                });
        }
    }    
}

module.exports = MainController;