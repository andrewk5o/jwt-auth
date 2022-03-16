const UserModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const mailService = require("./mail-service");
const tokenService = require("./token-service");
const UserDTO = require("../dtos/user-dto");
const ApiError = require("../exceptions/api-error");

class UserService {

    async registration (email, password) {
        const candidate = await UserModel.findOne({email});
        if (candidate) {
            throw ApiError.BadRequest(`User with email ${email} already exists.`);
        }
        const hashPassword = await bcrypt.hash(password, 3);
        const activationLink = uuid.v4();

        const user = await UserModel.create({email, password: hashPassword, activationLink});

        await mailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`);

        const userDto = new UserDTO(user);

        const tokens = tokenService.generateTokens({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {...tokens, user: userDto}
    }

    async activate (activationLink) {
        const user = await UserModel.findOne({activationLink});
        if (!user) {
            throw ApiError.BadRequest("Invalid activation link.");
        }
        user.isActivated = true;
        return await user.save();
    }

    async login (email, password) {
        const user = await UserModel.findOne({email});
        if (!user) {
            throw ApiError.BadRequest(`User with email ${email} doesn't exist.`);
        }
        const isPassEqual = await bcrypt.compare(password, user.password);
        if (!isPassEqual) {
            throw ApiError.BadRequest(`Wrong password.`);
        }
        const userDto = new UserDTO(user);

        const tokens = tokenService.generateTokens({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {...tokens, user: userDto}
    }

    async logout(refreshToken) {
        const token = await tokenService.removeToken(refreshToken);
        return token;
    }
}

module.exports = new UserService();