import { type PasswordSettings } from '@/types';

import { generatePassword, getRandomCharacter, shufflePassword } from './password-utils';

describe('Password utils', () => {
  describe('shufflePassword', () => {
    it('shuffles the characters in the password', () => {
      const password = 'password';
      const shuffledPassword = shufflePassword(password);

      expect(shuffledPassword).not.toBe(password);
      expect(shuffledPassword.split('').sort().join('')).toBe(password.split('').sort().join(''));
    });

    it('returns an empty string for an empty password', () => {
      const password = '';
      const shuffledPassword = shufflePassword(password);

      expect(shuffledPassword).toBe('');
    });
  });

  describe('getRandomCharacter', () => {
    it('returns a random character from the given characters string', () => {
      const characters = 'abcde';
      const randomCharacter = getRandomCharacter(characters);

      expect(characters).toContain(randomCharacter);
    });

    it('returns an empty string for an empty characters string', () => {
      const characters = '';
      const randomCharacter = getRandomCharacter(characters);

      expect(randomCharacter).toBe('');
    });
  });

  describe('generatePassword', () => {
    const passwordSettings: PasswordSettings = {
      includeLowerCase: true,
      includeUpperCase: true,
      includeDigits: true,
      includeSymbols: true,
      length: 10,
    };

    it('returns an empty string when no options are selected', () => {
      const passwordWithNoOptions = generatePassword({
        includeLowerCase: false,
        includeUpperCase: false,
        includeDigits: false,
        includeSymbols: false,
        length: 10,
      });

      expect(passwordWithNoOptions).toBe('');
    });

    it('returns an empty string when the length is 0', () => {
      const password = generatePassword({ ...passwordSettings, length: 0 });

      expect(password).toBe('');
    });

    it('generates a password with the specified length and selected options', () => {
      const password = generatePassword({
        ...passwordSettings,
        includeUpperCase: false,
        includeSymbols: false,
      });

      expect(password.length).toBe(passwordSettings.length);
      expect(password).toMatch(/^(?=.*[a-z])(?=.*[0-9])[a-z0-9]+$/);
    });
  });
});
