import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class TaskDto {
  @IsDefined()
  @IsNotEmpty()
  @IsDefined()
  @IsString()
  name: string;
}
