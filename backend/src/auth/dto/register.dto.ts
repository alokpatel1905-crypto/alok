import { IsEmail, IsEnum, IsOptional, IsString, MinLength } from 'class-validator';
import { AppRole } from '../../roles/roles.enum';

export class RegisterDto {
  @IsString()
  name!: string;

  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(6)
  password!: string;

  @IsOptional()
  @IsEnum(AppRole)
  role?: AppRole;
}
