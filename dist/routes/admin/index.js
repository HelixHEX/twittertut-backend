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
var Tweet_1 = __importDefault(require("../../entities/Tweet"));
var argon2_1 = __importDefault(require("argon2"));
var router = express_1["default"].Router();
router.post("/login", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var body, _a, username, password, user, verify, hashUUID, err_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                body = req.body;
                _a = body.values, username = _a.username, password = _a.password;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 5, , 6]);
                return [4, User_1["default"].findOne({
                        where: {
                            username: username,
                            role: 'admin'
                        },
                        select: ["uuid", "username", "password", "name", "role"]
                    })];
            case 2:
                user = _b.sent();
                if (!user) {
                    res.json({ success: false, error: "Incorrect Username/Password" }).status(404);
                }
                return [4, argon2_1["default"].verify(user.password, password)];
            case 3:
                verify = _b.sent();
                if (!verify) {
                    res.json({ success: false, error: "Incorrect Username/Password" }).status(404);
                }
                return [4, argon2_1["default"].hash(user.uuid)];
            case 4:
                hashUUID = _b.sent();
                res.json({ success: true, uuid: hashUUID, name: user === null || user === void 0 ? void 0 : user.name, username: user === null || user === void 0 ? void 0 : user.username }).status(200);
                return [3, 6];
            case 5:
                err_1 = _b.sent();
                res.json({ success: false, error: err_1 }).status(404);
                return [3, 6];
            case 6: return [2];
        }
    });
}); });
router.post('/checklogin', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var body, uuid;
    return __generator(this, function (_a) {
        body = req.body;
        uuid = body.uuid;
        console.log(body);
        res.json({ success: true }).status(200);
        return [2];
    });
}); });
router.post('/test', function (req, res) {
    res.send("HEYYY");
});
router.post('/tweets', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        res.send("heyy");
        return [2];
    });
}); });
router.post('/users', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var body, uuid, username, user, verify, users;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                body = req.body;
                uuid = body.uuid, username = body.username;
                return [4, User_1["default"].findOne({ where: { username: username } })];
            case 1:
                user = _a.sent();
                if (!user) {
                    res.json({ success: false, error: 'User Not Logged In' }).status(404);
                }
                return [4, argon2_1["default"].verify(uuid, user.uuid)];
            case 2:
                verify = _a.sent();
                if (!verify) {
                    res.json({ success: false, error: 'User Not Logged In' }).status(404);
                }
                return [4, User_1["default"].findAndCount({ relations: ['tweets'], order: { createdAt: 'DESC' } })];
            case 3:
                users = _a.sent();
                res.json({ success: true, users: users[0], usercount: users[1] });
                return [2];
        }
    });
}); });
router.post('/deletetweet', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var body, uuid, username, tweetuuid, user, verify, tweet, tweets, users;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                body = req.body;
                uuid = body.uuid, username = body.username, tweetuuid = body.tweetuuid;
                return [4, User_1["default"].findOne({ where: { username: username } })];
            case 1:
                user = _a.sent();
                if (!user) {
                    res.json({ success: false, error: 'User Not Logged In' }).status(404);
                }
                return [4, argon2_1["default"].verify(uuid, user.uuid)];
            case 2:
                verify = _a.sent();
                if (!verify) {
                    res.json({ success: false, error: 'User Not Logged In' }).status(404);
                }
                return [4, Tweet_1["default"].findOne({ where: { uuid: tweetuuid } })];
            case 3:
                tweet = _a.sent();
                if (!tweet) {
                    res.json({ success: false, error: "Tweet Not Found" }).status(404);
                }
                tweet === null || tweet === void 0 ? void 0 : tweet.remove();
                tweet === null || tweet === void 0 ? void 0 : tweet.save();
                return [4, Tweet_1["default"].findAndCount({ relations: ['creator'] })];
            case 4:
                tweets = _a.sent();
                return [4, User_1["default"].findAndCount({ relations: ['tweets'] })];
            case 5:
                users = _a.sent();
                res.json({ success: true, tweets: tweets[0], tweetcount: tweets[1], users: users[0], usercount: users[1] });
                return [2];
        }
    });
}); });
module.exports = router;
//# sourceMappingURL=index.js.map