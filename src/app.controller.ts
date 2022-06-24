import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import * as agoraToken from 'agora-access-token';
import { customResponse } from './common/reponse';
import { GenerateTokenDto } from './dtos/generateToken.dto';

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Post('generateToken')
	getHello(@Body() genTokenDto: GenerateTokenDto) {
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
		return customResponse('token', Buffer.from(token).toString('base64'));
	}
}
