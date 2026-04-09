"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAwardDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_award_dto_1 = require("./create-award.dto");
class UpdateAwardDto extends (0, mapped_types_1.PartialType)(create_award_dto_1.CreateAwardDto) {
}
exports.UpdateAwardDto = UpdateAwardDto;
//# sourceMappingURL=update-award.dto.js.map