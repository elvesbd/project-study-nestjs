import { IsDefined, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class TaskDto {
  @IsDefined()
  @IsNotEmpty()
  @IsDefined()
  @IsString()
  name: string;

  @IsUUID()
  @IsDefined()
  id: string;
}
