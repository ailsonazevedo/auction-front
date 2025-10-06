import ClientThemeProvider from "@/utils/providers/ThemeProvider";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
}));
import { Breadcrumb } from "../BreadCrumb";
import { usePathname } from "next/navigation";
describe("Breadcrumb", () => {
  beforeEach(() => {
    (usePathname as jest.Mock).mockReturnValue("/admin/dashboard");
  });
  it("renders the title and subtitle", () => {
    render(
      <ClientThemeProvider>
        <Breadcrumb subtitle="Test Subtitle" title="Test Title" />
      </ClientThemeProvider>,
    );

    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Test Subtitle")).toBeInTheDocument();
  });

  it("renders Breadcrumbs items", () => {
    const items = [
      { title: "Home", to: "/" },
      { title: "Page", to: "/page" },
      { title: "Subpage" },
    ];
    render(
      <ClientThemeProvider>
        <Breadcrumb items={items} title="Test Title" />
      </ClientThemeProvider>,
    );

    items.forEach((item) => {
      expect(screen.getByText(item.title)).toBeInTheDocument();
    });
  });

  it("renders the image if provided", () => {
    render(
      <ClientThemeProvider>
        <Breadcrumb
          altImage="Test Image"
          img="test-image.jpg"
          title="Test Title"
        />
      </ClientThemeProvider>,
    );

    const image = screen.getByAltText("Test Image");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "test-image.jpg");
  });

  it("applies the background color if provided", () => {
    const { container } = render(
      <ClientThemeProvider>
        <Breadcrumb backgroundColor="#123456" title="Test Title" />
      </ClientThemeProvider>,
    );

    expect(container.firstChild).toHaveStyle("background-color: #123456");
  });
});
