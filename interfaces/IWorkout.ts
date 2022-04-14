export type IWorkoutsType = 'Cardio' | 'Cycling' | 'Running' | 'General';

export type IWorkoutsList = IWorkout[];
export interface IWorkout {
  id: number;
  title?: string;
  duration?: number;
  data?: string;
  type?: IWorkoutsType;
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

export const mockWorkoutsList: IWorkoutsList = [
  {
    id: 1,
    title: 'Workout 1',
    duration: 60,
    type: 'Cycling',
    data: '2020-05-01',
  },
  {
    id: 2,
    title: 'Workout 2',
    duration: 60,
    type: 'Running',
    data: '2020-05-01',
  },
  {
    id: 3,
    title: 'Workout 3',
    duration: 60,
    type: 'Cycling',
    data: '2020-05-01',
  },
  {
    id: 4,
    title: 'Workout 4',
    duration: 60,
    type: 'General',
    data: '2020-05-01',
  },
  {
    id: 5,
    title: 'Workout 4',
    duration: 60,
    type: 'Cardio',
    data: '2020-05-01',
  },
];
