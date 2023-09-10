"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const swagger_themes_1 = require("swagger-themes");
async function bootstrap() {
    const port = process.env.PORT || 3000;
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.setGlobalPrefix('api');
    app.useGlobalPipes(new common_1.ValidationPipe());
    const swaggerConfig = new swagger_1.DocumentBuilder()
        .setTitle('MVC API')
        .setDescription('This is the API document for MVC exams.')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, swaggerConfig);
    const theme = new swagger_themes_1.SwaggerTheme('v3');
    swagger_1.SwaggerModule.setup('docs', app, document, {
        customCss: theme.getBuffer('dark'),
    });
    await app.listen(port);
    common_1.Logger.log(` 📔 📔 📔 Swagger document on: http://localhost:${port}/docs`);
    common_1.Logger.log(` 🚀 🚀 🚀 Application is running on: http://localhost:${port}/api`);
}
bootstrap();
//# sourceMappingURL=main.js.map