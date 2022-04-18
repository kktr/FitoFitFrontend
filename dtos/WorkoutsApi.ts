interface IWorkoutForApi {
  id?: number;
  title?: string;
  duration?: number;
  data?: any;
  type?: string;
  description?: string;
}

abstract class WorkoutsApiAbstract {
  static postJson: (
    url: string,
    method: string,
    data: any
  ) => Promise<IWorkoutForApi>;
  static list: () => Promise<IWorkoutForApi[]>;
  static create: (workout: IWorkoutForApi) => Promise<IWorkoutForApi>;
  static update: (workout: IWorkoutForApi) => Promise<IWorkoutForApi>;
  static delete: (workoutId: number) => Promise<void>;
}

export class WorkoutsApi extends WorkoutsApiAbstract {
  static postJson(url: string, method: string, data: any) {
    return fetch(url, {
      body: JSON.stringify(data),
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  static async list() {
    const response = await fetch(
      `https://radiant-river-13841.herokuapp.com/workouts/`
    );
    return response.json();
  }

  static async delete(workoutId: number) {
    await fetch(
      `https://radiant-river-13841.herokuapp.com/workouts/${workoutId}`,
      {
        method: 'DELETE',
      }
    );
  }

  static async update(workout: IWorkoutForApi) {
    await this.postJson(
      `https://radiant-river-13841.herokuapp.com/workouts/${workout.id}`,
      'PATCH',
      workout
    );
    return workout;
  }

  static async create(workout: IWorkoutForApi) {
    const response = await this.postJson(
      `https://radiant-river-13841.herokuapp.com/workouts/`,
      'POST',
      workout
    );
    return response.json();
  }
}
