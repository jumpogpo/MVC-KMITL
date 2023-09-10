"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VemoxModule = void 0;
const common_1 = require("@nestjs/common");
const vemox_service_1 = require("./vemox.service");
const vemox_controller_1 = require("./vemox.controller");
const mongoose_1 = require("@nestjs/mongoose");
const vemox_schema_1 = require("../db/vemox.schema");
let VemoxModule = class VemoxModule {
};
exports.VemoxModule = VemoxModule;
exports.VemoxModule = VemoxModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                {
                    name: vemox_schema_1.VemoxModel.name,
                    schema: vemox_schema_1.VemoxSchema,
                },
            ]),
        ],
        controllers: [vemox_controller_1.VemoxController],
        providers: [vemox_service_1.VemoxService],
    })
], VemoxModule);
//# sourceMappingURL=vemox.module.js.map