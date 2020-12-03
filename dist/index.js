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
require("reflect-metadata");
require("dotenv-safe/config");
var express_1 = __importDefault(require("express"));
var path = require("path");
var morgan = require("morgan");
var typeorm_1 = require("typeorm");
var Tweet_1 = __importDefault(require("./entities/Tweet"));
var User_1 = __importDefault(require("./entities/User"));
var user = require("./routes/user");
var tweets = require("./routes/tweets");
var admin = require("./routes/admin");
var cron_1 = __importDefault(require("cron"));
var node_fetch_1 = __importDefault(require("node-fetch"));
var cors = require("cors");
var main = function () { return __awaiter(void 0, void 0, void 0, function () {
    var app, cronJob;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4, typeorm_1.createConnection({
                    type: "postgres",
                    url: process.env.DATABASE_URL,
                    logging: false,
                    synchronize: true,
                    migrations: [path.join(__dirname, "./migrations/*")],
                    entities: [Tweet_1["default"], User_1["default"]]
                })];
            case 1:
                _a.sent();
                app = express_1["default"]();
                app.use(morgan("dev"));
                app.use(express_1["default"].json());
                app.use(express_1["default"].urlencoded({ extended: true }));
                app.use(function (req, res, next) {
                    res.header("Access-Control-Allow-Origin", "*");
                    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
                    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");
                    res.header("Access-Control-Allow-Credentials", true);
                    if (req.method === "OPTIONS") {
                        return res.sendStatus(204);
                    }
                    next();
                });
                app.get("/", function (_, res) {
                    res.json({ success: "hello world" }).status(200);
                });
                app.use("/api/v1/user", user);
                app.use("/api/v1/tweets", tweets);
                app.use("/api/v1/admin", cors(), admin);
                app.get('/test', function (_, res) {
                    res.json({ success: true }).status(200);
                });
                app.use(function (_, res) {
                    res.status(404).json({ status: "404" });
                });
                cronJob = new cron_1["default"].CronJob('0 */25 * * * *', function () {
                    node_fetch_1["default"]('https://twitter-tut-backapp.herokuapp.com/')
                        .then(function (res) { return console.log("response-ok: " + res.ok + ", status: " + res.status); })["catch"](function (error) { return console.log(error); });
                });
                cronJob.start();
                app.listen(process.env.PORT || 8081, function () {
                    console.log("\uD83D\uDE80 Server started at http://localhost:" + process.env.PORT);
                });
                return [2];
        }
    });
}); };
main();
//# sourceMappingURL=index.js.map