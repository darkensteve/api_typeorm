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
const express_1 = __importDefault(require("express"));
const user_service_1 = require("./user.service");
const router = express_1.default.Router();
// Routes
router.get('/', getAll);
router.get('/:id', getById);
router.post('/', create);
router.put('/:id', update);
router.delete('/:id', _delete);
exports.default = router;
// Route functions
function getAll(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const users = yield user_service_1.userService.getAll();
            res.json(users);
        }
        catch (err) {
            next(err);
        }
    });
}
function getById(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield user_service_1.userService.getById(req.params.id);
            res.json(user);
        }
        catch (err) {
            next(err);
        }
    });
}
function create(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield user_service_1.userService.create(req.body);
            res.json({ message: 'User created successfully' });
        }
        catch (err) {
            next(err);
        }
    });
}
function update(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield user_service_1.userService.update(req.params.id, req.body);
            res.json({ message: 'User updated successfully' });
        }
        catch (err) {
            next(err);
        }
    });
}
function _delete(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield user_service_1.userService.delete(req.params.id);
            res.json({ message: 'User deleted successfully' });
        }
        catch (err) {
            next(err);
        }
    });
}
