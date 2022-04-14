import { IWorkout, IWorkoutsType } from '@interfaces/IWorkout';

import {
  IsInt,
  Length,
  IsString,
  MinLength,
  IsOptional,
  IsNumber,
  IsDate,
  MaxLength,
  Min,
  Max,
} from 'class-validator';

export class Workout implements IWorkout {
  id!: number;

  @IsString()
  @MinLength(5)
  @MaxLength(50)
  title!: string;

  @IsInt()
  @Min(1)
  @Max(10080)
  duration!: number;

  @IsDate()
  data!: string;

  @IsString()
  @MinLength(5)
  type!: IWorkoutsType;

  @IsOptional()
  @IsString()
  @MinLength(5)
  @MaxLength(50)
  description!: string;
}
