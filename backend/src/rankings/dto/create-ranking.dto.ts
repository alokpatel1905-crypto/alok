import { IsNotEmpty, IsNumber, IsOptional, IsString, Min, Max } from 'class-validator';

export class CreateRankingDto {
  @IsString()
  @IsNotEmpty()
  category: string;

  @IsNumber()
  @Min(1)
  rank: number;

  @IsNumber()
  @Min(2000)
  @Max(2100)
  year: number;

  @IsNumber()
  @IsOptional()
  score?: number;

  @IsString()
  @IsNotEmpty()
  institutionId: string;
}
