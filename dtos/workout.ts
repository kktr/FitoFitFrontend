import { IWorkout, IWorkoutsType, workoutsTypes } from '@interfaces/IWorkout';

import {
  IsInt,
  IsString,
  MinLength,
  IsOptional,
  IsDate,
  MaxLength,
  Min,
  Max,
  IsIn,
} from 'class-validator';

export class Workout implements IWorkout {
  id!: number;

  @IsString()
  @MaxLength(50)
  @MinLength(5)
  title!: string;

  @Max(10080)
  @Min(1)
  @IsInt({
    message: 'enter the length of the workout in minutes',
  })
  duration!: number;

  @IsDate({
    message: 'select the date of the workout',
  })
  data!: string;

  @IsString()
  @MinLength(5, {
    message: 'select the type of the workout',
  })
  @IsIn(workoutsTypes)
  type!: IWorkoutsType;

  @Max(5)
  @Min(1)
  @IsInt()
  difficulty!: number;

  @Max(5)
  @Min(1)
  @IsInt()
  feelings!: number;

  @MaxLength(50)
  @MinLength(5)
  @IsString()
  @IsOptional()
  description!: string;
}
