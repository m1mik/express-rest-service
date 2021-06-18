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
const typeorm_1 = require("typeorm");
const uuid_1 = require("uuid");
const helpers_1 = require("../../src/helpers");
// eslint-disable-next-line import/no-cycle
const Board_1 = __importDefault(require("./Board"));
// eslint-disable-next-line import/no-cycle
const Column_1 = __importDefault(require("./Column"));
// eslint-disable-next-line import/no-cycle
const User_1 = __importDefault(require("./User"));
let Task = class Task {
    constructor(task) {
        this.id = uuid_1.v4();
        this.title = task.title;
        this.order = helpers_1.setCorrectOrder(task.order, 'TASK');
        this.description = task.description || '';
        // this.userId = task.userId || null;
        // this.boardId = task.boardId || null;
        // this.columnId = task.columnId || null;
        this.board = {};
        this.column = {};
        this.user = {};
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], Task.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Task.prototype, "title", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Task.prototype, "order", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Task.prototype, "description", void 0);
__decorate([
    typeorm_1.ManyToOne(() => Board_1.default, (board) => board.tasks),
    __metadata("design:type", Board_1.default)
], Task.prototype, "board", void 0);
__decorate([
    typeorm_1.ManyToOne(() => Column_1.default, (column) => column.tasks),
    __metadata("design:type", Column_1.default)
], Task.prototype, "column", void 0);
__decorate([
    typeorm_1.ManyToOne(() => User_1.default, (user) => user.tasks),
    __metadata("design:type", User_1.default)
], Task.prototype, "user", void 0);
Task = __decorate([
    typeorm_1.Entity(),
    __metadata("design:paramtypes", [Object])
], Task);
exports.default = Task;
//# sourceMappingURL=Task.js.map