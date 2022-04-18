export interface IWorkout {
  id?: number;
  title?: string;
  duration?: number;
  data?: any;
  type?: string;
  description?: string;
}

interface IWorkoutApi {
  list: () => Promise<IWorkout[]>;
  create: (workout: IWorkout) => Promise<IWorkout>;
  update: (workout: IWorkout) => Promise<IWorkout>;
  delete: (workout: IWorkout) => Promise<void>;
}

export class WorkoutsApi {
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
    const response = await fetch(`${process.env.NEXT_PUBLIC_DB_HOST}`);
    const data = await response.json();
    return data;
  }

  static async delete(workoutId: number) {
    await fetch(`${process.env.NEXT_PUBLIC_DB_HOST}${workoutId}`, {
      method: 'DELETE',
    });
  }

  static async update(workout: IWorkout) {
    const newWorkout = await this.postJson(
      `${process.env.NEXT_PUBLIC_DB_HOST}${workout.id}`,
      'PATCH',
      workout
    );
    return workout;
  }

  static async create(workout: IWorkout) {
    const response = await this.postJson(
      `${process.env.NEXT_PUBLIC_DB_HOST}`,
      'POST',
      workout
    );
    return response.json();
  }
}
