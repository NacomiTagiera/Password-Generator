import { useState } from "react";

import { PasswordFormat } from "./types/PasswordFormat";

import "./App.css";
import Checkbox from "./components/Checkbox";

function App() {
  const [passwordFormat, setPasswordFormat] = useState<PasswordFormat>({
    length: 5,
    uppercase: false,
    lowercase: false,
    numbers: false,
    symbols: false,
  });
  const [copied, setCopied] = useState<boolean>(false);
  const [handleText, setHandleText] = useState<string>("");

  const handleChangeUppercase = () => {
    setPasswordFormat({
      ...passwordFormat,
      uppercase: !passwordFormat.uppercase,
    });
  };

  const handleChangeLowercase = () => {
    setPasswordFormat({
      ...passwordFormat,
      lowercase: !passwordFormat.lowercase,
    });
  };

  const handleChangeNumbers = () => {
    setPasswordFormat({
      ...passwordFormat,
      numbers: !passwordFormat.numbers,
    });
  };

  const handleChangeSymbols = () => {
    setPasswordFormat({
      ...passwordFormat,
      symbols: !passwordFormat.symbols,
    });
  };

  const setPasswordLength = (value: number) => {
    setPasswordFormat({
      ...passwordFormat,
      length: value,
    });
  };

  function generatePassword() {
    const numbersArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
    const symbolsArray = ["!", "@", "#", "$", "%", "^", "&", "*", "(", ")"];

    const characterCodes = Array.from(Array(26)).map((_e, i) => i + 97);
    const lowerCaseLetters = characterCodes.map((code) =>
      String.fromCharCode(code)
    );
    const upperCaseLetters = lowerCaseLetters.map((letter) =>
      letter.toUpperCase()
    );

    const { length, uppercase, lowercase, numbers, symbols } = passwordFormat;

    const generateTheWord = ({
      length,
      uppercase,
      lowercase,
      numbers,
      symbols,
    }: PasswordFormat) => {
      const availableCharacters = [
        ...(lowercase ? lowerCaseLetters : []),
        ...(uppercase ? upperCaseLetters : []),
        ...(numbers ? numbersArray : []),
        ...(symbols ? symbolsArray : []),
      ];

      const shuffleArray = (array: Array<string | number>) =>
        array.sort(() => Math.random() - 0.5);
      const characters = shuffleArray(availableCharacters).slice(0, length);
      setHandleText(characters.join(""));
      return characters;
    };

    generateTheWord({ length, uppercase, lowercase, numbers, symbols });
  }

  return (
    <div className="wrapper">
      <div className="container wrapper-box">
        <h1 className="header">Password Generator</h1>
        <div className="password-box">
          <input
            type="text"
            value={handleText}
            placeholder="Password..."
            autoComplete="off"
            onChange={(e) => setHandleText(e.target.value)}
          />
          <button
            className="copy-button"
            onClick={() => {
              if (handleText.length > 0) {
                navigator.clipboard.writeText(handleText);
                setCopied(true);
                setInterval(() => {
                  setCopied(false);
                }, 2000);
              }
            }}
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
        <br />
        <div className="word-crieteria__box">
          <div>
            <label>Password length</label>
          </div>
          <div>
            <input
              type="number"
              min="5"
              max="25"
              value={passwordFormat.length}
              onChange={(e) => setPasswordLength(Number(e.target.value))}
            />
          </div>
        </div>
        <div className="word-crieteria__box">
          <div>
            <label>Include uppercase letters</label>
          </div>
          <div>
            <Checkbox
              isChecked={passwordFormat.uppercase}
              onChange={handleChangeUppercase}
            />
          </div>
        </div>
        <div className="word-crieteria__box">
          <div>
            <label>Include lowercase letters</label>
          </div>
          <div>
            <Checkbox
              isChecked={passwordFormat.lowercase}
              onChange={handleChangeLowercase}
            />
          </div>
        </div>
        <div className="word-crieteria__box">
          <div>
            <label>Include numbers</label>
          </div>
          <div>
            <Checkbox
              isChecked={passwordFormat.numbers}
              onChange={handleChangeNumbers}
            />
          </div>
        </div>
        <div className="word-crieteria__box">
          <div>
            <label>Include symbols</label>
          </div>
          <div>
            <Checkbox
              isChecked={passwordFormat.symbols}
              onChange={handleChangeSymbols}
            />
          </div>
        </div>
        <div>
          <button className="generate-button" onClick={generatePassword}>
            Generate password
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
