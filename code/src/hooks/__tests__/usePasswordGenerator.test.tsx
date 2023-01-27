import { renderHook, act } from "@testing-library/react";
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
        includeUppercase: false,
        includeSymbols: false,
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
        includeUppercase: false,
        includeSymbols: false,
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
});
