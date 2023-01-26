import { renderHook, act } from "@testing-library/react";
import { usePasswordGenerator } from "./usePasswordGenerator";

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

  test("should generate correct password when everything is checked", () => {
    const { result } = renderHook(usePasswordGenerator);
    act(() => result.current.generatePassword());

    const allOptionsRegex = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()\\+-])\\S{14}$"
    );

    expect(result.current.password).toMatch(allOptionsRegex);
  });
});
