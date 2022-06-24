import { IsNumber, IsString } from 'class-validator';

export class GenerateTokenDto {
	@IsString()
	appID: string;

	@IsString()
	appCertificate: string;

	@IsString()
	channelName: string;

	@IsNumber()
	uid: number;
}
