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

export const generatePassword = (
  includeNumbers = true,
  includeLowercase = true,
  includeSymbols = true,
  includeUppercase = true,
  length = defaultPasswordLength
) => {
  const digits = "0123456789";
  const lowercaseLetters = "qwertyuiopasdfghjklzxcvbnm";
  const symbols = "!@#$%^&*-_=+<>,.";
  const uppercaseLetters = "QWERTYUIOPASDFGHJKLZXCVBNM";

  const createPassword = () => {
    if (
      (includeNumbers &&
        !includeLowercase &&
        !includeSymbols &&
        !includeUppercase) ||
      length <= 0
    ) {
      return "";
    }

    let characterList = "",
      pwd = "";

    if (includeLowercase) {
      characterList += lowercaseLetters;
      pwd += lowercaseLetters.charAt(
        Math.floor(Math.random() * lowercaseLetters.length)
      );
    }
    if (includeUppercase) {
      characterList += uppercaseLetters;
      pwd += uppercaseLetters.charAt(
        Math.floor(Math.random() * uppercaseLetters.length)
      );
    }
    if (includeNumbers) {
      characterList += digits;
      pwd += digits.charAt(Math.floor(Math.random() * digits.length));
    }
    if (includeSymbols) {
      characterList += symbols;
      pwd += symbols.charAt(Math.floor(Math.random() * symbols.length));
    }

    while (pwd.length < length) {
      const charIndex = Math.floor(Math.random() * characterList.length);
      pwd += characterList.charAt(charIndex);
    }

    return shufflePassword(pwd);
  };

  return createPassword();
};
