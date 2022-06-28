import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	// CONFIGURAMOS LA VALIDACION DE LOS DATOS ENVIADOS POR EL CLIENTE
	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			// ESTE CAMPO ES OPCIONAL SI DESEAMOS QUE SOLO SE VALIDE LOS
			// CAMPOS QUE SEAN REQUERIDOS E IGNORAR LOS SOBRANTES
			forbidNonWhitelisted: false,
			transformOptions: {
				// COMBIERTE LOS VALORES DEL QUERY DE MANERA IMPLICITA
				// POR EJEMPLO: ?nombre=juan&apellido=perez
				// CONVIERTE LOS DATOS CON SUS RESPECTIVOS TIPOS SI ES ENTERO O STRING
				enableImplicitConversion: true,
			},
		}),
	);

	app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

	// HABILITAMOS LOS CORS PARA PODER VISUALIZAR DESDE OTRO DOMINIO
	app.enableCors();

	/** Genera una documentacion general */
	const config = new DocumentBuilder()
		.setTitle('Agora Token Generate NestJS')
		.setDescription('Generador de token para proyecto de Agora')
		.setVersion('1.0.0')
		.build();
	const configGeneral = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('docs', app, configGeneral);

	// INTERSEPTOR PARA MANEJAR LOS ERRORES
	// app.useGlobalInterceptors(new ErroresInterceptor());

	await app.listen(3000);
}
bootstrap();
