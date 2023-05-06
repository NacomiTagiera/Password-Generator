import { render, screen } from "@testing-library/react";
import Header from "./";

const headerText = "Example Header";
const subheaderText = "Example Subheader";

describe("Header", () => {
  it("renders the header text", () => {
    render(<Header header={headerText} variant="h1" />);
    const headerElement = getHeader();
    expect(headerElement).toBeInTheDocument();
    expect(headerElement.tagName).toBe("H1");
  });

  it("renders the subheader text", () => {
    render(
      <Header header={headerText} subheader={subheaderText} variant="h2" />
    );
    const headerElement = getHeader();
    const subheaderElement = getSubheader();
    expect(headerElement).toBeInTheDocument();
    expect(subheaderElement).toBeInTheDocument();
    expect(headerElement.tagName).toBe("H2");
    expect(subheaderElement.tagName).toBe("H6");
  });

  it("uses the component prop to set the tag name", () => {
    const componentProp = "h3";
    render(
      <Header header={headerText} variant="h1" component={componentProp} />
    );
    const headerElement = getHeader();
    expect(headerElement).toBeInTheDocument();
    expect(headerElement.tagName).toBe(componentProp.toUpperCase());
  });
});

const getHeader = () => screen.getByText(headerText);
const getSubheader = () => screen.getByText(subheaderText);
