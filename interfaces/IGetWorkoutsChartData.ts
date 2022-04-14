export type IGetWorkoutsChartData = [
  {
    name: 'All';
    running: number;
    cycling: number;
    cardio: number;
    general: number;
  },
  { name: 'General'; general: number },
  { name: 'Cardio'; cardio: number },
  { name: 'Cycling'; cycling: number },
  { name: 'Running'; running: number }
];
