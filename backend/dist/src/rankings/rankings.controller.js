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
exports.RankingsDataController = exports.RankingsController = void 0;
const common_1 = require("@nestjs/common");
const rankings_service_1 = require("./rankings.service");
const create_ranking_dto_1 = require("./dto/create-ranking.dto");
const update_ranking_dto_1 = require("./dto/update-ranking.dto");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const roles_guard_1 = require("../auth/roles.guard");
const roles_decorator_1 = require("../auth/roles.decorator");
let RankingsController = class RankingsController {
    rankingsService;
    constructor(rankingsService) {
        this.rankingsService = rankingsService;
    }
    async getPageConfig() {
        return this.rankingsService.getPageConfig();
    }
    async updatePageConfig(data) {
        return this.rankingsService.updatePageConfig(data);
    }
};
exports.RankingsController = RankingsController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RankingsController.prototype, "getPageConfig", null);
__decorate([
    (0, common_1.Post)('update'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('SUPER_ADMIN', 'CONTENT_EDITOR'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RankingsController.prototype, "updatePageConfig", null);
exports.RankingsController = RankingsController = __decorate([
    (0, common_1.Controller)('rankings-page'),
    __metadata("design:paramtypes", [rankings_service_1.RankingsService])
], RankingsController);
let RankingsDataController = class RankingsDataController {
    rankingsService;
    constructor(rankingsService) {
        this.rankingsService = rankingsService;
    }
    findAll(page = '1', limit = '10', category) {
        return this.rankingsService.findAll(+page || 1, +limit || 10, category);
    }
    findOne(id) {
        return this.rankingsService.findOne(id);
    }
    create(createRankingDto) {
        return this.rankingsService.create(createRankingDto);
    }
    update(id, updateRankingDto) {
        return this.rankingsService.update(id, updateRankingDto);
    }
    remove(id) {
        return this.rankingsService.remove(id);
    }
};
exports.RankingsDataController = RankingsDataController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('SUPER_ADMIN', 'PROGRAM_MANAGER', 'RANKING_REVIEWER', 'CONTENT_EDITOR'),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __param(2, (0, common_1.Query)('category')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", void 0)
], RankingsDataController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RankingsDataController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('SUPER_ADMIN', 'PROGRAM_MANAGER'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_ranking_dto_1.CreateRankingDto]),
    __metadata("design:returntype", void 0)
], RankingsDataController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('SUPER_ADMIN', 'PROGRAM_MANAGER', 'RANKING_REVIEWER'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_ranking_dto_1.UpdateRankingDto]),
    __metadata("design:returntype", void 0)
], RankingsDataController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('SUPER_ADMIN'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RankingsDataController.prototype, "remove", null);
exports.RankingsDataController = RankingsDataController = __decorate([
    (0, common_1.Controller)('rankings'),
    __metadata("design:paramtypes", [rankings_service_1.RankingsService])
], RankingsDataController);
//# sourceMappingURL=rankings.controller.js.map