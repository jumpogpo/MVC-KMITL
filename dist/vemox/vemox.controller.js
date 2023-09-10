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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VemoxController = void 0;
const common_1 = require("@nestjs/common");
const vemox_service_1 = require("./vemox.service");
const vemox_dto_1 = require("./vemox.dto");
let VemoxController = class VemoxController {
    constructor(vemoxService) {
        this.vemoxService = vemoxService;
    }
    async vemoxNormal(body) {
        return await this.vemoxService.vemoxNormal(body);
    }
    async vemoxJson(body) {
        return await this.vemoxService.vemoxJson(body);
    }
};
exports.VemoxController = VemoxController;
__decorate([
    (0, common_1.Post)('/normal'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [vemox_dto_1.VemoxInputDto]),
    __metadata("design:returntype", Promise)
], VemoxController.prototype, "vemoxNormal", null);
__decorate([
    (0, common_1.Post)('/json'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [vemox_dto_1.VemoxInputDto]),
    __metadata("design:returntype", Promise)
], VemoxController.prototype, "vemoxJson", null);
exports.VemoxController = VemoxController = __decorate([
    (0, common_1.Controller)('vemox'),
    __metadata("design:paramtypes", [vemox_service_1.VemoxService])
], VemoxController);
//# sourceMappingURL=vemox.controller.js.map