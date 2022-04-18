import React, { useContext } from 'react';
import { IWorkoutsContext } from '../interfaces/IWorkoutsContext';
import { WorkoutsContext } from '../pages/workouts';
import { getWorkoutsChartData } from '../helpers/getWorkoutsChartData';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

export function WorkoutsBarChart() {
  const { workoutsList } = useContext(WorkoutsContext) as IWorkoutsContext;

  return (
    <BarChart
      className="flex w-full mb-8 "
      width={400}
      height={300}
      data={workoutsList && getWorkoutsChartData(workoutsList)}
      margin={{
        top: 20,
        right: 25,
        left: 0,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis allowDecimals={false} />
      <Tooltip />
      <Legend />
      <Bar dataKey="all" stackId="a" fill="#8884d8" />
      <Bar dataKey="general" stackId="a" fill="#7766cd" />
      <Bar dataKey="cardio" stackId="a" fill="#229dca" />
      <Bar dataKey="cycling" stackId="a" fill="#829dca" />
      <Bar dataKey="running" stackId="a" fill="#82ca9d" />
    </BarChart>
  );
}
