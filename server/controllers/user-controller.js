const userService = require("../services/user-service");

class UserController {

    async registration(req, res, next) {
        try {
            const {email, password} = req.body;
            const userData = await userService.registration(email, password);
            res.cookie("refreshToken", userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
            res.json(userData);
        } catch (error) {
            console.log(error);
        }
    }

    async activate(req, res, next) {
        try {
            const activationLink = req.params.link;
            await userService.activate(activationLink);
            return res.redirect(process.env.CLIENT_URL);
        } catch (error) {
            console.log(error);
        }
    }

    async login(req, res, next) {
        try {
            
        } catch (error) {
            console.log(error);
        }
    }

    async logout(req, res, next) {
        try {
            
        } catch (error) {
            console.log(error);
        }
    }

    async refresh(req, res, next) {
        try {
            
        } catch (error) {
            console.log(error);
        }
    }

    async getUsers(req, res, next) {
        try {

        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new UserController();