import { ApiProperty } from '@nestjs/swagger';
import { ResultEvent } from '../models/result.model';

export class SaveUltimoResultado implements ResultEvent {
  @ApiProperty()
  id: number;

  @ApiProperty()
  sessions_id: string;

  @ApiProperty()
  numeros: string;

  @ApiProperty()
  status: number;
}
