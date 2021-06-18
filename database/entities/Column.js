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
const helpers_1 = require("../../src/helpers");
// eslint-disable-next-line import/no-cycle
const Board_1 = __importDefault(require("./Board"));
// eslint-disable-next-line import/no-cycle
const Task_1 = __importDefault(require("./Task"));
let Column = class Column {
    constructor(column) {
        this.id = uuid_1.v4();
        this.title = column.title;
        this.order = helpers_1.setCorrectOrder(column.order, 'COLUMN');
        this.tasks = column.tasks;
        this.board = column.board || {};
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], Column.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Column.prototype, "title", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Column.prototype, "order", void 0);
__decorate([
    typeorm_1.OneToMany(() => Task_1.default, (task) => task.column),
    __metadata("design:type", Array)
], Column.prototype, "tasks", void 0);
__decorate([
    typeorm_1.ManyToOne(() => Board_1.default, (board) => board.columns),
    __metadata("design:type", Board_1.default)
], Column.prototype, "board", void 0);
Column = __decorate([
    typeorm_1.Entity(),
    __metadata("design:paramtypes", [Object])
], Column);
exports.default = Column;
//# sourceMappingURL=Column.js.map