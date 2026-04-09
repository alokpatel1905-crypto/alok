"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAccreditationDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_accreditation_dto_1 = require("./create-accreditation.dto");
class UpdateAccreditationDto extends (0, mapped_types_1.PartialType)(create_accreditation_dto_1.CreateAccreditationDto) {
}
exports.UpdateAccreditationDto = UpdateAccreditationDto;
//# sourceMappingURL=update-accreditation.dto.js.map