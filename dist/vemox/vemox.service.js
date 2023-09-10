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
exports.VemoxService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const vemox_schema_1 = require("../db/vemox.schema");
let VemoxService = class VemoxService {
    constructor(vemoxDataModel) {
        this.vemoxDataModel = vemoxDataModel;
    }
    async vemoxNormal(body) {
        const vemoxResult = await this.vemox(body);
        if (vemoxResult["status"] == false)
            return "Wrong Syntax!";
        return `Query: ${vemoxResult["query"]}\nResult: ${vemoxResult["result"]}\nQuery Execution Time: ${vemoxResult["execution_time"]}`;
    }
    async vemoxJson(body) {
        const vemoxResult = await this.vemox(body);
        return vemoxResult;
    }
    async vemox(body) {
        const startTime = performance.now();
        const language = body["language"].toLowerCase();
        const command = body["command"].trim();
        if (language == 'sql') {
            const sqlResult = this.handleSQL(command, startTime);
            if (sqlResult["status"] == false)
                return { status: false };
            return sqlResult;
        }
        else if (language == 'mql') {
            const mqlResult = this.handleMQL(command, startTime);
            if (mqlResult["status"] == false)
                return { status: false };
            return mqlResult;
        }
        else {
            return { status: false };
        }
    }
    async handleSQL(command, startTime) {
        const sqlPattern = /^SELECT \d+(\s+\+\s+\d+)?;$/i;
        if (!sqlPattern.test(command))
            return { status: false };
        const endTime = performance.now();
        const resultData = {
            query: command,
            result: eval(command.split("SELECT ")[1].slice(0, -1)),
            execution_time: endTime - startTime
        };
        const vemoxData = new this.vemoxDataModel({ type: 'SQL', ...resultData });
        await vemoxData.save();
        return { status: true, ...resultData };
    }
    async handleMQL(command, startTime) {
        const mqlPattern = /^print\(\d+( \+ \d+)?\);$/;
        if (!mqlPattern.test(command))
            return { status: false };
        const endTime = performance.now();
        return {
            status: true,
            query: command,
            result: eval(command.match(/print\(([^)]+)\)/)[1]),
            execution_time: endTime - startTime
        };
    }
};
exports.VemoxService = VemoxService;
exports.VemoxService = VemoxService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(vemox_schema_1.VemoxModel.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], VemoxService);
//# sourceMappingURL=vemox.service.js.map