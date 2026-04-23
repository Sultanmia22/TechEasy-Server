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
exports.User = void 0;
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const userSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: false, select: false },
    date: { type: Date, required: true },
    image: { type: String, required: true },
    role: { type: String, enum: ['admin', 'customer'], default: 'customer' },
}, {
    timestamps: true,
});
userSchema.pre('save', function () {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        if (!user.isModified('password')) {
            return;
        }
        try {
            const salt = yield bcrypt_1.default.genSalt(10);
            this.password = yield bcrypt_1.default.hash(this.password, salt);
        }
        catch (error) {
            throw new Error(error);
        }
    });
});
exports.User = (0, mongoose_1.model)('Users', userSchema);
//# sourceMappingURL=user.model.js.map