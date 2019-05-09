module.exports = (request, response, next) => {
    console.error('__request.user__');
    console.error(request.user);
    if (request.isAuthenticated()) {
        next();
    } else {
        response.sendStatus(401);
    }
};