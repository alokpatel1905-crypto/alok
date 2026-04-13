"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
require("dotenv/config");
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const path_1 = require("path");
const fs_1 = require("fs");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    const uploadsPath = (0, path_1.join)(process.cwd(), 'uploads');
    console.log('Uploads path:', uploadsPath);
    console.log('Uploads folder exists:', (0, fs_1.existsSync)(uploadsPath));
    if ((0, fs_1.existsSync)(uploadsPath)) {
        app.useStaticAssets(uploadsPath, {
            prefix: '/uploads',
        });
    }
    app.enableCors();
    await app.listen(4000, '0.0.0.0');
    console.log('Backend running on http://localhost:4000');
}
bootstrap();
//# sourceMappingURL=main.js.map