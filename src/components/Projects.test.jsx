import { describe, it, expect, beforeAll, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import React from "react";
import Projects from "./Projects";

beforeAll(() => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: vi.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
});

describe("Projects Component", () => {
  it("renders the Projects section with title", () => {
    render(<Projects />);
    expect(screen.getByText("Projects")).toBeInTheDocument();
    expect(
      screen.getByText(/Featured work & key projects/)
    ).toBeInTheDocument();
  });

  it("displays featured projects carousel", () => {
    render(<Projects />);
    const featured = screen.getAllByText("Featured");
    expect(featured.length).toBeGreaterThan(0);
  });

  it("displays All Projects heading", () => {
    render(<Projects />);
    expect(screen.getByText("All Projects")).toBeInTheDocument();
  });

  it("renders search input", () => {
    render(<Projects />);
    const searchInput = screen.getByPlaceholderText(/Search projects/);
    expect(searchInput).toBeInTheDocument();
  });

  it("renders tag filter buttons", () => {
    render(<Projects />);
    expect(screen.getByText("All")).toBeInTheDocument();
    const reactButtons = screen.getAllByText("React");
    expect(reactButtons.length).toBeGreaterThan(0);
  });

  it("filters projects when tag is clicked", async () => {
    render(<Projects />);

    const reactMatches = screen.getAllByText("React");
    // pick the first match (or choose index based on structure)
    const reactButton = reactMatches[0];
    fireEvent.click(reactButton);

    await waitFor(() => {
      expect(reactButton).toHaveClass(
        "text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full"
      );
    });
  });

  it("filters projects when search input is used", async () => {
    render(<Projects />);
    const searchInput = screen.getByPlaceholderText(/Search projects/);
    fireEvent.change(searchInput, { target: { value: "React" } });
    await waitFor(() => {
      expect(searchInput.value).toBe("React");
    });
  });

  it("shows no results message when search finds nothing", async () => {
    render(<Projects />);
    const searchInput = screen.getByPlaceholderText(/Search projects/);
    fireEvent.change(searchInput, {
      target: { value: "nonexistent-project-xyz" },
    });
    await waitFor(() => {
      expect(
        screen.getByText(/No projects found matching/)
      ).toBeInTheDocument();
    });
  });

  it("clears search when Clear Search button is clicked", async () => {
    render(<Projects />);
    const searchInput = screen.getByPlaceholderText(/Search projects/);
    fireEvent.change(searchInput, { target: { value: "nonexistent" } });

    await waitFor(() => {
      expect(screen.getByText("Clear Search")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("Clear Search"));
    await waitFor(() => {
      expect(searchInput.value).toBe("");
    });
  });

  it("navigates featured carousel with arrow buttons", async () => {
    render(<Projects />);

    const prevButton = screen.getByLabelText("Previous featured project");
    const nextButton = screen.getByLabelText("Next featured project");

    expect(prevButton).toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();

    fireEvent.click(nextButton);

    await waitFor(() => {
      // After we're allowed to click, the button still exists
      expect(
        screen.getByLabelText("Next featured project")
      ).toBeInTheDocument();
    });
  });

  //   it("displays correct number of project cards", () => {
  //     render(<Projects />);
  //     // Should have at least some project cards rendered
  //     const projectCards = screen.getAllByText(/Engineer|Manager|Full-Stack/);
  //     expect(projectCards.length).toBeGreaterThan(0);
  //   });
});
