import { act, renderHook } from "@testing-library/react";
import {
  defaultPasswordLength,
  usePasswordGenerator,
} from "../usePasswordGenerator";

describe("usePasswordGenerator", () => {
  test("should render the initial password", () => {
    const { result } = renderHook(usePasswordGenerator);
    expect(result.current.password).toBe("");
  });

  test("should generate a password of the given length", () => {
    const { result } = renderHook(usePasswordGenerator, {
      initialProps: { length: 8 },
    });
    act(() => result.current.generatePassword());
    expect(result.current.password.length).toBe(8);
  });

  test("should generate empty password if nothing is checked", () => {
    const { result } = renderHook(usePasswordGenerator, {
      initialProps: {
        includeDigits: false,
        includeLowercase: false,
        includeSymbols: false,
        includeUppercase: false,
      },
    });
    act(() => result.current.generatePassword());
    expect(result.current.password).toBe("");
  });

  test("should generate empty password if length is set to 0", () => {
    const { result } = renderHook(usePasswordGenerator, {
      initialProps: { length: 0 },
    });
    act(() => result.current.generatePassword());
    expect(result.current.password).toBe("");
  });

  test("should generate correct password when only digits option is checked", () => {
    const { result } = renderHook(usePasswordGenerator, {
      initialProps: {
        includeLowercase: false,
        includeSymbols: false,
        includeUppercase: false,
      },
    });
    act(() => result.current.generatePassword());

    const digitsOnlyRegex = new RegExp(
      "^[0-9]{" + defaultPasswordLength + "}$"
    );

    expect(result.current.password).toMatch(digitsOnlyRegex);
  });

  test("should generate correct password when only lowercase letters option is checked", () => {
    const { result } = renderHook(usePasswordGenerator, {
      initialProps: {
        includeDigits: false,
        includeSymbols: false,
        includeUppercase: false,
      },
    });
    act(() => result.current.generatePassword());

    const lowercaseOnlyRegex = new RegExp(
      "^[a-z]{" + defaultPasswordLength + "}$"
    );

    expect(result.current.password).toMatch(lowercaseOnlyRegex);
  });

  test("should generate correct password when only symbols option is checked", () => {
    const { result } = renderHook(usePasswordGenerator, {
      initialProps: {
        includeDigits: false,
        includeLowercase: false,
        includeUppercase: false,
      },
    });
    act(() => result.current.generatePassword());

    const symbolsOnlyRegex = new RegExp(
      "^[!@#$%^&*-_=+<>,.]{" + defaultPasswordLength + "}$"
    );

    expect(result.current.password).toMatch(symbolsOnlyRegex);
  });

  test("should generate correct password when only uppercase letters option is checked", () => {
    const { result } = renderHook(usePasswordGenerator, {
      initialProps: {
        includeDigits: false,
        includeLowercase: false,
        includeSymbols: false,
      },
    });
    act(() => result.current.generatePassword());

    const uppercaseOnlyRegex = new RegExp(
      "^[A-Z]{" + defaultPasswordLength + "}$"
    );

    expect(result.current.password).toMatch(uppercaseOnlyRegex);
  });

  test("should generate correct password when digits and lowercase letters options are checked", () => {
    const { result } = renderHook(usePasswordGenerator, {
      initialProps: {
        includeSymbols: false,
        includeUppercase: false,
      },
    });
    act(() => result.current.generatePassword());

    const digitsAndLowerRegex = new RegExp(
      "^(?=.*[a-z])(?=.*[0-9])\\S{" + defaultPasswordLength + "}$"
    );

    expect(result.current.password).toMatch(digitsAndLowerRegex);
  });

  test("should generate correct password when digits and symbols options are checked", () => {
    const { result } = renderHook(usePasswordGenerator, {
      initialProps: {
        includeLowercase: false,
        includeUppercase: false,
      },
    });
    act(() => result.current.generatePassword());

    const digitsAndSymbolsRegex = new RegExp(
      "^(?=.*[0-9])(?=.*[!@#$%^&*-_=+<>,.])\\S{" + defaultPasswordLength + "}$"
    );

    expect(result.current.password).toMatch(digitsAndSymbolsRegex);
  });

  test("should generate correct password when digits and uppercase letters options are checked", () => {
    const { result } = renderHook(usePasswordGenerator, {
      initialProps: {
        includeLowercase: false,
        includeSymbols: false,
      },
    });
    act(() => result.current.generatePassword());

    const digitsAndLowerRegex = new RegExp(
      "^(?=.*[A-Z])(?=.*[0-9])\\S{" + defaultPasswordLength + "}$"
    );

    expect(result.current.password).toMatch(digitsAndLowerRegex);
  });

  test("should generate correct password when lowercase letters and symbols options are checked", () => {
    const { result } = renderHook(usePasswordGenerator, {
      initialProps: {
        includeDigits: false,
        includeUppercase: false,
      },
    });
    act(() => result.current.generatePassword());

    const lowerAndSymbolsRegex = new RegExp(
      "^(?=.*[a-z])(?=.*[!@#$%^&*-_=+<>,.])\\S{" + defaultPasswordLength + "}$"
    );

    expect(result.current.password).toMatch(lowerAndSymbolsRegex);
  });

  test("should generate correct password when lower and uppercase letters options are checked", () => {
    const { result } = renderHook(usePasswordGenerator, {
      initialProps: {
        includeDigits: false,
        includeSymbols: false,
      },
    });
    act(() => result.current.generatePassword());

    const lowerAndUpperRegex = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])\\S{" + defaultPasswordLength + "}$"
    );

    expect(result.current.password).toMatch(lowerAndUpperRegex);
  });

  test("should generate correct password when symbols and uppercase letters options are checked", () => {
    const { result } = renderHook(usePasswordGenerator, {
      initialProps: {
        includeDigits: false,
        includeLowercase: false,
      },
    });
    act(() => result.current.generatePassword());

    const symbolsAndUpperRegex = new RegExp(
      "^(?=.*[!@#$%^&*-_=+<>,.])(?=.*[A-Z])\\S{" + defaultPasswordLength + "}$"
    );

    expect(result.current.password).toMatch(symbolsAndUpperRegex);
  });

  test("should generate correct password when everything is checked except digits", () => {
    const { result } = renderHook(usePasswordGenerator, {
      initialProps: {
        includeDigits: false,
      },
    });
    act(() => result.current.generatePassword());

    const allExceptDigitsRegex = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*-_=+<>,.])\\S{" +
        defaultPasswordLength +
        "}$"
    );

    expect(result.current.password).toMatch(allExceptDigitsRegex);
  });

  test("should generate correct password when everything is checked except lowercase letters", () => {
    const { result } = renderHook(usePasswordGenerator, {
      initialProps: {
        includeLowercase: false,
      },
    });
    act(() => result.current.generatePassword());

    const allExceptLowercaseRegex = new RegExp(
      "^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*-_=+<>,.])\\S{" +
        defaultPasswordLength +
        "}$"
    );

    expect(result.current.password).toMatch(allExceptLowercaseRegex);
  });

  test("should generate correct password when everything is checked except symbols", () => {
    const { result } = renderHook(usePasswordGenerator, {
      initialProps: {
        includeSymbols: false,
      },
    });
    act(() => result.current.generatePassword());

    const allExceptSymbolsRegex = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])\\S{" + defaultPasswordLength + "}$"
    );

    expect(result.current.password).toMatch(allExceptSymbolsRegex);
  });

  test("should generate correct password when everything is checked except uppercase letters", () => {
    const { result } = renderHook(usePasswordGenerator, {
      initialProps: {
        includeUppercase: false,
      },
    });
    act(() => result.current.generatePassword());

    const allExceptUppercaseRegex = new RegExp(
      "^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*-_=+<>,.])\\S{" +
        defaultPasswordLength +
        "}$"
    );

    expect(result.current.password).toMatch(allExceptUppercaseRegex);
  });

  test("should generate correct password when everything is checked", () => {
    const { result } = renderHook(usePasswordGenerator);
    act(() => result.current.generatePassword());

    const allOptionsRegex = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*-_=+<>,.])\\S{" +
        defaultPasswordLength +
        "}$"
    );

    expect(result.current.password).toMatch(allOptionsRegex);
  });

  test("should generate two different passwords in a row", () => {
    const { result } = renderHook(usePasswordGenerator);
    const allOptionsRegex = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*-_=+<>,.])\\S{" +
        defaultPasswordLength +
        "}$"
    );

    act(() => result.current.generatePassword());
    const firstPw = result.current.password;
    expect(firstPw).toMatch(allOptionsRegex);

    act(() => result.current.generatePassword());
    const secondPw = result.current.password;
    expect(secondPw).toMatch(allOptionsRegex);

    expect(firstPw).not.toEqual(secondPw);
  });
});
