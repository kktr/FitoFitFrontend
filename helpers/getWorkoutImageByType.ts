export const getWorkoutImageByType = (type: string): string => {
  let imageSrc: string;

  switch (type) {
    case 'General':
      imageSrc = 'https://i.ibb.co/qJJLDbm/General.png';
      break;
    case 'Cardio':
      imageSrc = 'https://i.ibb.co/N64wSyb/Cardio.png';
      break;
    case 'Running':
      imageSrc = 'https://i.ibb.co/B3gcXST/Running.png';
      break;
    case 'Cycling':
      imageSrc = 'https://i.ibb.co/qRZz2xN/Cycling.png';
      break;
    default:
      imageSrc = 'https://i.ibb.co/qJJLDbm/General.png';
  }

  return imageSrc;
};
