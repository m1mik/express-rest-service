"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const typeorm_1 = require("typeorm");
// eslint-disable-next-line import/no-cycle
const Column_1 = __importDefault(require("./Column"));
// eslint-disable-next-line import/no-cycle
const Task_1 = __importDefault(require("./Task"));
let Board = class Board {
    constructor(board) {
        this.id = uuid_1.v4();
        this.title = board.title;
        this.columns = [];
        this.tasks = [];
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], Board.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Board.prototype, "title", void 0);
__decorate([
    typeorm_1.OneToMany(() => Column_1.default, (column) => column.board),
    __metadata("design:type", Array)
], Board.prototype, "columns", void 0);
__decorate([
    typeorm_1.OneToMany(() => Task_1.default, (task) => task.board),
    __metadata("design:type", Array)
], Board.prototype, "tasks", void 0);
Board = __decorate([
    typeorm_1.Entity(),
    __metadata("design:paramtypes", [Object])
], Board);
exports.default = Board;
//# sourceMappingURL=Board.js.map