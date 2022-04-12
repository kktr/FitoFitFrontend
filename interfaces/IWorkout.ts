export type IWorkoutsType = 'Cardio' | 'Cycling' | 'Running' | 'General';

export type IWorkoutsList = IWorkout[];
export interface IWorkout {
  id: number;
  title: string;
  duration: number;
  data: string;
  type: IWorkoutsType;
  description?: string;
}

const workoutsTypes: IWorkoutsType[] = [
  'General',
  'Cardio',
  'Cycling',
  'Running',
];

let options = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};

// .toLocaleString('en-US', {
//     weekday: 'long',
//     year: 'numeric',
//     month: 'long',
//     day: 'numeric',
//   })
// );
