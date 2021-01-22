const layout = '../views/layouts/dashboard-layout';
const UserModel = require('../models/User');
const ProfileModel = require('../models/Profile');

const DashboardController = {
    profile(req, res) {
        // res.render('dashboard/profile', {title: 'My Profile', layout, user: req.user})
        const user = req.user;
        ProfileModel.findOne({user_id: user.id})
            .then(profile => {
                if(!profile) {
                    res.render('dashboard/profile', {title: 'My Profile', layout, user: req.user})
                } else {
                    res.render('dashboard/profile', {title: 'My Profile', layout, user: req.user, name: profile.name, phone: profile.phone})
                }
            })
            .catch(err => console.log(err))
    },
    todos(req, res) {
        const user = req.user;
        ProfileModel.findOne({user_id: user.id})
            .then(profile => {
                if(!profile) {
                    res.redirect('/dashboard/profile')
                } else {
                    res.render('dashboard/todos', {title: 'My Todos', layout, user: req.user})
                }
            })
            .catch(err => console.log(err))
            
    },
    updateProfile(req, res) {
        const {name, phone} = req.body
        const user = req.user;
        const errors = []

        if(!name || !phone) {
            errors.push({message: 'All fields are required'})
        }

        if(isNaN(phone)) {
            errors.push({message: 'The phone field format is incorrect'})
        }

        if(errors.length > 0) {
            res.render('dashboard/profile', {title: 'My Profile', layout, user: req.user, errors, name, phone})
        } else {
            ProfileModel.findOne({user_id: user.id})
                .then(profile => {
                    if(!profile) {
                        const newProfile = new ProfileModel({name, phone, user_id: req.user.id})

                        newProfile.save().then(profile => {
                            req.flash('success_msg', 'Profile updated')
                            res.redirect('/dashboard/profile')
                        }).catch(err => console.log(err))
                    } else {
                        profile.name = name;
                        profile.phone = phone;

                        profile.save().then(profile => {
                            req.flash('success_msg', 'Profile updated')
                            res.redirect('/dashboard/profile')
                        }).catch(err => console.log(err))
                    }
                })
                .catch(err => console.log(err))
        }
    }
}

module.exports = DashboardController;