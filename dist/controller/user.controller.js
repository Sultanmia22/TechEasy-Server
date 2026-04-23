"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const user_model_1 = require("../models/user.model");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        const isUserExists = yield user_model_1.User.findOne({ email });
        if (isUserExists) {
            return res.status(400).json({
                success: false,
                message: 'User already exists!',
            });
        }
        const savedUser = yield user_model_1.User.create(req.body);
        const userResponse = savedUser.toObject();
        delete userResponse.password;
        res.status(201).json({
            success: true,
            message: 'Your registration successfully! Please Login',
            data: userResponse
        });
    }
    catch (er) {
        console.log('ERROR Details:', er);
        res.status(500).json({
            success: false,
            message: 'Failed to register user',
            error: er.message,
        });
    }
});
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield user_model_1.User.findOne({ email }).select('+password');
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found with this email!',
            });
        }
        if (!user.password) {
            return res.status(400).json({
                message: 'This account was created using Google. Please use Google Sign-In to continue.'
            });
        }
        const isPasswordMatched = yield bycrypt.compare(password, user.password);
        if (!isPasswordMatched) {
            return res.status(401).json({
                success: false,
                message: 'Incorrect password!',
            });
        }
        const accessToken = jsonwebtoken_1.default.sign({ id: user._id, role: user.role, email: user.email }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.status(200).json({
            success: true,
            data: {
                user,
                accessToken
            },
        });
    }
    catch (er) {
        console.log("Error in Login:", er.message);
        res.status(500).json({
            success: false,
            message: er.message || 'Something went wrong on the server'
        });
    }
});
const socialLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, image } = req.body;
        let user = yield user_model_1.User.findOne({ email });
        if (!user) {
            user = yield user_model_1.User.create({
                name,
                email,
                image,
                role: "customer",
                date: new Date().toISOString(),
            });
        }
        const accessToken = jsonwebtoken_1.default.sign({ id: user._id, role: user.role, email: user.email }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.status(200).json({
            success: true,
            data: {
                user,
                accessToken
            }
        });
    }
    catch (er) {
        console.log("Error in Social Login:", er.message);
        res.status(500).json({
            success: false,
            message: er.message || 'Something went wrong during social login'
        });
    }
});
exports.userController = {
    register,
    login,
    socialLogin
};
//# sourceMappingURL=user.controller.js.map