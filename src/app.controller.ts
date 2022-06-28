import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import * as agoraToken from 'agora-access-token';
import { customResponse } from './common/reponse';
import { GenerateTokenDto } from './dtos/generateToken.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('Token')
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Get()
	getHello() {
		return this.appService.getHello();
	}

	@Post('generateToken')
	@ApiOperation({
		summary: 'Generar token',
	})
	getToken(@Body() genTokenDto: GenerateTokenDto) {
		const role = agoraToken.RtcRole.PUBLISHER;
		const expirationTimeInSeconds = 3600;
		const currentTimestamp = Math.floor(Date.now() / 1000);
		const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;

		const token = agoraToken.RtcTokenBuilder.buildTokenWithUid(
			genTokenDto.appID,
			genTokenDto.appCertificate,
			genTokenDto.channelName,
			genTokenDto.uid,
			role,
			privilegeExpiredTs,
		);
		return customResponse('token generate in base64', Buffer.from(token).toString('base64'));
	}
}
