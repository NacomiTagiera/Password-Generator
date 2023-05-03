import { generatePassword, shufflePassword } from "./password-utils";

describe("shufflePassword", () => {
  it("should return a shuffled string", () => {
    const password = "password";
    const shuffledPassword = shufflePassword(password);

    expect(shuffledPassword).not.toBe(password);
    expect(shuffledPassword.split("")).toHaveLength(password.length);
    expect([...password].every((char) => shuffledPassword.includes(char))).toBe(
      true
    );
  });

  it("should return an empty string when given an empty string", () => {
    const password = "";
    const shuffledPassword = shufflePassword(password);

    expect(shuffledPassword).toBe(password);
  });
});

describe("generatePassword", () => {
  it("should generate a password of the given length", () => {});
});
