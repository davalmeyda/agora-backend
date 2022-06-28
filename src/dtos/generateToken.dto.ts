import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class GenerateTokenDto {
	@IsString()
	@ApiProperty({ description: 'App ID', example: 'f363f9f2ab2340b08695bc000d212802' })
	appID: string;

	@IsString()
	@ApiProperty({ description: 'App Certificate', example: '616c082c8d984e68845aa61632569241' })
	appCertificate: string;

	@IsString()
	@ApiProperty({ description: 'Channel Name', example: 'channel-name' })
	channelName: string;

	@IsNumber({}, { message: 'El campo debe ser un numero' })
	@ApiProperty({ description: 'User ID', example: '12345' })
	uid: number;
}
