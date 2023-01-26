import { useState } from "react";

interface Props {
  includeDigits?: boolean;
  includeLowercase?: boolean;
  includeSymbols?: boolean;
  includeUppercase?: boolean;
  length?: number;
}

export const usePasswordGenerator = ({
  includeDigits = true,
  includeLowercase = true,
  includeSymbols = true,
  includeUppercase = true,
  length = 14,
}: Props = {}) => {
  const [password, setPassword] = useState<string>("");

  const generatePassword = () => {
    const digits = "0123456789";
    const lowercaseLetters = "qwertyuiopasdfghjklzxcvbnm";
    const symbols = "!@#$%^&*-_=+<>,.";
    const uppercaseLetters = "QWERTYUIOPASDFGHJKLZXCVBNM";

    const createPassword = () => {
      if (
        (!includeDigits &&
          !includeLowercase &&
          !includeSymbols &&
          !includeUppercase) ||
        length <= 0
      ) {
        return "";
      }

      let characterList: string = "";
      let pwd: string = "";

      if (includeLowercase) {
        characterList += lowercaseLetters;
        pwd += lowercaseLetters.charAt(
          Math.round(Math.random() * lowercaseLetters.length)
        );
      }
      if (includeUppercase) {
        characterList += uppercaseLetters;
        pwd += uppercaseLetters.charAt(
          Math.round(Math.random() * uppercaseLetters.length)
        );
      }
      if (includeDigits) {
        characterList += digits;
        pwd += digits.charAt(Math.round(Math.random() * digits.length));
      }
      if (includeSymbols) {
        characterList += symbols;
        pwd += symbols.charAt(Math.round(Math.random() * symbols.length));
      }

      while (pwd.length < length) {
        const charIndex = Math.round(Math.random() * characterList.length);
        pwd += characterList.charAt(charIndex);
      }
      return pwd;
    };
    setPassword(createPassword());
  };

  return { password, generatePassword };
};
