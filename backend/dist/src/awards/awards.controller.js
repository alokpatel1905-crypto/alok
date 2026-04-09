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
exports.AwardsController = void 0;
const common_1 = require("@nestjs/common");
const awards_service_1 = require("./awards.service");
const create_award_dto_1 = require("./dto/create-award.dto");
const update_award_dto_1 = require("./dto/update-award.dto");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const roles_guard_1 = require("../auth/roles.guard");
const roles_decorator_1 = require("../auth/roles.decorator");
let AwardsController = class AwardsController {
    awardsService;
    constructor(awardsService) {
        this.awardsService = awardsService;
    }
    create(createAwardDto) {
        return this.awardsService.create(createAwardDto);
    }
    findAll(page = '1', limit = '10', search, year, status) {
        return this.awardsService.findAll(+page || 1, +limit || 10, search, year ? +year : undefined, status);
    }
    createNomination(body) {
        return this.awardsService.createNomination(body);
    }
    findAllNominations(page = '1', limit = '10') {
        return this.awardsService.findAllNominations(+page || 1, +limit || 10);
    }
    updateNomStatus(id, status) {
        return this.awardsService.updateNominationStatus(id, status);
    }
    toggleArchive(id) {
        return this.awardsService.toggleArchive(id);
    }
    findOne(id) {
        return this.awardsService.findOne(id);
    }
    update(id, updateAwardDto) {
        return this.awardsService.update(id, updateAwardDto);
    }
    remove(id) {
        return this.awardsService.remove(id);
    }
};
exports.AwardsController = AwardsController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)('SUPER_ADMIN', 'PROGRAM_MANAGER'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_award_dto_1.CreateAwardDto]),
    __metadata("design:returntype", void 0)
], AwardsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __param(2, (0, common_1.Query)('search')),
    __param(3, (0, common_1.Query)('year')),
    __param(4, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String]),
    __metadata("design:returntype", void 0)
], AwardsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)('nominate'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AwardsController.prototype, "createNomination", null);
__decorate([
    (0, common_1.Get)('nominations'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('SUPER_ADMIN', 'PROGRAM_MANAGER'),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], AwardsController.prototype, "findAllNominations", null);
__decorate([
    (0, common_1.Patch)('nominations/:id/status'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('SUPER_ADMIN', 'PROGRAM_MANAGER'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], AwardsController.prototype, "updateNomStatus", null);
__decorate([
    (0, common_1.Patch)(':id/toggle-archive'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('SUPER_ADMIN', 'PROGRAM_MANAGER'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AwardsController.prototype, "toggleArchive", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AwardsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, roles_decorator_1.Roles)('SUPER_ADMIN', 'PROGRAM_MANAGER'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_award_dto_1.UpdateAwardDto]),
    __metadata("design:returntype", void 0)
], AwardsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)('SUPER_ADMIN'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AwardsController.prototype, "remove", null);
exports.AwardsController = AwardsController = __decorate([
    (0, common_1.Controller)('awards'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [awards_service_1.AwardsService])
], AwardsController);
//# sourceMappingURL=awards.controller.js.map