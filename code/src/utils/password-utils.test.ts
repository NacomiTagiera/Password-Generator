import {
  defaultPasswordLength,
  generatePassword,
  getRandomCharacter,
  shufflePassword,
} from "./password-utils";

describe("shufflePassword", () => {
  it("shuffles the characters in the password", () => {
    const password = "password";
    const shuffledPassword = shufflePassword(password);
    expect(shuffledPassword).not.toBe(password);
    expect([...shuffledPassword].sort().join("")).toBe(
      [...password].sort().join("")
    );
  });

  it("returns an empty string for an empty password", () => {
    const password = "";
    const shuffledPassword = shufflePassword(password);
    expect(shuffledPassword).toBe("");
  });
});

describe("getRandomCharacter", () => {
  it("returns a random character from the given characters string", () => {
    const characters = "abcde";
    const randomCharacter = getRandomCharacter(characters);
    expect(characters).toContain(randomCharacter);
  });

  it("returns an empty string for an empty characters string", () => {
    const characters = "";
    const randomCharacter = getRandomCharacter(characters);
    expect(randomCharacter).toBe("");
  });
});

describe("generatePassword", () => {
  it("returns an empty string when no options are selected or length is zero", () => {
    const password = generatePassword(false, false, false, false, 0);
    expect(password).toBe("");

    const passwordWithNoOptions = generatePassword(
      false,
      false,
      false,
      false,
      10
    );
    expect(passwordWithNoOptions).toBe("");
  });

  it("generates a password with default length when no length is specified", () => {
    const password = generatePassword(true, true, true, true);
    expect(password.length).toBe(defaultPasswordLength);
  });

  it("generates a password with the specified length and selected options", () => {
    const password = generatePassword(true, false, true, false, 10); //includes lowercase letters and special characters
    expect(password.length).toBe(10);
    expect(password).toMatch(
      /^(?=.*[!@#$%^&*-_=+<>])(?=.*[a-z])[!@#$%^&*-_=+<>a-z]+$/
    );
  });
});
