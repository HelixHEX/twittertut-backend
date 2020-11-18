"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var typeorm_1 = require("typeorm");
var User_1 = __importDefault(require("./User"));
var Tweet = (function (_super) {
    __extends(Tweet, _super);
    function Tweet() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn('uuid'),
        __metadata("design:type", String)
    ], Tweet.prototype, "uuid");
    __decorate([
        typeorm_1.Column(),
        typeorm_1.CreateDateColumn(),
        __metadata("design:type", Date)
    ], Tweet.prototype, "createdAt");
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Tweet.prototype, "tweet");
    __decorate([
        typeorm_1.ManyToOne(function () { return User_1["default"]; }, function (user) { return user.tweets; }),
        typeorm_1.JoinColumn({ name: 'userUUID' }),
        __metadata("design:type", Tweet)
    ], Tweet.prototype, "creator");
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Tweet.prototype, "userUUID");
    Tweet = __decorate([
        typeorm_1.Entity()
    ], Tweet);
    return Tweet;
}(typeorm_1.BaseEntity));
exports["default"] = Tweet;
//# sourceMappingURL=Tweet.js.map