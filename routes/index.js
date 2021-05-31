const userRoutes = require('./users/user.route');
const guestRoutes = require('./auth/guest.route');
const authRoutes = require('./auth/auth.route');
const homeRoutes = require('./home/home.route');
const taskRoutes = require('./tasks/task.route');

module.exports = {
    homeRoutes,
    authRoutes,
    guestRoutes,
    userRoutes,
    taskRoutes
};
