import {
  IsString,
  MinLength,
  MaxLength,
  Matches,
  IsNotEmpty,
  IsEmail,
} from 'class-validator';

export class SignInCredentialsDto {
  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(60)
  @IsEmail()
  email: string;

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
