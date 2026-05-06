// unit.test.js

import {
  isPhoneNumber,
  isEmail,
  isStrongPassword,
  isDate,
  isHexColor,
} from '../code-to-unit-test/unit-test-me';

// TODO - Part 2
// ----- isPhoneNumber -----
describe('isPhoneNumber', () => {
  // Two that should return true
  test('accepts a phone number in (xxx) xxx-xxxx format', () => {
    expect(isPhoneNumber('(123) 456-7890')).toBe(true);
  });

  test('accepts a phone number in xxx-xxx-xxxx format', () => {
    expect(isPhoneNumber('123-456-7890')).toBe(true);
  });

  // Two that should return false
  test('rejects a string that is not a phone number', () => {
    expect(isPhoneNumber('hello world')).toBe(false);
  });

  test('rejects a phone number with too few digits', () => {
    expect(isPhoneNumber('123-45-6789')).toBe(false);
  });
});

// ----- isEmail -----
describe('isEmail', () => {
  // Two that should return true
  test('accepts a standard email address', () => {
    expect(isEmail('test@example.com')).toBe(true);
  });

  test('accepts an email with a 2-letter top-level domain', () => {
    expect(isEmail('student@school.io')).toBe(true);
  });

  // Two that should return false
  test('rejects a string with no @ symbol', () => {
    expect(isEmail('not-an-email.com')).toBe(false);
  });

  test('rejects a string with no domain', () => {
    expect(isEmail('user@')).toBe(false);
  });
});

// ----- isStrongPassword -----
describe('isStrongPassword', () => {
  // Two that should return true
  test('accepts a password starting with a letter, alphanumeric + underscore', () => {
    expect(isStrongPassword('Hello1')).toBe(true);
  });

  test('accepts a password using underscores', () => {
    expect(isStrongPassword('user_42')).toBe(true);
  });

  // Two that should return false
  test('rejects a password that starts with a number', () => {
    expect(isStrongPassword('1abcde')).toBe(false);
  });

  test('rejects a password longer than 15 characters', () => {
    expect(isStrongPassword('abcdefghijklmnop')).toBe(false);
  });
});

// ----- isDate -----
describe('isDate', () => {
  // Two that should return true
  test('accepts a date in MM/DD/YYYY format', () => {
    expect(isDate('12/25/2023')).toBe(true);
  });

  test('accepts a single-digit month and day', () => {
    expect(isDate('1/5/2024')).toBe(true);
  });

  // Two that should return false
  test('rejects a date with dashes instead of slashes', () => {
    expect(isDate('12-25-2023')).toBe(false);
  });

  test('rejects a date with a two-digit year', () => {
    expect(isDate('12/25/23')).toBe(false);
  });
});

// ----- isHexColor -----
describe('isHexColor', () => {
  // Two that should return true
  test('accepts a 6-digit hex color with #', () => {
    expect(isHexColor('#a3c113')).toBe(true);
  });

  test('accepts a 3-digit hex color', () => {
    expect(isHexColor('#fff')).toBe(true);
  });

  // Two that should return false
  test('rejects a hex color with non-hex characters', () => {
    expect(isHexColor('#zzzzzz')).toBe(false);
  });

  test('rejects a hex color of the wrong length', () => {
    expect(isHexColor('#12345')).toBe(false);
  });
});