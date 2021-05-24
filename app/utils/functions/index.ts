import * as formating from './formating';

/**
 * A "modern" sleep statement.
 *
 * @param ms The number of milliseconds to wait.
 */
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const FUNCTIONS = {
  ...formating,
  delay,
};

export { FUNCTIONS };
