"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var router = express_1["default"].Router();
router.post('/', function (req, res) {
    console.log(req.body);
    res.json({ success: true }).status(200);
});
//# sourceMappingURL=index.js.map