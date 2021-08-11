import {
  IsBoolean,
  IsDefined,
  IsNotEmpty,
  IsString,
  IsUUID,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class TaskDto {
  @IsDefined()
  @IsNotEmpty()
  @IsDefined()
  @IsString()
  name: string;
}

export class TaskParamDto {
  @IsUUID()
  @IsDefined()
  id: string;
}

export class QueryParamDto {
  @IsDefined()
  @IsBoolean()
  //@Type(() => Boolean)
  @Transform(({ value }) => {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return value;
  })
  filter: boolean;

  @IsDefined()
  @IsString()
  name: string;
}
