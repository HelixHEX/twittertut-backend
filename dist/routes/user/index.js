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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var User_1 = __importDefault(require("../../entities/User"));
var router = express_1["default"].Router();
var argon2_1 = __importDefault(require("argon2"));
var user_1 = require("../../utils/user");
var onlineusers = [];
router.get("/me", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var query, uuid, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = req.query;
                uuid = query.currentUser;
                user_1.isLoggedIn(uuid, res);
                return [4, User_1["default"].findOne({ relations: ["tweets"], where: { uuid: uuid } })];
            case 1:
                user = _a.sent();
                if (!user) {
                    res.json({ uuid: "user not found" }).status(404);
                }
                res.json({ user: user }).status(200);
                return [2];
        }
    });
}); });
router.get("/signup", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var query, name, email, username, password, hashPw, user, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = req.query;
                name = query.name;
                email = query.email;
                username = query.username;
                password = query.password;
                username = username.toLowerCase();
                return [4, argon2_1["default"].hash(password)];
            case 1:
                hashPw = _a.sent();
                _a.label = 2;
            case 2:
                _a.trys.push([2, 4, , 5]);
                return [4, User_1["default"].create({
                        name: name,
                        email: email,
                        username: username,
                        password: hashPw
                    }).save()];
            case 3:
                user = _a.sent();
                console.log((user === null || user === void 0 ? void 0 : user.username) + " has created an account");
                res
                    .json({
                    success: true,
                    uuid: user.uuid
                })
                    .status(200);
                return [3, 5];
            case 4:
                err_1 = _a.sent();
                console.log(err_1);
                if (err_1.message.includes("duplicate")) {
                    if (err_1.detail.includes("email")) {
                        res.json({ success: false, error: "email" }).status(404);
                    }
                    if (err_1.detail.includes("username")) {
                        res.json({ success: false, error: "username" }).status(404);
                    }
                }
                else {
                    onlineusers.push('/');
                    res.json({ success: false, error: err_1.message }).status(400);
                }
                return [3, 5];
            case 5: return [2];
        }
    });
}); });
router.get("/login", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var query, username, password, user, verify;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = req.query;
                username = query.username;
                password = query.password;
                username = username.toLowerCase();
                return [4, User_1["default"].findOne({
                        where: { username: username },
                        select: ["uuid", "username", "password", "name"]
                    })];
            case 1:
                user = _a.sent();
                if (!user) {
                    res.json({ success: false, error: "Incorrect Username/Password" }).status(404);
                }
                return [4, argon2_1["default"].verify(user.password, password)];
            case 2:
                verify = _a.sent();
                if (!verify) {
                    res.json({ success: false, error: "Incorrect Username/Password" }).status(404);
                }
                console.log((user === null || user === void 0 ? void 0 : user.username) + " has logged");
                if (user_1.isLoggedIn(user === null || user === void 0 ? void 0 : user.uuid, res)) {
                    res.json({ success: true, uuid: user === null || user === void 0 ? void 0 : user.uuid, name: user === null || user === void 0 ? void 0 : user.name }).status(200);
                }
                else {
                    res.json({ success: false, error: 'isloggedin' }).status(400);
                }
                return [2];
        }
    });
}); });
router.get("/user", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var query, uuid, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = req.query;
                uuid = query.uuid;
                user_1.isLoggedIn(uuid, res);
                return [4, User_1["default"].findOne({ relations: ["tweets"], where: { uuid: uuid } })];
            case 1:
                user = _a.sent();
                if (!user) {
                    res.json({ error: "error loading user" }).status(400);
                }
                res.json({ user: user }).status(200);
                return [2];
        }
    });
}); });
router.get('/logout', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var query, uuid, remove;
    return __generator(this, function (_a) {
        query = req.query;
        uuid = query.currentUser;
        remove = user_1.removeuser(uuid);
        if (remove) {
            res.json({ success: true }).status(200);
        }
        else {
            res.json({ success: true, error: 'user not logged in' }).status(404);
        }
        return [2];
    });
}); });
router.get('/onlineusers', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var query, uuid, isloggedin, users;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = req.query;
                uuid = query.currentUser;
                return [4, user_1.isLoggedIn(uuid, res)];
            case 1:
                isloggedin = _a.sent();
                if (isloggedin) {
                    users = user_1.getusers();
                    res.json({ success: true, users: users }).status(200);
                }
                return [2];
        }
    });
}); });
module.exports = router;
//# sourceMappingURL=index.js.map