import { contains } from 'ramda';
const ValidateJS = require('validate.js');

// HACK(steve): wierd typescript situation because of strange typings
const Validate: any = ValidateJS.default ? ValidateJS.default : ValidateJS;

/**
 * Validates that 1 attribute doesn't appear in another's attributes content.
 */
Validate.validators.excludes = function custom(
  value,
  options,
  key,
  attributes,
) {
  const list = attributes[options.attribute] || [];
  if (value && contains(value, list)) {
    return options.message || `${value} is in the list`;
  }
};

/**
 * Validates that another attribute isn't true.
 */
Validate.validators.tripped = function custom(value, options, key, attributes) {
  if (value && attributes[options.attribute] === true) {
    return options.message || `${options.attribute} is true`;
  }
};

/**
 * Defines the rules for validating.
 *
 * Example:
 * ```ts
 * const RULES = {
 *   favoriteBand: {
 *     inclusion: { ['Weezer', 'Other'], message: 'Pick wisely.' }
 *   },
 *   name: {
 *     presence: { message: 'A developer has no name?' }
 *   }
 * }
 * validate(RULES, {})
 * ```
 *
 * See https://validatejs.org/#validators for more examples.
 *
 */
export interface ValidationRules {
  [key: string]: Record<string, unknown>;
}

/**
 * An object containing any errors found.
 *
 * Example:
 * ```js
 * {
 *   email: ['Invalid email address.'],
 *   password: [
 *     'Password must be 6 characters.',
 *     'Password must have at least 1 digit.'
 *   ]
 * }
 * ```
 */
export interface ValidationErrors {
  [key: string]: string[];
}

/**
 * Runs the given rules against the data object.
 *
 * @param rules The rules to apply.
 * @param data The object to validate.
 */
export function validate(
  rules: ValidationRules,
  data: Record<string, unknown>,
): ValidationErrors {
  if (typeof data !== 'object') {
    return {} as ValidationErrors;
  }
  return Validate(data, rules, { fullMessages: false }) || {};
}

export enum PASSWORD_REQUIREMENT_ENUM {
  EIGHT_CHARACTER,
  LOWER_CHARACTER,
  ONE_CAPITAL,
  ONE_NUMBER,
}

export function passwordStrengthResults(password: string): boolean[] {
  const result: boolean[] = [];
  const anUpperCase = /[A-Z]/;
  const aLowerCase = /[a-z]/;
  const aNumber = /[0-9]/;

  result[PASSWORD_REQUIREMENT_ENUM.EIGHT_CHARACTER] = password.length >= 8;

  for (let i = 0; i < password.length; i++) {
    const p = password[i];
    if (anUpperCase.test(p))
      result[PASSWORD_REQUIREMENT_ENUM.ONE_CAPITAL] = true;
    else if (aLowerCase.test(p))
      result[PASSWORD_REQUIREMENT_ENUM.LOWER_CHARACTER] = true;
    else if (aNumber.test(p))
      result[PASSWORD_REQUIREMENT_ENUM.ONE_NUMBER] = true;
  }

  return result;
}
