import { ApiProperty } from "@nestjs/swagger";
import {
  IsEmail,
  IsString,
  MinLength,
  IsOptional,
  IsInt,
} from "class-validator";

export class CreateUserDto {
  @ApiProperty({
    example: "John",
    description: "User's first name",
    minLength: 3,
  })
  @IsString()
  @MinLength(3)
  first_name: string;

  @ApiProperty({
    example: "Doe",
    description: "User's last name",
    minLength: 3,
  })
  @IsString()
  @MinLength(3)
  last_name: string;

  @ApiProperty({ example: "john.doe@example.com", description: "User's email" })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: "StrongPass123!",
    description: "User's password",
    minLength: 8,
  })
  @IsString()
  @MinLength(8)
  password: string;

  @ApiProperty({
    example: 25,
    description: "User's age (optional)",
    required: false,
  })
  @IsOptional()
  @IsInt()
  age?: number;
}
