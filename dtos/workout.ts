import { IWorkout } from '../interfaces/IWorkout';
import { IWorkoutsType, workoutsTypes } from '../interfaces/IWorkoutsType';

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
  MinDate,
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

  @MinDate(new Date('2021-12-31T00:00:00.000Z'), {
    message: 'minimum allowed date is 2022-01-01',
  })
  @IsDate({
    message: 'select the date of the workout',
  })
  data!: Date;

  @IsString()
  @MinLength(5, {
    message: 'select the type of the workout',
  })
  @IsIn(workoutsTypes)
  type!: IWorkoutsType;

  @MaxLength(50)
  @MinLength(5)
  @IsString()
  @IsOptional()
  description!: string;
}
