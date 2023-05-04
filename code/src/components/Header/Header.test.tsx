import { render, screen } from "@testing-library/react";
import Header from "./";

describe("Header", () => {
  it("renders the header text", () => {
    const headerText = "Example Header";
    render(<Header header={headerText} variant="h1" />);
    const headerElement = screen.getByText(headerText);
    expect(headerElement).toBeInTheDocument();
    expect(headerElement.tagName).toBe("H1");
  });

  it("renders the subheader text", () => {
    const headerText = "Example Header";
    const subheaderText = "Example Subheader";
    render(
      <Header header={headerText} subheader={subheaderText} variant="h2" />
    );
    const headerElement = screen.getByText(headerText);
    const subheaderElement = screen.getByText(subheaderText);
    expect(headerElement).toBeInTheDocument();
    expect(subheaderElement).toBeInTheDocument();
    expect(headerElement.tagName).toBe("H2");
    expect(subheaderElement.tagName).toBe("H6");
  });

  it("uses the component prop to set the tag name", () => {
    const headerText = "Example Header";
    const componentProp = "h3";
    render(
      <Header header={headerText} variant="h1" component={componentProp} />
    );
    const headerElement = screen.getByText(headerText);
    expect(headerElement).toBeInTheDocument();
    expect(headerElement.tagName).toBe(componentProp.toUpperCase());
  });
});
