"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const config = require("config");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const serverConfig = config.get('server');
    const port = serverConfig.port;
    common_1.Logger.log(`Application running on port ${port}`);
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map