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
exports.userService = void 0;
const typeorm_1 = require("typeorm");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_model_1 = require("./user.model");
exports.userService = {
    getAll,
    getById,
    create,
    update,
    delete: _delete,
};
function getAll() {
    return __awaiter(this, void 0, void 0, function* () {
        const userRepository = (0, typeorm_1.getRepository)(user_model_1.User);
        return yield userRepository.find();
    });
}
function getById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const userRepository = (0, typeorm_1.getRepository)(user_model_1.User);
        // Use the new signature for findOne
        return yield userRepository.findOne({ where: { id } });
    });
}
function create(params) {
    return __awaiter(this, void 0, void 0, function* () {
        const userRepository = (0, typeorm_1.getRepository)(user_model_1.User);
        // Validate if email exists
        if (yield userRepository.findOne({ where: { email: params.email } })) {
            throw `Email "${params.email}" is already registered`;
        }
        // Create a new user instance
        const user = new user_model_1.User();
        user.email = params.email;
        user.firstName = params.firstName;
        user.lastName = params.lastName;
        user.title = params.title;
        user.role = params.role;
        // Hash the password and assign to passwordHash
        user.passwordHash = yield bcryptjs_1.default.hash(params.password, 10);
        // Save the user to the database
        yield userRepository.save(user);
    });
}
function update(id, params) {
    return __awaiter(this, void 0, void 0, function* () {
        const userRepository = (0, typeorm_1.getRepository)(user_model_1.User);
        let user = yield userRepository.findOne({ where: { id } });
        if (!user)
            throw 'User not found';
        // Hash password if it was entered
        if (params.password) {
            params.passwordHash = yield bcryptjs_1.default.hash(params.password, 10);
        }
        // Merge new params into user
        Object.assign(user, params);
        // Save updated user
        yield userRepository.save(user);
    });
}
function _delete(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const userRepository = (0, typeorm_1.getRepository)(user_model_1.User);
        const user = yield userRepository.findOne({ where: { id } });
        if (!user)
            throw 'User not found';
        yield userRepository.remove(user);
    });
}
