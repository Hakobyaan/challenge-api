import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, MinLength } from "class-validator";

export class LoginUserDto {
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
}
