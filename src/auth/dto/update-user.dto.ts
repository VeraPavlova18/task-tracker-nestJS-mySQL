import {
  IsString,
  MinLength,
  MaxLength,
  Matches,
  IsNotEmpty,
  IsEmail,
  IsDate,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateUserDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(60)
  firstName: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(60)
  lastName: string;

  @IsOptional()
  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(60)
  @IsEmail()
  email: string;

  @IsOptional()
  @IsNotEmpty()
  @Matches(/^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/, {
    message: 'Invalid phone number',
  })
  phone: string;

  @IsOptional()
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  birthday: Date;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'Passport must be from 8 to 20 symbol length and matches at min: one symbol A-Z, one a-z and number or characters _, -',
  })
  password: string;
}
