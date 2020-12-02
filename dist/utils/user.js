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
exports.getusers = exports.removeuser = exports.checkuser = exports.adduser = exports.isLoggedIn = void 0;
var User_1 = __importDefault(require("../entities/User"));
var onlineusers = [];
var isLoggedIn = function (uuid, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log(uuid);
                if (!(uuid == undefined || uuid == "")) return [3, 1];
                return [2, res.json({ success: false, error: 'user not logged in' }).status(400)];
            case 1: return [4, User_1["default"].findOne({ where: { uuid: uuid } })];
            case 2:
                user = _a.sent();
                if (user) {
                    return [2, true];
                }
                else {
                    return [2, res.json({ success: false, error: 'user not logged in' }).status(400)];
                }
                _a.label = 3;
            case 3: return [2];
        }
    });
}); };
exports.isLoggedIn = isLoggedIn;
var getusers = function () {
    return onlineusers.length;
};
exports.getusers = getusers;
var adduser = function (uuid) {
    var check = checkuser(uuid);
    if (!check) {
        onlineusers.push(uuid);
        return true;
    }
    else {
        return false;
    }
};
exports.adduser = adduser;
var checkuser = function (uuid) {
    for (var i = 0; i < onlineusers.length; i++) {
        if (onlineusers[i] === uuid) {
            return true;
        }
    }
    return false;
};
exports.checkuser = checkuser;
var removeuser = function (uuid) {
    var check = checkuser(uuid);
    if (check) {
        for (var i = 0; i < onlineusers.length; i++) {
            if (onlineusers[i] === uuid) {
                onlineusers.splice(i, 1);
                return true;
            }
        }
    }
    return false;
};
exports.removeuser = removeuser;
//# sourceMappingURL=user.js.map