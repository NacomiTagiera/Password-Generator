import type { PasswordSettings } from '@/types';

export const DEFAULT_PW_LENGTH = 14;
export const PW_MIN_LENGTH = 6;
export const PW_MAX_LENGTH = 32;

export const DIGITS = '0123456789';
export const LOWERCASE_LETTERS = 'qwertyuiopasdfghjklzxcvbnm';
export const SYMBOLS = '!@#$%^&*-_=+<>,.';
export const UPPERCASE_LETTERS = 'QWERTYUIOPASDFGHJKLZXCVBNM';

export const shufflePassword = (password: string) => {
  const passwordArray = password.split('');
  let randomIndex: number,
    currentIndex = password.length;

  while (currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [passwordArray[currentIndex], passwordArray[randomIndex]] = [
      passwordArray[randomIndex],
      passwordArray[currentIndex],
    ];
  }

  return passwordArray.join('');
};

export const getRandomCharacter = (characters: string) => {
  const randomIndex = Math.floor(Math.random() * characters.length);
  return characters.charAt(randomIndex);
};

export const generatePassword = (passwordSettings: PasswordSettings) => {
  const { includeDigits, includeLowerCase, includeSymbols, includeUpperCase, length } =
    passwordSettings;
  if (
    (!includeDigits && !includeLowerCase && !includeSymbols && !includeUpperCase) ||
    Number(length) <= 0
  ) {
    return '';
  }

  let characterList = '';
  let pwd = '';

  if (includeLowerCase) {
    characterList += LOWERCASE_LETTERS;
    pwd += getRandomCharacter(LOWERCASE_LETTERS);
  }
  if (includeUpperCase) {
    characterList += UPPERCASE_LETTERS;
    pwd += getRandomCharacter(UPPERCASE_LETTERS);
  }
  if (includeDigits) {
    characterList += DIGITS;
    pwd += getRandomCharacter(DIGITS);
  }
  if (includeSymbols) {
    characterList += SYMBOLS;
    pwd += getRandomCharacter(SYMBOLS);
  }

  while (pwd.length < Number(length)) {
    pwd += getRandomCharacter(characterList);
  }

  return shufflePassword(pwd);
};
