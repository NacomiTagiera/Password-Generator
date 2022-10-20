import { useState } from "react";

import "./App.css";

function App() {
  const [password, setPassword] = useState<string>("");
  const [length, setLength] = useState<number>(8);
  const [includeLowercase, setIncludeLowercase] = useState<boolean>(false);
  const [includeUppercase, setIncludeUppercase] = useState<boolean>(false);
  const [includeDigits, setIncludeDigits] = useState<boolean>(false);
  const [includeSymbols, setIncludeSymbols] = useState<boolean>(false);
  const [isCopied, setIsCopied] = useState<boolean>(false);

  function handleGeneratePassword() {
    const uppercaseLetters: string = "QWERTYUIOPASDFGHJKLZXCVBNM";
    const lowercaseLetters: string = "qwertyuiopasdfghjklzxcvbnm";
    const digits: string = "0123456789";
    const symbols: string = "!@#$%^&*()-_=+{}[]<>,.";

    function createPassword() {
      let characterList = "";
      let pwd = "";

      if (includeLowercase && password.length < length) {
        characterList += lowercaseLetters;
        pwd += lowercaseLetters.charAt(
          Math.round(Math.random() * lowercaseLetters.length)
        );
      }
      if (includeUppercase && password.length < length) {
        characterList += uppercaseLetters;
        pwd += uppercaseLetters.charAt(
          Math.round(Math.random() * uppercaseLetters.length)
        );
      }
      if (includeDigits && password.length < length) {
        characterList += digits;
        pwd += digits.charAt(Math.round(Math.random() * digits.length));
      }
      if (includeSymbols && password.length < length) {
        characterList += symbols;
        pwd += symbols.charAt(Math.round(Math.random() * symbols.length));
      }

      for (let i = 0; i < length - pwd.length; i++) {
        const charIndex: number = Math.round(
          Math.random() * characterList.length
        );
        pwd += characterList.charAt(charIndex);
      }
      return pwd;
    }
    setPassword(createPassword());
  }

  return (
    <div className="container">
      <h1 className="header">Password Generator</h1>
      <div className="password-box">
        <input
          type="text"
          value={password}
          placeholder="Password..."
          autoComplete="off"
          readOnly={true}
        />
        <button
          className="copy-button"
          onClick={() => {
            if (password.length > 0) {
              navigator.clipboard.writeText(password);
              setIsCopied(true);
              setInterval(() => {
                setIsCopied(false);
              }, 2500);
            }
          }}
        >
          {isCopied ? "Copied!" : "Copy"}
        </button>
      </div>
      <br />
      <div className="password-format">
        <div>
          <label>Password length</label>
        </div>
        <div>
          <input
            type="number"
            min="8"
            max="25"
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
          />
        </div>
      </div>
      <div className="password-format">
        <div>
          <label>Include uppercase letters</label>
        </div>
        <input
          checked={includeUppercase}
          onChange={(e) => setIncludeUppercase(e.target.checked)}
          type="checkbox"
        />
      </div>
      <div className="password-format">
        <div>
          <label>Include lowercase letters</label>
        </div>
        <input
          checked={includeLowercase}
          onChange={(e) => setIncludeLowercase(e.target.checked)}
          type="checkbox"
        />
      </div>
      <div className="password-format">
        <div>
          <label>Include numbers</label>
        </div>
        <input
          checked={includeDigits}
          onChange={(e) => setIncludeDigits(e.target.checked)}
          type="checkbox"
        />
      </div>
      <div className="password-format">
        <div>
          <label>Include symbols</label>
        </div>
        <input
          checked={includeSymbols}
          onChange={(e) => setIncludeSymbols(e.target.checked)}
          type="checkbox"
        />
      </div>
      <div>
        <button className="generate-button" onClick={handleGeneratePassword}>
          Generate password
        </button>
      </div>
    </div>
  );
}

export default App;
