"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersModule = void 0;
const common_1 = require("@nestjs/common");
const service_1 = require("./service");
const controller_1 = require("./controller");
const repository_1 = require("./repository");
const database_module_1 = require("../../database/database.module");
const module_1 = require("../auth/module");
let UsersModule = class UsersModule {
};
exports.UsersModule = UsersModule;
exports.UsersModule = UsersModule = __decorate([
    (0, common_1.Module)({
        imports: [database_module_1.DatabaseModule, module_1.AuthModule],
        providers: [service_1.UsersService, repository_1.UsersRepository],
        controllers: [controller_1.UsersController],
        exports: [service_1.UsersService],
    })
], UsersModule);
//# sourceMappingURL=module.js.map