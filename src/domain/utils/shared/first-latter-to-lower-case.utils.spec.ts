import { firstLetterToLowerCase } from './first-letter-to-lower-case.utils';

describe('firstLetterToLowerCase', () => {
  it('converts the first letter of a string to lowercase', () => {
    const inputString = 'HelloWorld';

    const result = firstLetterToLowerCase(inputString);

    expect(result).toBe('helloWorld');
  });

  it('handles an empty string', () => {
    const inputString = '';

    const result = firstLetterToLowerCase(inputString);

    expect(result).toBe('');
  });

  it('handles a single-character string', () => {
    const inputString = 'A';

    const result = firstLetterToLowerCase(inputString);

    expect(result).toBe('a');
  });
});
