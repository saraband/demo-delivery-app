import { hexToRgb } from 'HELPERS';

export default {
  BLACK: '#111111',
  LIGHT_GREY: '#DDD',
  GREY: '#999',
  DARK_GREY: '#545454',
  WHITE: '#FFFFFF',
  BLUE: '#0074D9',
  LIGHT_BLUE: '#7FDBFF',
  DARK_BLUE: '#001f3f',
  RED: '#FF4136',
  ORANGE: '#ff851b',
  DARK_ORANGE: '#ee6e00',
  GREEN: '#3D9970',
  LIGHT_GREEN: '#01FF70'
};

/*
TODO: maybe add this later
export default Object.keys(Colors).reduce((acc, key) => {
  const rgb = hexToRgb(Colors[key]);
  acc[key] = {
    hex: Colors[key],
    rgba: (alpha) => `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`
  };

  return acc;
}, {});*/