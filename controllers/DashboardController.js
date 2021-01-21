const layout = '../views/layouts/dashboard-layout';

const DashboardController = {
    profile(req, res) {
        res.render('dashboard/profile', {title: 'My Profile', layout})
    },
    todos(req, res) {
        res.render('dashboard/todos', {title: 'My Todos', layout})
    }
}

module.exports = DashboardController;