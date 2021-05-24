import colors from './colors';

//               0  1  2  3  4   5   6   7   8   9   10  11  12
const metrics = [0, 2, 4, 8, 10, 12, 16, 20, 24, 32, 36, 40, 48, 56, 64];

const theme = {
  colors,
  // ...typography,
  space: metrics,
  sizes: metrics,
  radii: metrics,
  //          0  1   2   3   4   5   6   7   8
  fontSizes: [8, 10, 12, 14, 16, 18, 20, 24, 26, 36, 48, 80, 96],
  fontWeights: [300, 400, 500, 600, 700],
};

export default theme;
