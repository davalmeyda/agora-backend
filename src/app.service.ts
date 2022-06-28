import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
	getHello(): string {
		return 'Agora Token Generate NestJS, revisa la documentacion en /docs';
	}
}
