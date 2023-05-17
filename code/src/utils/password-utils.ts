export const defaultPasswordLength = 14;

export const shufflePassword = (password: string) => {
  const passwordArray = password.split("");
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

  return passwordArray.join("");
};

export const getRandomCharacter = (characters: string) => {
  const randomIndex = Math.floor(Math.random() * characters.length);
  return characters.charAt(randomIndex);
};

export const generatePassword = (
  includeLowercase: boolean,
  includeNumbers: boolean,
  includeSymbols: boolean,
  includeUppercase: boolean,
  length = defaultPasswordLength
) => {
  const digits = "0123456789";
  const lowercaseLetters = "qwertyuiopasdfghjklzxcvbnm";
  const symbols = "!@#$%^&*-_=+<>,.";
  const uppercaseLetters = "QWERTYUIOPASDFGHJKLZXCVBNM";

  if (
    (!includeNumbers &&
      !includeLowercase &&
      !includeSymbols &&
      !includeUppercase) ||
    length <= 0
  ) {
    return "";
  }

  let characterList = "";
  let pwd = "";

  if (includeLowercase) {
    characterList += lowercaseLetters;
    pwd += getRandomCharacter(lowercaseLetters);
  }
  if (includeUppercase) {
    characterList += uppercaseLetters;
    pwd += getRandomCharacter(uppercaseLetters);
  }
  if (includeNumbers) {
    characterList += digits;
    pwd += getRandomCharacter(digits);
  }
  if (includeSymbols) {
    characterList += symbols;
    pwd += getRandomCharacter(symbols);
  }

  while (pwd.length < length) {
    const charIndex = Math.floor(Math.random() * characterList.length);
    pwd += characterList.charAt(charIndex);
  }

  return shufflePassword(pwd);
};
