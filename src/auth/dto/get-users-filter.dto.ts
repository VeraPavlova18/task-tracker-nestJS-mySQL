import { IsNotEmpty, IsOptional, IsNumberString } from 'class-validator';

export class GetUsersFilterDto {
  @IsOptional()
  @IsNotEmpty()
  @IsNumberString()
  take: string;

  @IsOptional()
  @IsNotEmpty()
  @IsNumberString()
  skip: string;

  @IsOptional()
  @IsNotEmpty()
  search: string;
}
